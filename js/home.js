// === HOME PAGE FUNCTIONALITY ===

// Form validation
function validateForm() {
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name) {
        document.getElementById('nameError').textContent = 'Nama harus diisi';
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('emailError').textContent = 'Email harus diisi';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Format email tidak valid';
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message) {
        document.getElementById('messageError').textContent = 'Pesan harus diisi';
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
function setupFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');
    
    if (feedbackForm && submitBtn) {
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            // Send form using Fetch API
            const formData = new FormData(feedbackForm);
            
            fetch(feedbackForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormMessage('Pesan berhasil dikirim! Terima kasih atas masukan Anda.', 'success');
                    feedbackForm.reset();
                } else {
                    showFormMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
                }
            })
            .catch(error => {
                showFormMessage('Terjadi kesalahan. Silakan coba lagi.', 'error');
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset loading state
                if (btnText) btnText.style.display = 'block';
                if (btnLoader) btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            });
        });
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize home page
function initHome() {
    setupFeedbackForm();
    initCardAnimations();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initHome);