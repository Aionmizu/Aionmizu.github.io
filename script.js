// Variables globales
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sélectionne les éléments du DOM
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTVA = document.getElementById('cart-tva');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart'); // Ancien bouton "Vider le panier"
const continueShoppingButton = document.getElementById('continue-shopping'); // Nouveau bouton "Continuer achat"

const checkoutButton = document.getElementById('checkout-btn');

// Fonction pour ajouter un produit au panier
function addToCart(event) {
    const product = event.target.closest('.product-item');
    const productId = product.getAttribute('data-id');
    const productName = product.getAttribute('data-name');
    const productPrice = parseFloat(product.getAttribute('data-price'));

    // Vérifier si le produit est déjà dans le panier
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Fonction pour mettre à jour l'affichage du panier
function updateCart() {
    // Sauvegarder le panier dans le LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Vérifier si les éléments du panier existent sur la page
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let subtotal = 0;

        cart.forEach(item => {
            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = item.name;
            tr.appendChild(tdName);

            const tdQuantity = document.createElement('td');
            tdQuantity.textContent = item.quantity;
            tr.appendChild(tdQuantity);

            const tdPrice = document.createElement('td');
            tdPrice.textContent = item.price.toFixed(2) + ' €';
            tr.appendChild(tdPrice);

            cartItems.appendChild(tr);

            subtotal += item.price * item.quantity;
        });

        const tvaAmount = subtotal * 0.20; // Calcul de la TVA à 20%
        const total = subtotal + tvaAmount;

        cartSubtotal.textContent = subtotal.toFixed(2);
        cartTVA.textContent = tvaAmount.toFixed(2);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Fonction pour vider le panier (optionnelle, si vous souhaitez conserver cette fonctionnalité)
function clearCart() {
    cart = [];
    updateCart();
}

// Fonction pour continuer les achats
function continueShopping() {
    // Rediriger vers la page des produits
    window.location.href = 'produits.html';
}

// Attacher les événements pour les boutons "Ajouter au panier"
if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Attacher l'événement pour le bouton "Continuer achat"
if (continueShoppingButton) {
    continueShoppingButton.addEventListener('click', continueShopping);
}

// Attacher l'événement pour le bouton "Valider la commande" (à implémenter selon vos besoins)
if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        // Ici, vous pouvez ajouter la logique pour la validation de la commande
        alert('Merci pour votre commande !');
        // Vous pouvez également vider le panier après la validation
        cart = [];
        updateCart();
    });
}

// Mettre à jour le panier au chargement de la page
updateCart();
