// Mobile Nav Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Particle Background Animation using Canvas
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(27, 188, 155, ${this.alpha})`;
        ctx.fill();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.draw();
    }
}

function initParticles(num = 100) {
    particles = [];
    for (let i = 0; i < num; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        particles.push(new Particle(x, y));
    }
}

// === MOSQUITO ANIMATION SECTION === //
const mosquitoes = [];

class Mosquito {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20 + Math.random() * 10;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.emoji = '🦟'; // Thematic: mosquito emoji
    }

    draw() {
        ctx.font = `${this.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(255, 0, 0, 0.6)`; // red-ish color for danger
        ctx.fillText(this.emoji, this.x, this.y);
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;

        this.draw();
    }
}

function spawnMosquitoes(num = 5) {
    for (let i = 0; i < num; i++) {
        let x = Math.random() * width;
        let y = Math.random() * height;
        mosquitoes.push(new Mosquito(x, y));
    }
}

function animateMosquitoes() {
    mosquitoes.forEach(mosquito => mosquito.update());
}

// Main Animation Loop
function animate() {
    ctx.fillStyle = "rgba(44, 62, 80, 0.2)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => p.update());
    animateMosquitoes();

    requestAnimationFrame(animate);
}

initParticles(150);
spawnMosquitoes(8); // Add some mosquitoes to the canvas
animate();

// GSAP Scroll Animations
document.querySelectorAll(".section-content").forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // Split text for spiraling animation
    const title = document.querySelector(".section h1");
    title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    // God-Level GSAP Animations
    gsap.from(".navbar", { 
        y: -100, 
        opacity: 0, 
        duration: 1, 
        ease: "power3.out" 
    });
    gsap.from(".letter", { 
        opacity: 0, 
        x: () => Math.random() * 200 - 100, 
        y: () => Math.random() * 200 - 100, 
        rotation: () => Math.random() * 720, 
        scale: 0.1, 
        stagger: 0.02, 
        duration: 1.8, 
        ease: "elastic.out(1, 0.3)", 
        delay: 0.5 
    });
    gsap.from(".description-list li", { 
        opacity: 0, 
        y: 50, 
        x: () => Math.random() * 50 - 25, 
        rotation: () => Math.random() * 20 - 10, 
        stagger: 0.2, 
        duration: 1.2, 
        ease: "power3.out", 
        delay: 1.5 
    });
    gsap.from(".chart-button", { 
        opacity: 0, 
        scale: 0.8, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "back.out(1.7)", 
        delay: 2 
    });
    gsap.from(".charts-container canvas", { 
        opacity: 0, 
        scale: 0.9, 
        duration: 1, 
        ease: "power2.out", 
        delay: 2.5 
    });
    gsap.to(".cta-button", { 
        scale: 1.05, 
        boxShadow: "0 0 20px rgba(230, 126, 34, 0.7)", 
        repeat: -1, 
        yoyo: true, 
        duration: 1.2, 
        ease: "sine.inOut", 
        delay: 3 
    });

    // Enhanced Particle Animation (Pulsing Swarms)
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 70;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 1;
            this.speedX = Math.random() * 1.5 - 0.75;
            this.speedY = Math.random() * 1.5 - 0.75;
            this.pulseTimer = Math.random() * 200;
            this.targetX = Math.random() * canvas.width;
            this.targetY = Math.random() * canvas.height;
        }

        update() {
            if (this.pulseTimer <= 0) {
                // Move toward swarm center
                this.x += (this.targetX - this.x) * 0.04;
                this.y += (this.targetY - this.y) * 0.04;
                if (Math.abs(this.x - this.targetX) < 30 && Math.abs(this.y - this.targetY) < 30) {
                    this.pulseTimer = Math.random() * 200 + 100;
                    this.targetX = Math.random() * canvas.width;
                    this.targetY = Math.random() * canvas.height;
                }
            } else {
                // Normal movement
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulseTimer--;
            }

            if (this.size > 0.2) this.size -= 0.005;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = "rgba(44, 62, 80, 0.7)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
            if (particle.size <= 0.2) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        gsap.from(".nav-links a", { 
            opacity: 0, 
            x: -20, 
            stagger: 0.1, 
            duration: 0.5, 
            ease: "power2.out" 
        });
    });

    // Chart Switching Logic
    function showChart(type) {
        const charts = ['bar', 'pie', 'doughnut', 'line'];
        charts.forEach(chart => {
            const el = document.getElementById(chart + 'Chart');
            el.style.display = chart === type ? 'block' : 'none';
            el.classList.toggle('active', chart === type);
        });

        document.querySelectorAll('.chart-button').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('onclick').includes(type));
        });

        // Animate chart appearance
        gsap.from(`#${type}Chart`, { 
            opacity: 0, 
            scale: 0.95, 
            duration: 0.6, 
            ease: "power2.out" 
        });

        // Force chart redraw
        setTimeout(() => {
            if (window[type + 'Chart']) window[type + 'Chart'].resize();
        }, 100);
    }

    // Initialize Charts
    window.barChart = new Chart(document.getElementById('barChart'), {
        type: 'bar',
        data: {
            labels: ['Coils/Vaporizers/Racket', 'Nets/Screens', 'Water Removal'],
            datasets: [{
                label: 'Used By (out of 50)',
                data: [24, 21, 32],
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12'],
                borderColor: ['#2980b9', '#27ae60', '#e67e22'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: '#34495e' } },
                tooltip: { backgroundColor: '#1a3c34', titleColor: '#fff', bodyColor: '#b3d4c9' }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#34495e' } },
                x: { ticks: { color: '#34495e' } }
            },
            animation: { duration: 1000, easing: 'easeOutQuart' }
        }
    });

    window.pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'pie',
        data: {
            labels: ['Remove Stagnant Water', 'Do Not Remove'],
            datasets: [{
                label: 'Residents',
                data: [32, 18],
                backgroundColor: ['#e67e22', '#e74c3c'],
                borderColor: ['#d35400', '#c0392b'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: '#34495e' } },
                tooltip: { backgroundColor: '#1a3c34', titleColor: '#fff', bodyColor: '#b3d4c9' }
            },
            animation: { duration: 1000, easing: 'easeOutQuart' }
        }
    });

    window.doughnutChart = new Chart(document.getElementById('doughnutChart'), {
        type: 'doughnut',
        data: {
            labels: ['Use Nets', 'No Nets'],
            datasets: [{
                label: 'Mosquito Nets Usage',
                data: [21, 29],
                backgroundColor: ['#3498db', '#95a5a6'],
                borderColor: ['#2980b9', '#7f8c8d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: '#34495e' } },
                tooltip: { backgroundColor: '#1a3c34', titleColor: '#fff', bodyColor: '#b3d4c9' }
            },
            animation: { duration: 1000, easing: 'easeOutQuart' }
        }
    });

    window.lineChart = new Chart(document.getElementById('lineChart'), {
        type: 'line',
        data: {
            labels: ['Govt Activity Seen', 'Active Prevention'],
            datasets: [
                {
                    label: 'Government Control Seen',
                    data: [28, 28],
                    borderColor: '#8e44ad',
                    backgroundColor: 'rgba(142, 68, 173, 0.2)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Residents Practicing',
                    data: [32, 32],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.2)',
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top', labels: { color: '#34495e' } },
                tooltip: { backgroundColor: '#1a3c34', titleColor: '#fff', bodyColor: '#b3d4c9' }
            },
            scales: {
                y: { beginAtZero: true, ticks: { color: '#34495e' } },
                x: { ticks: { color: '#34495e' } }
            },
            animation: { duration: 1000, easing: 'easeOutQuart' }
        }
    });

    // Show default chart
    showChart('bar');
});
