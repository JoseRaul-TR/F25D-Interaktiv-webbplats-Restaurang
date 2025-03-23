document.addEventListener('DOMContentLoaded', () => {
    // Define IDs for select elements for different dish categories
    const selects = {
        starter: 'starterSelect',
        mainDish: 'mainDishSelect',
        dessert: 'dessertSelect',
        drink: 'drinkSelect' 
    };

    // Define IDs for quantity input elements for different dish categories
    const quantities = {
        starter: 'starterQuantity',
        mainDish: 'mainDishQuantity',
        dessert: 'dessertQuantity',
        drink: 'drinkQuantity'
    };

    // Define IDs for form and display elements
    const orderForm = 'orderForm';
    const orderConfirmation = 'orderConfirmation';
    const totalPriceDisplay = 'totalPrice';
    const orderItemsList = 'orderItems';

    // Array to store ordered items
    let orderItems = [];

    // Helper function to get an element by its ID
    const getElement = id => document.getElementById(id);

    // Helper function to get all elements matching a selector
    const getElements = selector => document.querySelectorAll(selector);

    // Helper function to fetch and parse JSON data from a URL
    const fetchJson = async (url) => (await (await fetch(url)).json());

    // Helper function to get the price of a dish from a list of dishes, handling encoded quotes
    const getPrice = (dishes, dishName) => dishes?.find(d => d.namn.replace(/"/g, '&quot;') === dishName.replace(/"/g, '&quot;'))?.pris;

    // Function to populate a select element with dish options
    const populateSelect = (selectId, dishes) => {
        const select = getElement(selectId);
        if (!dishes) return; // Exit if no dishes are provided
        select.innerHTML = dishes.filter(dish => dish.pris !== null && dish.pris !== undefined).map(dish => {
            const encodedName = dish.namn.replace(/"/g, '&quot;'); // Encode dish names with quotes
            return `<option value="${encodedName}">${dish.namn} - ${dish.pris} kr</option>`; // Create option element
        }).join('');
    };

    // Function to populate the main dish select element with options from subcategories
    const populateMainDishes = (selectId, mainDishes) => {
        if (!mainDishes) return; // Exit if no main dishes are provided
        const allMainDishes = Object.values(mainDishes).flatMap(arr => arr || []); // Combine main dish subcategories
        populateSelect(selectId, allMainDishes); // Populate select with combined dishes
    };

    // Function to update the total price display
    const updateTotalPrice = async () => {
        try {
            const data = await fetchJson('../JSON/Meny.json'); // Fetch menu data
            const totalPrice = orderItems.reduce((sum, item) => {
                const dishes = data.menu[item.category === 'mainDish' ? 'main-dish' : item.category + 's']; // Get dishes for the category
                const dishPrice = getPrice(item.category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, item.dish) || 0; // Get dish price
                return sum + dishPrice * item.quantity; // Calculate and add to total
            }, 0);
            getElement(totalPriceDisplay).textContent = totalPrice; // Update display
        } catch (error) { console.error('Error updating total price:', error); }
    };

    // Function to update the order items display
    const updateOrderDisplay = async () => {
        try {
            const data = await fetchJson('../JSON/Meny.json'); // Fetch menu data
            getElement(orderItemsList).innerHTML = orderItems.map(item => {
                const dishes = data.menu[item.category === 'mainDish' ? 'main-dish' : item.category + 's']; // Get dishes for the category
                const dishPrice = getPrice(item.category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, item.dish) || 0; // Get dish price
                const subtotal = dishPrice * item.quantity; // Calculate subtotal
                return `<li>${item.dish} x ${item.quantity} - ${subtotal} kr</li>`; // Create list item with subtotal
            }).join('');
        } catch (error) { console.error('Error updating order display:', error); }
    };

    // Function to add event listeners for adding items to the order
    const addAddItemListeners = async () => {
        getElements('.dish-group').forEach(group => {
            group.querySelector('.addItem').addEventListener('click', async () => {
                const category = group.dataset.category; // Get category from data attribute
                const dish = getElement(selects[category]).value; // Get selected dish
                const quantity = getElement(quantities[category]).value; // Get quantity
                if (dish && quantity > 0) {
                    try {
                        const data = await fetchJson('../JSON/Meny.json'); // Fetch menu data
                        const dishes = data.menu[category === 'mainDish' ? 'main-dish' : category + 's']; // Get dishes for the category
                        const dishPrice = getPrice(category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, dish); // Get dish price
                        if (dishPrice !== null && dishPrice !== undefined) {
                            orderItems.push({ category, dish, quantity }); // Add item to order
                            updateOrderDisplay(); // Update order display
                            updateTotalPrice(); // Update total price
                        } else { console.warn(`Dish "${dish}" has no valid price and was not added.`); }
                    } catch (error) { console.error('Error adding item:', error); }
                }
            });
        });
    };

    // Function to load menu data and setup event listeners
    const loadMenu = async () => {
        try {
            const data = await fetchJson('../JSON/Meny.json'); // Fetch menu data
            populateSelect(selects.starter, data.menu.starters); // Populate starters select
            populateMainDishes(selects.mainDish, data.menu['main-dish']); // Populate main dishes select
            populateSelect(selects.dessert, data.menu.desserts); // Populate desserts select
            populateSelect(selects.drink, data.menu.drinks); // Populate drinks select
            Object.values(selects).forEach(selectId => getElement(selectId).addEventListener('change', updateTotalPrice)); // Add change listeners to selects
            Object.values(quantities).forEach(quantityId => getElement(quantityId).addEventListener('input', updateTotalPrice)); // Add input listeners to quantities
            addAddItemListeners(); // Add add item listeners
        } catch (error) { console.error('Error loading menu:', error); }
    };

    loadMenu(); // Load menu data on page load

    // Event listener for form submission
    getElement(orderForm).addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const name = getElement('name').value, phone = getElement('phone').value, email = getElement('email').value; // Get form values
        if (!name) { alert('Ange ditt namn.'); return; } // Validate name
        if (!phone && !email) { alert('Ange ditt telefonnummer eller e-post.'); return; } // Validate phone or email
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Ogiltig e-postadress.'); return; } // Validate email format
        console.log('Order:', { items: orderItems, name, phone, email }); // Log order
        getElement(orderForm).style.display = 'none'; // Hide form
        getElement(orderConfirmation).style.display = 'block'; // Show confirmation
    });
});