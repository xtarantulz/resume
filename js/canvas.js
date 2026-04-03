const canvas = document.getElementById('scrambleCanvas');
const ctx = canvas.getContext('2d');

const targetText = "Senior Software Engineer (PHP / Full-Stack)";
const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/@#$%&";

let frames = 0;

let mouse = { x: -9999, y: -9999 };

let particles = targetText.split('').map((char, index) => ({
    current: '',
    target: char,
    isDone: char === ' ',
    delay: index * 5,
    locked: char === ' ',
    x: 0,
    w: 0
}));

// -------------------- RESIZE --------------------
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// -------------------- MOUSE TRACK --------------------
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
});

// -------------------- DRAW --------------------
function draw() {
    const rect = canvas.getBoundingClientRect();

    ctx.clearRect(0, 0, rect.width, rect.height);

    const fontSize = 18;
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.textBaseline = "middle";

    const step = rect.width / particles.length;

    let x = 0;
    const y = rect.height / 2;

    let allDone = true;

    particles.forEach((p) => {

        const isSpace = p.target === ' ';
        const w = isSpace ? step * 0.5 : step;

        p.x = x;
        p.w = w;

        // ---------------- HIT TEST ----------------
        const hovered =
            mouse.x >= x &&
            mouse.x <= x + w &&
            mouse.y >= y - fontSize &&
            mouse.y <= y + fontSize;

        if (hovered && p.target !== ' ') {
            p.locked = false; // 🔥 разблокируем при наведении
            p.isDone = false;
        }

        // ---------------- SCRAMBLE LOGIC ----------------
        if (frames > p.delay && !p.locked) {
            p.current = symbols[Math.floor(Math.random() * symbols.length)];
            allDone = false;

            if (frames > p.delay + 40 && Math.random() < 0.05 && !hovered) {
                p.current = p.target;
                p.isDone = true;
                p.locked = true;
            }
        } else {
            if (!p.locked) {
                p.current = '';
                allDone = false;
            }
        }

        ctx.fillStyle = p.isDone ? "#44ff44" : "#44ff44";

        ctx.fillText(p.current, x, y);

        x += w;
    });

    frames++;

    requestAnimationFrame(draw);
}

draw();