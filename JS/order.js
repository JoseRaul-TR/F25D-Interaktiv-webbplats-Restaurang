document.addEventListener('DOMContentLoaded', () => {
    // Define IDs for select elements
    const selects = {
        starter: 'starterSelect',
        mainDish: 'mainDishSelect',
        dessert: 'dessertSelect',
        drink: 'drinkSelect'
    };

    // Define IDs for quantity input elements
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

    // Variable to store the fetched menu data
    let menuData = null;

    // Helper function to get an element by its ID
    const getElement = id => document.getElementById(id);

    // Helper function to get all elements matching a selector
    const getElements = selector => document.querySelectorAll(selector);

    // Helper function to fetch and parse JSON data from a URL
    const fetchJson = async (url) => (await (await fetch(url)).json());

    // Helper function to get the price of a dish
    const getPrice = (dishes, dishName) => dishes?.find(d => d.namn.replace(/"/g, '&quot;') === dishName.replace(/"/g, '&quot;'))?.pris;

    // Function to populate a select element with dish options
    const populateSelect = (selectId, dishes) => {
        const select = getElement(selectId);
        if (!dishes) return;
        select.innerHTML = dishes.filter(dish => dish.pris !== null && dish.pris !== undefined).map(dish => {
            const encodedName = dish.namn.replace(/"/g, '&quot;');
            return `<option value="${encodedName}">${dish.namn} - ${dish.pris} kr</option>`;
        }).join('');
    };

    // Function to populate the main dish select element
    const populateMainDishes = (selectId, mainDishes) => {
        if (!mainDishes) return;
        const allMainDishes = Object.values(mainDishes).flatMap(arr => arr || []);
        populateSelect(selectId, allMainDishes);
    };

    // Function to update the total price display
    const updateTotalPrice = () => {
        if (!menuData) return;
        const totalPrice = orderItems.reduce((sum, item) => {
            const dishes = menuData.menu[item.category === 'mainDish' ? 'main-dish' : item.category + 's'];
            const dishPrice = getPrice(item.category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, item.dish) || 0;
            return sum + dishPrice * item.quantity;
        }, 0);
        getElement(totalPriceDisplay).textContent = totalPrice;
    };

    // Function to update the order items display
    const updateOrderDisplay = () => {
        if (!menuData) return;
        getElement(orderItemsList).innerHTML = orderItems.map(item => {
            const dishes = menuData.menu[item.category === 'mainDish' ? 'main-dish' : item.category + 's'];
            const dishPrice = getPrice(item.category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, item.dish) || 0;
            const subtotal = dishPrice * item.quantity;
            return `<li>${item.dish} x ${item.quantity} - ${subtotal} kr</li>`;
        }).join('');
    };

    // Function to add event listeners for adding items to the order
    const addAddItemListeners = () => {
        getElements('.dish-group').forEach(group => {
            group.querySelector('.addItem').addEventListener('click', () => {
                if (!menuData) return;
                const category = group.dataset.category;
                const dish = getElement(selects[category]).value;
                const quantity = getElement(quantities[category]).value;
                if (dish && quantity > 0) {
                    const dishes = menuData.menu[category === 'mainDish' ? 'main-dish' : category + 's'];
                    const dishPrice = getPrice(category === 'mainDish' ? Object.values(dishes).flatMap(arr => arr || []) : dishes, dish);
                    if (dishPrice !== null && dishPrice !== undefined) {
                        orderItems.push({ category, dish, quantity });
                        updateOrderDisplay();
                        updateTotalPrice();
                    } else {
                        console.warn(`Dish "${dish}" has no valid price and was not added.`);
                    }
                }
            });
        });
    };

    // Main function to fetch menu data and then setup the page
    const fetchData = async () => {
        try {
            menuData = await fetchJson('../Data/Meny.json'); // Fetch menu data first

            populateSelect(selects.starter, menuData.menu.starters);
            populateMainDishes(selects.mainDish, menuData.menu['main-dish']);
            populateSelect(selects.dessert, menuData.menu.desserts);
            populateSelect(selects.drink, menuData.menu.drinks);

            Object.values(selects).forEach(selectId => getElement(selectId).addEventListener('change', updateTotalPrice));
            Object.values(quantities).forEach(quantityId => getElement(quantityId).addEventListener('input', updateTotalPrice));

            addAddItemListeners();

        } catch (error) {
            console.error('Error initializing app:', error);
        }
    };

    fetchData(); // Start the initialization process

    // Event listener for form submission
    getElement(orderForm).addEventListener('submit', (event) => {
        event.preventDefault();
        const name = getElement('name').value;
        const phone = getElement('phone').value;
        const email = getElement('email').value;
        if (!name) {
            alert('Ange ditt namn.');
            return;
        }
        if (!phone && !email) {
            alert('Ange ditt telefonnummer eller e-post.');
            return;
        }
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Ogiltig e-postadress.');
            return;
        }
        console.log('Order:', { items: orderItems, name, phone, email });
        getElement(orderForm).style.display = 'none';
        getElement(orderConfirmation).style.display = 'block';
    });
});