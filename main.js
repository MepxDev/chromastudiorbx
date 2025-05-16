// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Load games dynamically
const gamesContainer = document.getElementById('games-container');
const games = [
    {
        title: "Chroma Adventures",
        description: "Explore vibrant worlds in this action-packed platformer.",
        image: "https://via.placeholder.com/400x225/6e48aa/ffffff?text=Chroma+Adventures",
        link: "https://www.roblox.com/games/..."
    },
    {
        title: "Neon Racing X",
        description: "High-speed racing with stunning neon visuals.",
        image: "https://via.placeholder.com/400x225/9d50bb/ffffff?text=Neon+Racing+X",
        link: "https://www.roblox.com/games/..."
    },
    {
        title: "Pixel Universe",
        description: "Build and explore in this blocky sandbox world.",
        image: "https://via.placeholder.com/400x225/4776e6/ffffff?text=Pixel+Universe",
        link: "https://www.roblox.com/games/..."
    }
];

function loadGames() {
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
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

// Load games when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadGames();
    
    // Set team member avatars (replace with actual images)
    const avatars = document.querySelectorAll('.member-avatar');
    avatars.forEach((avatar, index) => {
        avatar.style.backgroundImage = `url('https://via.placeholder.com/200x200/6e48aa/ffffff?text=Team+${index+1}')`;
    });
});

// Scroll reveal animation
window.addEventListener('scroll', revealOnScroll);

function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionVisible = 150;
        
        if (sectionTop < windowHeight - sectionVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize sections with hidden state
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Trigger initial reveal
revealOnScroll();
