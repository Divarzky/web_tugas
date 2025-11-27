// === AUTHENTICATION FUNCTIONS ===

// Check if user is logged in
function checkAuth() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return false;
    }
    return username;
}

// Update greeting with username
function updateGreeting() {
    const username = localStorage.getItem('username');
    const greetingElement = document.getElementById('greeting');
    
    if (username && greetingElement) {
        greetingElement.textContent = `Halo, ${username}! 👋`;
    }
}

// Handle logout
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Add fade-out animation
            document.body.style.animation = 'fadeOut 0.5s ease forwards';
            
            setTimeout(() => {
                localStorage.removeItem('username');
                window.location.href = 'login.html';
            }, 500);
        });
    }
}

// Handle login form
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    
    if (loginForm && usernameInput) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = usernameInput.value.trim();
            
            if (username) {
                // Save username to localStorage
                localStorage.setItem('username', username);
                
                // Animation before redirect
                const loginCard = document.querySelector('.login-card');
                if (loginCard) {
                    loginCard.style.animation = 'cardExit 0.5s ease forwards';
                }
                
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 500);
            }
        });
    }
}

// Initialize auth functionality
function initAuth() {
    if (window.location.pathname.includes('login.html')) {
        setupLoginForm();
    } else {
        const username = checkAuth();
        if (username) {
            updateGreeting();
            setupLogout();
        }
    }
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initAuth);