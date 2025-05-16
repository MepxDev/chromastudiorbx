// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️ Light';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        }
    });
});

// Load games dynamically
const gamesContainer = document.getElementById('games-container');
const games = [
    {
        title: "Chroma Clash RBX",
        description: "Fast-paced obstacle course with color-changing mechanics and special power-ups.",
        image: "assets/game1.jpg",
        link: "https://www.roblox.com/games/0000000000/Chroma-Clash-RBX"
    },
    {
        title: "Neon Racing RBX",
        description: "High-speed racing through futuristic cities with customizable vehicles.",
        image: "assets/game2.jpg",
        link: "https://www.roblox.com/games/0000000000/Neon-Racing-RBX"
    },
    {
        title: "Color Universe RBX",
        description: "Sandbox world where you control color physics and build amazing structures.",
        image: "assets/game3.jpg",
        link: "https://www.roblox.com/games/0000000000/Color-Universe-RBX"
    },
    {
        title: "Spectrum Tower Defense",
        description: "Defend your base using color-based towers and special abilities.",
        image: "assets/game4.jpg",
        link: "https://www.roblox.com/games/0000000000/Spectrum-TD"
    }
];

function loadGames() {
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card fade-in';
        
        gameCard.innerHTML = `
            <div class="game-image" style="background-image: url('${game.image}')"></div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <p>${game.description}</p>
                <a href="${game.link}" class="game-link" target="_blank">Play Now</a>
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

// Animate stats counter
function animateStats() {
    const playersCount = document.getElementById('players-count');
    const gamesCount = document.getElementById('games-count');
    const membersCount = document.getElementById('members-count');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString() + (element === playersCount ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    animateValue(playersCount, 0, 10, 2000);
    animateValue(gamesCount, 0, 5, 1500);
    animateValue(membersCount, 0, 50, 2500);
}

// Scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.fade-in:not(.visible)');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('visible');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Load games
    loadGames();
    
    // Animate stats
    setTimeout(animateStats, 500);
    
    // Initialize scroll reveal
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Add fade-in class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
    });
});

// Handle back/forward navigation
window.addEventListener('popstate', function(e) {
    const targetId = window.location.hash;
    if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
});
