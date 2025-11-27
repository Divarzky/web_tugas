// === UTILITY FUNCTIONS ===

// Clean code text (remove extra whitespace)
function cleanCode(code) {
    return code.trim();
}

// Show notification message
function showNotification(message, type = 'info', duration = 3000) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    const colors = {
        info: 'linear-gradient(135deg, #00d9f5, #3b3060)',
        success: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
        error: 'linear-gradient(135deg, #f44336, #C62828)',
        warning: 'linear-gradient(135deg, #FF9800, #EF6C00)'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Initialize card animations
function initCardAnimations() {
    document.addEventListener('DOMContentLoaded', function() {
        const cards = document.querySelectorAll('.animated-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate-in');
        });
    });
}

// Add fade-out animation to body
function addFadeOutAnimation(duration = 500) {
    document.body.style.animation = `fadeOut ${duration}ms ease forwards`;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cleanCode,
        showNotification,
        initCardAnimations,
        addFadeOutAnimation
    };
}