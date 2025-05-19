# Interactive Restaurant Website

This repository contains the source code for an interactive restaurant website, created as part of the F25D course assignment. The website allows users to browse a menu, add items to an order, and view their current order and total price, all dynamically updated using JavaScript.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Potential Enhancements](#potential-enhancements)
- [Contact](#contact)

## Overview

This interactive restaurant website provides a user-friendly interface for exploring a menu and placing a mock order. The menu data is loaded from a JSON file, and JavaScript is used to dynamically update the available dishes, the user's order, and the total price without requiring page reloads.

## Key Features

-   **Dynamic Menu:** Dishes for starters, main courses, desserts, and drinks are dynamically loaded from a `Meny.json` file.
-   **Interactive Ordering:** Users can select quantities of dishes and add them to their order.
-   **Real-time Order Updates:** The "Your Order" section updates in real-time as items are added.
-   **Automatic Total Price Calculation:** The total price of the order is automatically calculated and displayed.
-   **Form Submission:** Includes a form for users to enter their name, phone, and email to "submit" their order (note: this submission is likely simulated client-side).
-   **Responsive Design:** The layout adapts to different screen sizes.
-   **Dark Mode Support:** Automatically adjusts to the user's preferred color scheme.
-   **Print-friendly Styles:** Stylesheet optimized for printing.

## Screenshots

![Screenshot 2025-05-19 at 10-46-35 Entre Limones A la carte](https://github.com/user-attachments/assets/da18cfa5-8ffb-4a6d-8da1-5335078108e7)
![Screenshot 2025-05-19 at 10-46-55 Entre Limones Beställning](https://github.com/user-attachments/assets/07350002-0930-466b-9038-fb87da980e9c)
![Screenshot 2025-05-19 at 10-47-55 Entre Limones Beställning](https://github.com/user-attachments/assets/7706ceee-00b4-4ea8-852c-4872261072da)

## Technologies Used

-   HTML5
-   CSS3
-   JavaScript

## Getting Started

To run this interactive restaurant website locally:

1.  Clone the repository:
    ```bash
    git clone [https://github.com/JoseRaul-TR/F25D-Interaktiv-webbplats-Restaurang.git](https://github.com/JoseRaul-TR/F25D-Interaktiv-webbplats-Restaurang.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd F25D-Interaktiv-webbplats-Restaurang
    ```
3.  Open the `index.html` file in your web browser.

## Project Structure

```
.
├── Assets/
│   └── Images/
│       └── ... (images, screenshots)
├── Data/
│   ├── Lunchbuffe.json
│   └── Meny.json
├── JS/
│   ├── contact.js
│   ├── lunchbuffe-logic.js
│   ├── menu-logic.js
│   ├── navbar-script.js
│   └── order.js
├── Pages/
│   ├── contact.html
│   ├── lunchbuffe.html
│   ├── menu.html
│   └── order.html
├── Styles/
│   ├── base.css
│   ├── contact.css
│   ├── index.css
│   ├── lunchbuffe.css
│   ├── menu.css
│   ├── navbar-footer-styles.css
│   └── order.css
├── index.html
└── README.md
```

## Potential Enhancements

-   Implement actual server-side order processing.
-   Add user authentication.
-   Include features like order history or favorite items.
-   Enhance the UI/UX with more interactive elements and styling.
-   Allow users to remove items from their order.
-   Implement input validation for quantities.

## Contact

-   **LinkedIn:** (https://www.linkedin.com/in/joseraultenza/)
-   **GitHub:** (https://github.com/JoseRaul-TR)

---

This interactive restaurant website was created by José Raúl Tenza Ramírez.
