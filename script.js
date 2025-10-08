console.log("Assouline x Magdalena Ropolo — sitio cargado correctamente");

// ===================================
// CONTROL DEL SONIDO DEL VIDEO
// ===================================
const video = document.getElementById('heroVideo');
const soundBtn = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

soundBtn.addEventListener('click', () => {
    video.muted = !video.muted;

    if (video.muted) {
        soundIcon.className = 'fas fa-volume-mute';
    } else {
        soundIcon.className = 'fas fa-volume-up';
    }
});

// ===================================
// MENÚ DESPLEGABLE MÓVIL
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
});

// Cerrar menú si se toca el overlay
overlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
});

// ===================================
// CARRUSEL DE DESTINOS
// ===================================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Función para mostrar slide
function showSlide(index) {
    // Asegurarse de que el índice esté en rango
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    // Quitar clase active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Agregar clase active al actual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Botón siguiente
nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Botón anterior
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

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

// ============================ NEWSLETTER FORM ===========================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        // Simular suscripción
        alert(`¡Gracias por suscribirte! Te enviaremos novedades a ${email}`);
        emailInput.value = '';
    });
}

console.log("Newsletter y footer cargados ✓");