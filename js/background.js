document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('shootCanvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();

    const colors = ['#ff7b02','lime','white', '#800026', '#337ab7'];
    const particles = [];

    // количество частиц зависит от размера экрана
    const PARTICLE_DENSITY = 15000;
    let particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY);

    class Particle {
        constructor() {
            this.reset();
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= this.decay;
            if (this.alpha <= 0) this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random()-0.5) * 0.3;
            this.vy = (Math.random()-0.5) * 0.3;
            this.radius = Math.random() * 3 + 2;
            this.color = colors[Math.floor(Math.random()*colors.length)];
            this.alpha = 1;
            this.decay = Math.random()*0.0005 + 0.0002;
        }

        draw(ctx) {
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initParticles(){
        particles.length = 0;
        particleCount = Math.floor((canvas.width * canvas.height) / PARTICLE_DENSITY);
        for(let i=0;i<particleCount;i++){
            particles.push(new Particle());
        }
    }

    initParticles();

    function drawLines() {
        for (let i=0;i<particles.length;i++) {
            for (let j=i+1;j<particles.length;j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 120) {
                    ctx.strokeStyle = `rgba(144,238,144,${1 - dist/120})`; // светло-зеленый
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p => { p.update(); p.draw(ctx); });
        drawLines();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', ()=>{
        resizeCanvas();
        initParticles(); // пересоздаем частицы
    });

});