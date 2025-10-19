console.log("Assouline x Magdalena Ropolo – sitio cargado correctamente");
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
// ========================== CARRITO GLOBAL (FUNCIONA EN TODAS LAS PÁGINAS) ================================
let cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];
function updateCartCount() {  // Función para actualizar el contador del carrito
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}
function updateCart() {  // Función para guardar carrito
    localStorage.setItem('assoulineCart', JSON.stringify(cart));
    updateCartCount();
}
function formatPrice(price) { // Formatear precio
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
        const second = product.images[1] || product.images[0];
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML =
            '<img src="' + first + '" alt="' + product.title + '" class="product-image" ' +
            '     data-first="' + first + '" data-second="' + second + '">' +
            '<div class="product-info">' +
                '<h3 class="product-title">' + product.title + '</h3>' +
                '<p class="product-price">' + formatPrice(product.price) + '</p>' +
                '<button class="btn-view-product" onclick="addToCart(' + product.id + ')">AGREGAR AL CARRITO</button>' +
            '</div>';
        grid.appendChild(productCard);
        // ----- Hover swap (1 a 2) + preload -----
        const imgEl = productCard.querySelector('.product-image');
        const preload = new Image();
        preload.src = second;
        imgEl.addEventListener('mouseenter', () => { imgEl.src = second; });
        imgEl.addEventListener('mouseleave', () => { imgEl.src = first; });
        imgEl.addEventListener('touchstart', () => { // En tel: primer toque alterna
            imgEl.src = (imgEl.src.endsWith(second)) ? first : second;
        }, { passive: true });
    });
}
// =========================== AGREGAR AL CARRITO ================================
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('assoulineCart', JSON.stringify(cart));
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }
}
// ============================== CONTROL DEL SONIDO DEL VIDEO ======================
const video = document.getElementById('heroVideo');
const soundBtn = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');
if (soundBtn && video && soundIcon) {
    soundBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        soundIcon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    });
}
// ======================= MENÚ DESPLEGABLE MÓVIL ===========================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

