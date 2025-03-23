// Logic for the filter buttons

const filterButtons = document.querySelectorAll('.filter-btn');
const dishContainers = document.querySelectorAll('.dish-container');

//Hide all dish containers initially
dishContainers.forEach(container => {
    container.style.display = 'none';
});

// Filter buttons logic
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        console.log("Button clicked: ", category); // Check clicked category

        dishContainers.forEach(container => {
            console.log("Container category: ", container.dataset.category); // Check container category
            if (category === 'all' || container.dataset.category === category) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    });
});

// –––––––– ************** ––––––––––––––––––––––––

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
        const drinkList = document.getElementById('drink-list');

        // Function to create the dish list
        function createDishList(categoryData, container = '') {
            try {
                if (!categoryData || !Array.isArray(categoryData)) { //Error handling if data is missing
                    throw new Error("Category data is invalid or missing.");
                } while (container.firstChild) { // Clear existing list items
                    container.removeChild(container.firstChild);
                }

                categoryData.forEach(dish => {
                    if (!dish || !dish.namn || !dish.pris === undefined) { //Error handling id data is missing in a dish data
                        console.log("Dish data are incomplete: ", dish);
                        return; //Skip incomplete dishes
                    }

                    const dishItem = document.createElement('li'); // Create a li-element for every dish
                    dishItem.classList.add('dish');

                    // Leave price empty if null in JSON
                    let priceInfo = dish.pris !== null ? `${dish.pris} kr` : '';

                    // Leave allergies empty if null in JSON
                    let allergierInfo = dish.allergier !== null ? dish.allergier : '';

                    dishItem.innerHTML = `
                        <p>${dish.namn} <em>${allergierInfo}</em> – ${priceInfo}.</p>
                    `;
                    container.appendChild(dishItem); // Add li to ul
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
            createDishList(data.menu['main-dish'].fiskrätter, fishList);
            createDishList(data.menu['main-dish'].risrätter, riceList);
            createDishList(data.menu['main-dish'].kötträter, meatList);
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

    // Fill in the drinks
    try {
        if (data.menu.drinks) {
            createDishList(data.menu.drinks, drinkList);
        } else {
            console.log("Desserts category missing or empty.");
        }
    } catch (error) { //Error handling
        console.log("Error processing drinks: ", error);
    }

    } catch (error) { //Error handling of the entire code 
        console.error("Error loading the menu: ", error);
    }
}

loadMenu();