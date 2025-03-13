// Filter menu
const menySection = document.getElementById('meny');
const dishes = menySection.querySelectorAll('.dish');

function filterMenu(category) {
    dishes.forEach(dish => {
        if (dish.dataset.category === category || category === 'alla') {
            dish.style.display = 'block';
        } else {
            dish.style.display = 'none';
        }
    });
}

// Show/hide lunchbuffé
const lunchbuffeInfo = document.getElementById('lunchbuffe-info');
const showLunchbuffeBtn = document.getElementById('visa-lunchbuffe');

showLunchbuffeBtn.addEventListener('click', () => {
    lunchbuffeInfo.classList.toggle('visa');
});

// Calculate total cost
function calculateTotalCost() {
    // ... (Implementera logik för att beräkna kostnad)
}