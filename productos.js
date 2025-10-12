// ========================== BASE DE DATOS: 12 LIBROS ================================
const productsDatabase = [
    {
        id: 1,
        title: "Mexico City",
        price: 135000,
        images: [
            "assets/libros/mexico1.jpg",
            "assets/libros/mexico2.jpg"
        ],
    },
    {
        id: 2,
        title: "Amalfi Coast",
        price: 145000,
        images: [
            "assets/libros/amalfi1.jpg",
            "assets/libros/amalfi2.jpg"
        ],
    },
    {
        id: 3,
        title: "Bali Mystique",
        price: 128000,
        images: [
            "assets/libros/bali1.webp",
            "assets/libros/bali2.webp"
        ],
    },
    {
        id: 4,
        title: "Capri Dolce Vita",
        price: 138000,
        images: [
            "assets/libros/capri1.jpg",
            "assets/libros/capri2.webp"
        ],
    },
    {
        id: 5,
        title: "Havana Blues",
        price: 132000,
        images: [
            "assets/libros/havana1.jpg",
            "assets/libros/havana2.webp"
        ],
    },
    {
        id: 6,
        title: "Ibiza Bohemia",
        price: 142000,
        images: [
            "assets/libros/ibiza1.webp",
            "assets/libros/ibiza2.webp"
        ],
    },
    {
        id: 7,
        title: "Jamaica Vibes",
        price: 136000,
        images: [
            "assets/libros/jamaica1.jpg",
            "assets/libros/jamaica2.jpg"
        ],
    },
    {
        id: 8,
        title: "Tulum Gypset",
        price: 130000,
        images: [
            "assets/libros/tulum1.jpg",
            "assets/libros/tulum2.jpg"
        ],
    },
    {
        id: 9,
        title: "Mykonos Muse",
        price: 148000,
        images: [
            "assets/libros/mykonos1.jpg",
            "assets/libros/mykonos2.jpg"
        ],
    },
    {
        id: 10,
        title: "Red Sea The Saudi Coast",
        price: 139000,
        images: [
            "assets/libros/redsea1.webp",
            "assets/libros/redsea2.webp"
        ],
    },
    {
        id: 11,
        title: "Kyoto Serenity",
        price: 141000,
        images: [
            "assets/libros/kyoto1.webp",
            "assets/libros/kyoto2.webp"
        ],
    },
    {
        id: 12,
        title: "Sevilla Arte",
        price: 134000,
        images: [
            "assets/libros/sevilla1.webp",
            "assets/libros/sevilla2.webp"
        ],
    }
];

// ========================== CARRITO (GLOBAL) ================================
let cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];

// =========================== FORMATEAR PRECIO ===============================
function formatPrice(price) {
    return '$' + price.toLocaleString('es-AR');
}

// =============================== MOSTRAR PRODUCTOS EN LA PÁGINA ===============================
function displayProducts() {
    const grid = document.getElementById('productsGrid');
    const countElement = document.getElementById('productsCount');
    if (!grid) return;
    if (countElement) {
        countElement.textContent = productsDatabase.length + ' PRODUCTOS EN ESTA COLECCIÓN';
    }
    grid.innerHTML = '';
    productsDatabase.forEach(product => {
        const first = product.images[0];
        const second = product.images[1] || product.images[0]; // por si faltara la 2
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML =
        productCard.innerHTML =
        '<img src="' + first + '" alt="' + product.title + '" class="product-image" ' +
        '     data-first="' + first + '" data-second="' + second + '">' +
        '<div class="product-info">' +
            '<h3 class="product-title">' + product.title + '</h3>' +
            '<p class="product-price">' + formatPrice(product.price) + '</p>' +
            '<button class="btn-view-product" onclick="addToCart(' + product.id + ')">AGREGAR AL CARRITO</button>' +
        '</div>';
        grid.appendChild(productCard);

        // ----- Hover swap (1 ↔ 2) + preload -----
        const imgEl = productCard.querySelector('.product-image');
        const preload = new Image();
        preload.src = second; // evita parpadeo

        imgEl.addEventListener('mouseenter', () => { imgEl.src = second; });
        imgEl.addEventListener('mouseleave', () => { imgEl.src = first; });

        // En mobile: primer toque alterna
        imgEl.addEventListener('touchstart', () => {
            imgEl.src = (imgEl.src.endsWith(second)) ? first : second;
        }, { passive: true });
    });
}

