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
        // ----- Hover swap (1 ↔ 2) + preload -----
        const imgEl = productCard.querySelector('.product-image');
        const preload = new Image();
        preload.src = second;
        imgEl.addEventListener('mouseenter', () => { imgEl.src = second; });
        imgEl.addEventListener('mouseleave', () => { imgEl.src = first; });
        // En tel: primer toque alterna
        imgEl.addEventListener('touchstart', () => {
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

// ==================== INICIALIZAR =================================
window.addEventListener('DOMContentLoaded', function () {
    displayProducts();
    console.log('12 productos cargados ✓');
});