if (menuToggle && navLinks && overlay) {
    menuToggle.addEventListener('click', (e) => { // abrir/cerrar al tocar las rayitas
        e.stopPropagation();
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    });
    overlay.addEventListener('click', () => { // cerrar si tocás afuera
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    navLinks.querySelectorAll('a').forEach(link => {     // cerrar si tocás algún link dentro del menú
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}
// ================================= CARRUSEL DE DESTINOS =============================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    function showSlide(index) { // Función para mostrar slide
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    dots.forEach((dot, index) => { // Click en los puntitos
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    setInterval(() => { // Cambio automático cada 5 segundos
        showSlide(currentSlide + 1);
    }, 5000);
    console.log("Carrusel de destinos cargado ✓");
}
// ============================ NEWSLETTER ===========================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const nameInput = newsletterForm.querySelector('input[type="text"]');
        const email = emailInput.value;
        alert(`¡Gracias por suscribirte! Te enviaremos novedades a ${email}`);
        emailInput.value = '';
        if (nameInput) nameInput.value = '';
    });
}
// ============================= MODAL DEL CARRITO (PARA INDEX Y SOBRE NOSOTROS) =========================
const cartIcon = document.getElementById('cartIcon');
if (cartIcon) {
    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        // Si estamos en productos.html y existe Bootstrap, usar el modal de Bootstrap
        if (typeof bootstrap !== 'undefined' && document.getElementById('cartModal')) {
            displayCartModal();
            const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
            cartModal.show();
        } else {
            showSimpleCartModal();// Si estamos en index o sobre nosotros, mostrar modal simple
        }
    });
}
// ======================== MODAL SIMPLE PARA INDEX Y SOBRE NOSOTROS ======================
function showSimpleCartModal() {
    let modal = document.getElementById('simpleCartModal'); // Crear modal si no existe
    if (!modal) {
        modal = createSimpleCartModal();
        document.body.appendChild(modal);
    }
    updateSimpleCartContent();     // Actualizar contenido
    modal.style.display = 'flex';    // Mostrar modal
    document.body.style.overflow = 'hidden';
}
function createSimpleCartModal() {
    const modal = document.createElement('div');
    modal.id = 'simpleCartModal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h2>Tu Carrito</h2>
                <button class="cart-modal-close" onclick="closeSimpleCartModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-modal-body" id="simpleCartBody">
                <!-- Contenido dinámico -->
            </div>
            <div class="cart-modal-footer" id="simpleCartFooter">
                <!-- Total y botones -->
            </div>
        </div>
    `;
    modal.addEventListener('click', (e) => {    // Cerrar al hacer click fuera
        if (e.target === modal) {
            closeSimpleCartModal();
        }
    });
    return modal;
}
function updateSimpleCartContent() {
    const bodyEl = document.getElementById('simpleCartBody');
    const footerEl = document.getElementById('simpleCartFooter');
    if (!bodyEl || !footerEl) return;
    // Recargar carrito desde localStorage
    cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];
    if (cart.length === 0) {
        bodyEl.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        footerEl.innerHTML = '';
        return;
    }
    let itemsHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsHTML += `
            <div class="cart-item-modal">
                <img src="${item.images[0]}" alt="${item.title}" class="cart-item-modal-img">
                <div class="cart-item-modal-info">
                    <h4 class="cart-item-modal-title">${item.title}</h4>
                    <p class="cart-item-modal-price">${formatPrice(item.price)} c/u</p>
                    <div class="cart-item-modal-actions">
                        <button class="btn-quantity-modal" onclick="changeQuantitySimple(${index}, -1)">-</button>
                        <span class="cart-quantity-text">${item.quantity}</span>
                        <button class="btn-quantity-modal" onclick="changeQuantitySimple(${index}, 1)">+</button>
                        <button class="btn-remove-modal" onclick="removeFromCartSimple(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    bodyEl.innerHTML = itemsHTML;
    footerEl.innerHTML = `
        <div class="cart-total">
            <span>Total:</span>
            <span class="cart-total-amount">${formatPrice(total)}</span>
        </div>
        <button class="btn-checkout" onclick="checkoutSimple()">FINALIZAR COMPRA</button>
    `;
}
function closeSimpleCartModal() {
    const modal = document.getElementById('simpleCartModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}
function changeQuantitySimple(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
    updateSimpleCartContent();
}
function removeFromCartSimple(index) {
    cart.splice(index, 1);
    updateCart();
    updateSimpleCartContent();
}
function checkoutSimple() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    alert('¡Gracias por tu compra en Assouline x Magdalena Ropolo! Esperamos que lo disfrutes.');
    cart = [];
    updateCart();
    closeSimpleCartModal();
}
// ======================== FUNCIONES PARA PRODUCTOS.HTML (CON BOOTSTRAP) ======================
function displayCartModal() {
    const cartBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartModalTotal');
    if (!cartBody) return; // Recargar carrito desde localStorage
    cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];
    if (cart.length === 0) {
        cartBody.innerHTML =
            '<div class="empty-cart">' +
            '<i class="fas fa-shopping-bag"></i>' +
            '<p>Tu carrito está vacío</p>' +
            '</div>';
        if (cartTotal) cartTotal.textContent = formatPrice(0);
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
    if (cartTotal) cartTotal.textContent = formatPrice(total);
}
function changeQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
    displayCartModal();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    displayCartModal();
}
// ======================= CHECKOUT (PARA PRODUCTOS.HTML) ===========================
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío');
            return;
        }
        // Cerrar modal del carrito
        const cartModalEl = document.getElementById('cartModal');
        if (cartModalEl && typeof bootstrap !== 'undefined') {
            const cartModal = bootstrap.Modal.getInstance(cartModalEl);
            if (cartModal) cartModal.hide();
        }
        // Mostrar modal de éxito
        setTimeout(() => {
            const successModalEl = document.getElementById('successModal');
            if (successModalEl && typeof bootstrap !== 'undefined') {
                new bootstrap.Modal(successModalEl).show();
            }
            // Limpiar carrito
            cart = [];
            updateCart();
        }, 300);
    });
}
// ========================== CARRUSEL DE BOUTIQUES ================================
const boutiqueSlides = document.querySelectorAll('.boutique-carousel-slide');
const boutiqueDotsContainer = document.getElementById('boutiqueCarouselDots');
if (boutiqueSlides.length > 0 && boutiqueDotsContainer) {
    let currentBoutiqueSlide = 0;
    // Crear dots dinámicamente
    boutiqueSlides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.className = 'boutique-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showBoutiqueSlide(index));
        boutiqueDotsContainer.appendChild(dot);
    });
    const boutiqueDots = document.querySelectorAll('.boutique-dot');
    function showBoutiqueSlide(index) {
        if (index >= boutiqueSlides.length) {
            currentBoutiqueSlide = 0;
        } else if (index < 0) {
            currentBoutiqueSlide = boutiqueSlides.length - 1;
        } else {
            currentBoutiqueSlide = index;
        }
        boutiqueSlides.forEach(slide => slide.classList.remove('active'));
        boutiqueDots.forEach(dot => dot.classList.remove('active'));
        boutiqueSlides[currentBoutiqueSlide].classList.add('active');
        boutiqueDots[currentBoutiqueSlide].classList.add('active');
    }
    // Auto-play cada 5 segundos
    setInterval(() => {
        showBoutiqueSlide(currentBoutiqueSlide + 1);
    }, 5000);
    console.log('Carrusel de boutiques cargado ✓');
}
// ============================ ANIMACIONES (DE PRODUCTOS.JS) ===============================
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
// ========================= EXPONER FUNCIONES GLOBALMENTE ==============================
window.formatPrice = formatPrice;
window.updateCartCount = updateCartCount;
window.displayCartModal = displayCartModal;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.closeSimpleCartModal = closeSimpleCartModal;
window.checkoutSimple = checkoutSimple;
window.addToCart = addToCart;
window.changeQuantitySimple = changeQuantitySimple;
window.removeFromCartSimple = removeFromCartSimple;
// ==================== INICIALIZAR =================================
window.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    updateCartCount();
    console.log('Sistema de carrito activo');
    console.log('12 productos cargados');
});
console.log("Script principal cargado");