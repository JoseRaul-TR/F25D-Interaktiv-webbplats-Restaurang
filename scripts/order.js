document.addEventListener('DOMContentLoaded', () => {
    // Select elements for dish selection and quantities
    const selects = {
        starter: document.getElementById('starterSelect'),
        mainDish: document.getElementById('mainDishSelect'),
        dessert: document.getElementById('dessertSelect'),
        drink: document.getElementById('drinkSelect')
    };

    const quantities = {
        starter: document.getElementById('starterQuantity'),
        mainDish: document.getElementById('mainDishQuantity'),
        dessert: document.getElementById('dessertQuantity'),
        drink: document.getElementById('drinkQuantity')
    };

    // Select form and order confirmation elements
    const orderForm = document.getElementById('orderForm');
    const orderConfirmation = document.getElementById('orderConfirmation');

    // Select total price display and order items list elements
    const totalPriceDisplay = document.getElementById('totalPrice');
    const orderItemsList = document.getElementById('orderItems');

    // Select all dish groups for adding item listeners
    const dishGroups = document.querySelectorAll('.dish-group');

    // Array to store ordered items
    let orderItems = [];

    // Function to load menu data from JSON
    async function loadMenu() {
        try {
            // Fetch and parse menu data
            const data = await (await fetch('../JSON/Meny.json')).json();

            // Populate select elements with menu data
            populateSelect(selects.starter, data.menu.starters);
            populateMainDishes(selects.mainDish, data.menu['main-dish']);
            populateSelect(selects.dessert, data.menu.desserts);
            populateSelect(selects.drink, data.menu.drinks);

            // Add event listeners for price updates and adding items
            addPriceUpdateListeners();
            addAddItemListeners();
        } catch (error) {
            // Log error if menu loading fails
            console.error('Error loading menu:', error);
        }
    }

    // Function to populate a select element with dish options
    function populateSelect(selectElement, dishes) {
        if (!dishes) return;

        // Filter out dishes with null or undefined prices
        const validDishes = dishes.filter(dish => dish.pris !== null && dish.pris !== undefined);

        // Create option elements from dish data and set innerHTML
        selectElement.innerHTML = validDishes.map(dish => `<option value="${dish.namn}">${dish.namn} - ${dish.pris} kr</option>`).join('');
    }

    // Function to populate main dish select element with subcategory options
    function populateMainDishes(selectElement, mainDishes) {
        if (!mainDishes) return;
        // Combine all main dish subcategories into a single array
        const allMainDishes = [
            ...(mainDishes.fiskrätter || []),
            ...(mainDishes.risrätter || []),
            ...(mainDishes.kötträter || [])
        ];
        // Populate select element with combined main dish options
        populateSelect(selectElement, allMainDishes);
    }

    // Function to add event listeners for price updates on select and quantity changes
    function addPriceUpdateListeners() {
        // Add change event listeners to select elements
        Object.values(selects).forEach(select => select.addEventListener('change', updateTotalPrice));
        // Add input event listeners to quantity elements
        Object.values(quantities).forEach(quantity => quantity.addEventListener('input', updateTotalPrice));
    }

    // Function to add event listeners for adding items to the order
    function addAddItemListeners() {
        dishGroups.forEach(group => {
            // Add click event listener to "Add Item" button in each dish group
            group.querySelector('.addItem').addEventListener('click', async () => {
                const category = group.dataset.category;
                const dish = selects[category].value;
                const quantity = quantities[category].value;

                if (dish && quantity > 0) {
                    try {
                        // Fetch menu data to get dish price
                        const data = await (await fetch('../JSON/Meny.json')).json();
                        let dishPrice = 0;

                        // Get dish price based on category
                        if (category === 'starter') dishPrice = getDishPrice(data.menu.starters, dish);
                        else if (category === 'mainDish') dishPrice = getDishPrice(data.menu['main-dish'].fiskrätter, dish) || getDishPrice(data.menu['main-dish'].risrätter, dish) || getDishPrice(data.menu['main-dish'].kötträter, dish);
                        else if (category === 'dessert') dishPrice = getDishPrice(data.menu.desserts, dish);
                        else if (category === 'drink') dishPrice = getDishPrice(data.menu.drinks, dish);

                        // Add item to order if price is valid
                        if (dishPrice !== null && dishPrice !== undefined) {
                            orderItems.push({ category, dish, quantity });
                            updateOrderDisplay();
                            updateTotalPrice();
                        } else {
                            // Log warning if dish has no valid price
                            console.warn(`Dish "${dish}" has no valid price and was not added.`);
                        }
                    } catch (error) {
                        // Log error if fetching menu or processing dish fails
                        console.error('Error fetching menu or processing dish:', error);
                    }
                }
            });
        });
    }

    // Function to update total price display
    async function updateTotalPrice() {
        try {
            // Fetch menu data to calculate total price
            const data = await (await fetch('../JSON/Meny.json')).json();
            let totalPrice = 0;

            // Calculate total price from ordered items
            orderItems.forEach(item => {
                let dishPrice = 0;
                if (item.category === 'starter') dishPrice = getDishPrice(data.menu.starters, item.dish, 1);
                else if (item.category === 'mainDish') dishPrice = getDishPrice(data.menu['main-dish'].fiskrätter, item.dish, 1) || getDishPrice(data.menu['main-dish'].risrätter, item.dish, 1) || getDishPrice(data.menu['main-dish'].kötträter, item.dish, 1);
                else if (item.category === 'dessert') dishPrice = getDishPrice(data.menu.desserts, item.dish, 1);
                else if (item.category === 'drink') dishPrice = getDishPrice(data.menu.drinks, item.dish, 1);
                totalPrice += dishPrice * item.quantity;
            });

            // Update total price display
            totalPriceDisplay.textContent = totalPrice;
        } catch (error) {
            // Log error if updating total price fails
            console.error('Error updating total price:', error);
        }
    }

    // Function to get dish price from dish data
    function getDishPrice(dishes, dishName) {
        if (!dishes) return null;
        const dish = dishes.find(d => d.namn === dishName);
        return dish ? dish.pris : null;
    }

    // Function to update order items display
    function updateOrderDisplay() {
        // Create list items from ordered items and set innerHTML
        orderItemsList.innerHTML = orderItems.map(item => `<li>${item.dish} x${item.quantity}</li>`).join('');
    }

    // Load menu data when DOM is ready
    loadMenu();

    // Event listener for form submission
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        // Create order object from ordered items and customer name
        const order = {
            items: orderItems,
            name: document.getElementById('name').value,
        };
        // Log order data to console
        console.log('Order:', order);
        // Hide form and show order confirmation message
        orderForm.style.display = 'none';
        orderConfirmation.style.display = 'block';
    });
});