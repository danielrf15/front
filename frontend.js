// Custom Gold Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('follower');
let mX = -100, mY = -100, fX = -100, fY = -100;

window.addEventListener('mousemove', function (e) {
    mX = e.clientX;
    mY = e.clientY;
    cursor.style.transform = `translate3d(${mX}px, ${mY}px, 0)`;
});

function renderFollower() {
    fX += (mX - fX) * 0.15;
    fY += (mY - fY) * 0.15;
    follower.style.transform = `translate3d(${fX}px, ${fY}px, 0)`;
    requestAnimationFrame(renderFollower);
}
requestAnimationFrame(renderFollower);

// Interactive Element Hover Effect (Manual For-Loop, Zero Predefined Array Methods)
const interactives = document.querySelectorAll('a, button, .look-card, .atelier-row, .loveluxe-seal');
for (let i = 0; i < interactives.length; i++) {
    interactives[i].addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    interactives[i].addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
}

// Scroll Progress & Navbar styling
const nav = document.getElementById('main-nav');
const scrollBar = document.getElementById('scroll-progress');

window.addEventListener('scroll', function () {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollBar.style.width = (winScroll / height * 100) + '%';

    if (winScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, { passive: true });

// Ambient Gold Dust Canvas
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');
let w, h;

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const particles = [
    { x: w * 0.3, y: h * 0.3, r: 400, vx: 0.15, vy: 0.15, color: 'rgba(216, 178, 110, 0.05)' },
    { x: w * 0.7, y: h * 0.7, r: 480, vx: -0.12, vy: -0.12, color: 'rgba(246, 222, 192, 0.035)' }
];

function drawAmbient() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -100 || p.x > w + 100) p.vx *= -1;
        if (p.y < -100 || p.y > h + 100) p.vy *= -1;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, p.color);
        g.addColorStop(1, 'rgba(7, 7, 7, 0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(drawAmbient);
}
drawAmbient();