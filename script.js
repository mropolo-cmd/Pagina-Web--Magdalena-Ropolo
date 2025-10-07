// ===== Menú móvil (hamburguesa + overlay) =====
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');
const overlay    = document.getElementById('overlay');

if (menuToggle && navLinks && overlay){
    menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    overlay.toggleAttribute('hidden', !open);
    overlay.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    overlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        overlay.setAttribute('hidden','');
        menuToggle.setAttribute('aria-expanded','false');
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape'){
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        overlay.setAttribute('hidden','');
        menuToggle.setAttribute('aria-expanded','false');
        }
    });
}   

// ===== Sonido del video =====
const video = document.getElementById('heroVideo');
const soundBtn = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

if (video && soundBtn && soundIcon){
    soundBtn.addEventListener('click', async () => {
        video.muted = !video.muted;
        soundIcon.textContent = video.muted ? '🔇' : '🔊';
        try { await video.play(); } catch(_) {}
        soundBtn.setAttribute('aria-pressed', (!video.muted).toString());
    });

    // Respeta “prefiere menos movimiento”
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches){ try{ video.pause(); }catch(_){} }
}