// =========================== AGREGAR AL CARRITO ================================
function addToCart(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification('Producto agregado al carrito');
}

// ============================ ACTUALIZAR CARRITO ================================
function updateCart() {
    localStorage.setItem('assoulineCart', JSON.stringify(cart));
    updateCartCount();
}

// ======================= ACTUALIZAR CONTADOR DEL CARRITO =================
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// ======================= MOSTRAR NOTIFICACIÓN ===============================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText =
        'position: fixed;' +
        'top: 100px;' +
        'right: 30px;' +
        'background-color: #2ecc71;' +
        'color: white;' +
        'padding: 15px 25px;' +
        'border-radius: 3px;' +
        'box-shadow: 0 5px 20px rgba(0,0,0,0.2);' +
        'z-index: 10000;' +
        'font-family: Montserrat, sans-serif;' +
        'font-size: 14px;' +
        'animation: slideIn 0.3s ease;';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(function () {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(function () {
            notification.remove();
        }, 300);
    }, 2000);
}

// =========================== ABRIR MODAL DEL CARRITO ==================================
const cartIcon = document.getElementById('cartIcon');
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        displayCartModal();
        const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
        cartModal.show();
    });
}

// ============================= MOSTRAR ITEMS DEL CARRITO =========================
function displayCartModal() {
    const cartBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartModalTotal');

    if (!cartBody) return;

    if (cart.length === 0) {
        cartBody.innerHTML =
            '<div class="empty-cart">' +
            '<i class="fas fa-shopping-bag"></i>' +
            '<p>Tu carrito está vacío</p>' +
            '</div>';
        cartTotal.textContent = formatPrice(0);
        return;
    }

    let total = 0;
    cartBody.innerHTML = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item-modal';
        cartItem.innerHTML =
            '<img src="' + item.images[0] + '" alt="' + item.title + '" class="cart-item-modal-img">' +
            '<div class="cart-item-modal-info">' +
            '<h5 class="cart-item-modal-title">' + item.title + '</h5>' +
            '<p class="cart-item-modal-price">' + formatPrice(item.price) + ' c/u</p>' +
            '<div class="cart-item-modal-actions">' +
            '<button class="btn-quantity-modal" onclick="changeQuantity(' + index + ', -1)">-</button>' +
            '<span class="cart-quantity-text">' + item.quantity + '</span>' +
            '<button class="btn-quantity-modal" onclick="changeQuantity(' + index + ', 1)">+</button>' +
            '<button class="btn-remove-modal" onclick="removeFromCart(' + index + ')">' +
            '<i class="fas fa-trash"></i>' +
            '</button>' +
            '</div>' +
            '</div>';
        cartBody.appendChild(cartItem);
    });

    cartTotal.textContent = formatPrice(total);
}

// ========================  CAMBIAR CANTIDAD ================================
function changeQuantity(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
    displayCartModal();
}

// ========================  ELIMINAR DEL CARRITO ================================

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    displayCartModal();
}

// ======================= FINALIZAR COMPRA ===========================
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Tu carrito está vacío');
            return;
        }

        // Cerrar modal del carrito
        const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
        cartModal.hide();

        // Mostrar modal de éxito--> uso el que esta en la pag de bootstrap
        setTimeout(() => {
            new bootstrap.Modal(document.getElementById('successModal')).show();
            // Limpiar carrito
            cart = [];
            updateCart();
        }, 300);
    });
}

// ============================ ANIMACIONES ===============================
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
}
@keyframes slideOut {
    from { transform: translateX(0);     opacity: 1; }
    to   { transform: translateX(400px); opacity: 0; }
}`;
document.head.appendChild(style);

// =========================== FUNCIONES GLOBALES ==============================
window.addToCart = addToCart;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;

// ==================== INICIALIZAR =================================
window.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    updateCartCount();
    console.log('12 productos cargados ✓');
    console.log('Sistema de carrito activo ✓');
});