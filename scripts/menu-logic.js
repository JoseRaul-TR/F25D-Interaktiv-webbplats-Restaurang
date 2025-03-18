fetch('JSON/Meny.json')
    .then(response => response.json())
    .then(data => {
        const menu = document.querySelector('.menu');

        for (const category in data.menu) {
            //Create a unique ID from the category name
            const categoryId = category.toLowerCase().replace(/ /g, '–').replace(/[^\w-]+/g, '');

            // Create the dish-type div
            const dishTypeDiv = document.createElement('div');
            dishTypeDiv.id = categoryId;
            dishTypeDiv.classList.add('dish-type');
            dishTypeDiv.textContent = category;

            // Create the category container
            const categoryElement = document.createElement('article');
            categoryElement.classList.add('category');
            categoryElement.innerHTML = `<ul></ul>`;
            const dishList = categoryElement.querySelector('ul');

            //Add dishes to the list
            data.menu[category].forEach(dish => {
                const dishElement = document.createElement('li');
                dishElement.classList.add('dish');
                dishElement.innerHTML = `<h4>${dish.namn}</h4><p>${dish.beskrivning} - ${dish.pris}</p>`;
                dishList.appendChild(dishElement);
            });
            
            //Append the dish-type div and the category container to the menu
            menu.appendChild(dishTypeDiv);
            menu.appendChild(categoryElement);
        }
    })
    .catch(e => {
        console.error("Error loading menu: " + e)
    });