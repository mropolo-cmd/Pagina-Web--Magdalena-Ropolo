console.log("Assouline x Magdalena Ropolo – sitio cargado correctamente");

// ========================== CARRITO GLOBAL (FUNCIONA EN TODAS LAS PÁGINAS) ================================
let cart = JSON.parse(localStorage.getItem('assoulineCart')) || [];
// Función para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}
// Función para guardar carrito
function updateCart() {
    localStorage.setItem('assoulineCart', JSON.stringify(cart));
    updateCartCount();
}
// Formatear precio
function formatPrice(price) {
    return '$' + price.toLocaleString('es-AR');
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

// ================================= CARRUSEL DE DESTINOS =============================
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slides.length > 0 && dots.length > 0) {
    let currentSlide = 0;

    // Función para mostrar slide
    function showSlide(index) {
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

    // Botón siguiente
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }
    // Botón anterior
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }
    // Click en los puntitos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    // Cambio automático cada 5 segundos
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
    console.log("Carrusel de destinos cargado ✓");
}
// ============================ NEWSLETTER FORM ===========================
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
            // Si estamos en index o sobre nosotros, mostrar modal simple
            showSimpleCartModal();
        }
    });
}
// ======================== MODAL SIMPLE PARA INDEX Y SOBRE NOSOTROS ======================
function showSimpleCartModal() {
    // Crear modal si no existe
    let modal = document.getElementById('simpleCartModal');
    if (!modal) {
        modal = createSimpleCartModal();
        document.body.appendChild(modal);
    }
    // Actualizar contenido
    updateSimpleCartContent();
    // Mostrar modal
    modal.style.display = 'flex';
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
    // Cerrar al hacer click fuera
    modal.addEventListener('click', (e) => {
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
    alert('¡Gracias por tu compra! Esta es una demo.');
    cart = [];
    updateCart();
    closeSimpleCartModal();
}
// ======================== FUNCIONES PARA PRODUCTOS.HTML (CON BOOTSTRAP) ======================
function displayCartModal() {
    const cartBody = document.getElementById('cartModalBody');
    const cartTotal = document.getElementById('cartModalTotal');
    if (!cartBody) return;
    // Recargar carrito desde localStorage
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
// Exponer funciones globalmente
window.formatPrice = formatPrice;
window.updateCartCount = updateCartCount;
window.displayCartModal = displayCartModal;
window.changeQuantity = changeQuantity;
window.removeFromCart = removeFromCart;
window.closeSimpleCartModal = closeSimpleCartModal;
window.checkoutSimple = checkoutSimple;
// ==================== INICIALIZAR =================================
window.addEventListener('DOMContentLoaded', function () {
    updateCartCount();
    console.log('Sistema de carrito activo ✓');
});
console.log("Script principal cargado ✓");
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

// ================== MENÚ MÓVIL ==================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

if (menuToggle && navLinks && overlay) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        menuToggle.classList.toggle('active'); // animación del botón
    });

    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}
