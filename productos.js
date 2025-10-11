// ========================== BASE DE DATOS: 12 LIBROS ================================
const productsDatabase = [
    {
        id: 1,
        title: "Mexico City",
        author: "Magdalena Ropolo",
        price: 135000,
        images: [
            "assets/libros/mexico1.jpg",
            "assets/libros/mexico2.jpg",
            "assets/libros/mexico3.jpg"
        ],
        description: "Una exploración visual de la vibrante capital mexicana, sus colores, su cultura y su historia milenaria."
    },
    {
        id: 2,
        title: "Amalfi Coast",
        author: "Magdalena Ropolo",
        price: 145000,
        images: [
            "assets/libros/amalfi1.jpg",
            "assets/libros/amalfi2.jpg",
            "assets/libros/amalfi3.jpg"
        ],
        description: "Acantilados espectaculares, pueblos verticales y el Mediterráneo en su máximo esplendor."
    },
    {
        id: 3,
        title: "Bali Mystique",
        author: "Magdalena Ropolo",
        price: 128000,
        images: [
            "assets/libros/bali1.webp",
            "assets/libros/bali2.webp",
            "assets/libros/bali3.webp"
        ],
        description: "Una oda al equilibrio perfecto entre espiritualidad y naturaleza. Templos, arrozales y playas doradas bajo la luz cálida del trópico."
    },
    {
        id: 4,
        title: "Capri Dolce Vita",
        author: "Magdalena Ropolo",
        price: 138000,
        images: [
            "assets/libros/capri1.jpg",
            "assets/libros/capri2.jpg",
            "assets/libros/capri3.jpg"
        ],
        description: "El glamour italiano hecho paisaje. Cielos azules, acantilados vertiginosos y una elegancia atemporal en cada rincón de la isla."
    },
    {
        id: 5,
        title: "Havana Blues",
        author: "Magdalena Ropolo",
        price: 132000,
        images: [
            "assets/libros/havana1.jpg",
            "assets/libros/havana2.webp",
            "assets/libros/havana3.jpg"
        ],
        description: "Una mirada nostálgica a la Habana: autos clásicos, fachadas desgastadas y una energía musical que late en cada calle."
    },
    {
        id: 6,
        title: "Ibiza Bohemia",
        author: "Magdalena Ropolo",
        price: 142000,
        images: [
            "assets/libros/ibiza1.webp",
            "assets/libros/ibiza2.webp",
            "assets/libros/ibiza3.webp"
        ],
        description: "Entre calas escondidas y noches infinitas, la isla blanca combina lo bohemio, lo natural y lo cosmopolita con un magnetismo único."
    },
    {
        id: 7,
        title: "Jamaica Vibes",
        author: "Magdalena Ropolo",
        price: 136000,
        images: [
            "assets/libros/jamaica1.jpg",
            "assets/libros/jamaica2.jpg",
            "assets/libros/jamaica3.jpg"
        ],
        description: "Verde, ritmo y alma. Una celebración de la cultura caribeña, sus playas de arena blanca y la esencia vibrante del reggae."
    },
    {
        id: 8,
        title: "Tulum Gypset",
        author: "Magdalena Ropolo",
        price: 130000,
        images: [
            "assets/libros/tulum1.jpg",
            "assets/libros/tulum2.jpg",
            "assets/libros/tulum3.jpg"
        ],
        description: "Ruinas mayas, playas paradisíacas y la nueva onda bohemia del Caribe mexicano."
    },
    {
        id: 9,
        title: "Mykonos Muse",
        author: "Magdalena Ropolo",
        price: 148000,
        images: [
            "assets/libros/mykonos1.jpg",
            "assets/libros/mykonos2.jpg",
            "assets/libros/mykonos3.webp"
        ],
        description: "El sol del Egeo baña sus calles blancas y puertas azules. Un icono del hedonismo mediterráneo donde el arte y la fiesta se funden."
    },
    {
        id: 10,
        title: "Red Sea The Saudi Coast",
        author: "Magdalena Ropolo",
        price: 139000,
        images: [
            "assets/libros/redsea1.webp",
            "assets/libros/redsea2.webp",
            "assets/libros/redsea3.webp"
        ],
        description: "Corales infinitos, desiertos dorados y un mar que parece líquido cristal. Un homenaje visual al contraste entre arena y agua."
    },
    {
        id: 11,
        title: "Kyoto Serenity",
        author: "Magdalena Ropolo",
        price: 141000,
        images: [
            "assets/libros/kyoto1.webp",
            "assets/libros/kyoto2.webp",
            "assets/libros/kyoto3.webp"
        ],
        description: "Jardines zen, templos milenarios y la estética minimalista japonesa en su forma más pura."
    },
    {
        id: 12,
        title: "Sevilla Arte",
        author: "Magdalena Ropolo",
        price: 134000,
        images: [
            "assets/libros/sevilla1.webp",
            "assets/libros/sevilla2.webp",
            "assets/libros/sevilla3.webp"
        ],
        description: "El alma de Andalucía hecha color y pasión. Flamenco, patios con azahares y una arquitectura que vibra con historia y arte."
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

    // Actualizar contador
    if (countElement) {
        countElement.textContent = productsDatabase.length + ' PRODUCTOS EN ESTA COLECCIÓN';
    }

    grid.innerHTML = '';

    productsDatabase.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML =
            '<img src="' + product.images[0] + '" alt="' + product.title + '" class="product-image">' +
            '<div class="product-info">' +
            '<h3 class="product-title">' + product.title + '</h3>' +
            '<p class="product-author">' + product.author + '</p>' +
            '<p class="product-price">' + formatPrice(product.price) + '</p>' +
            '<button class="btn-view-product" onclick="addToCart(' + product.id + ')">' +
            'AGREGAR AL CARRITO' +
            '</button>' +
            '</div>';
        grid.appendChild(productCard);
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
            '<p class="cart-item-modal-author">' + item.author + '</p>' +
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

        // Mostrar modal de éxito
        setTimeout(() => {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

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