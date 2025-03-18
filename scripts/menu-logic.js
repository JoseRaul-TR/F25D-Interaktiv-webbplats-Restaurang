// Async function to load the menu from a JSON file
async function loadMenu() {
    try {
        const response = await fetch('../JSON/Meny.json');
        const data = await response.json();

        const startersList = document.getElementById('starters-list');
        const fishList = document.getElementById('fish-list');
        const riceList = document.getElementById('rice-list');
        const meatList = document.getElementById('meat-list');
        const dessertList = document.getElementById('dessert-list');

        // Function to create the dish list
        function createDishList(categoryData, container, priceTypeLabe = '') {
            try {
                if (!categoryData || !Array.isArray(categoryData)) { //Error handling if data is missing
                    throw new Error("Category data is invalid or missing.");
                }

                const dishList = container;

                categoryData.forEach(dish => {
                    if (!dish || !dish.namn || !dish.pris === undefined) { //Error handling id data is missing in a dish
                        console.log("Dish data are incomplete: ", dish);
                        return; //Skip incomplete dishes
                    }

                    const dishItem = document.createElement('li'); // Create a li-element for every dish
                    dishItem.classList.add('dish');

                    // Check if price is null
                    let priceInfo = dish.pris !== null ? `${dish.pris} kr` : 'Fråga presonalen';

                    //Check if dish.beskrivning is null
                    const beskrivning = dish.beskrivning !== null ? dish.beskrivning : '';

                    dishItem.innerHTML = `
                        <p><strong>${dish.namn}</strong> <em>${beskrivning}</em> – ${priceInfo}.</p>
                    `;
                    dishList.appendChild(dishItem); // Add li to ul
                });

        } catch (error) { //Error handling
            console.log("Error creating dish list: ", error);
        }
    }

    // Fill in the starters
    try {
        if (data.menu.starters) {
            createDishList(data.menu.starters, startersList);
        } else {
            console.log("Starters category missing or empty.");
        }
    } catch (error) { //Error handling
        console.log("Error processing starters: ", error);
    }

    // Fill in the main dishes
    try {
        if (data.menu['main-dish']) {
            createDishList(data.menu['main-dish'].Fisk, fishList);
            createDishList(data.menu['main-dish'].Ris, riceList);
            createDishList(data.menu['main-dish'].Kött, meatList);
        } else {
            console.log("Main dish category missing or empty.");
        }
    } catch (error) { //Error handling
        console.log("Error processing main dishes: ", error);
    }

    // Fill in the desserts
    try {
        if (data.menu.desserts) {
            createDishList(data.menu.desserts, dessertList);
        } else {
            console.log("Desserts category missing or empty.");
        }
    } catch (error) { //Error handling
        console.log("Error processing desserts: ", error);
    }
    } catch (error) { //Error handling of the entire code 
        console.error("Error loading the menu: ", error);
    }
}

loadMenu(); // Anrop the async function