async function fetchLunchData() {
    try {
        const response = await fetch('../JSON/Lunchbuffe.json'); // Fetch the data from JSON Lunchbuffe
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        //Check if data is fetched in console
        console.log(data);

        //Use data to update HTML
        const lunch = data.lunchbuffet;

        //Availability
        document.getElementById("weekday-hours").textContent = lunch.weekday.hours;
        document.getElementById("sunday-hours").textContent = lunch.sunday.hours;

        //Daily menu
        const menuList = document.getElementById("daily-menu");

        data.dailyMenu.forEach(item => {
            const menuItem = document.createElement('li');
            menuItem.innerHTML = `<strong>${item.day}:</strong><br>
                                    Förrät: ${item.starter}<br>
                                    Huvudrätt: ${item.mainDish}<br>
                                    Dessert: ${item.dessert}`;
            menuList.appendChild(menuItem);
        });

        // Drycker
        document.getElementById('included-drinks').textContent = data.drinks.included;

        const supplementList = document.getElementById('supplement-drinks');
        data.drinks.supplement.forEach(drink => {
            const drinkItem = document.createElement('li');
            drinkItem.textContent = `${drink.name}: ${drink.price} kr`;
            supplementList.appendChild(drinkItem);


        //Price list
        document.getElementById('price').textContent = data.priceList.Price;
        });

    } catch (error) {
        console.error('An error has occurred fetching Lunchbuffe.json data:', error);
    }
}

fetchLunchData();