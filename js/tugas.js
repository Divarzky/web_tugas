// === TUGAS PAGE FUNCTIONALITY ===

// Copy code functionality
function setupCopyButtons() {
    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const codeElement = document.getElementById(targetId);
            const codeText = cleanCode(codeElement.textContent);
            
            // Use Clipboard API to copy text
            navigator.clipboard.writeText(codeText).then(() => {
                // Button copy animation
                this.classList.add('copied');
                this.textContent = 'Copied!';
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.textContent = 'Copy';
                }, 2000);
                
                // Show notification
                showNotification('Kode berhasil disalin!', 'success');
            }).catch(err => {
                console.error('Could not copy text: ', err);
                showNotification('Gagal menyalin teks.', 'error');
            });
        });
    });
}

// Download TXT functionality
function setupDownloadButtons() {
    document.querySelectorAll('.download-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const filename = this.getAttribute('data-filename');
            const codeElement = document.getElementById(targetId);
            const codeText = cleanCode(codeElement.textContent);

            // Download button animation
            this.classList.add('downloading');
            
            setTimeout(() => {
                // Create Blob from text
                const blob = new Blob([codeText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);

                // Create temporary <a> element for download
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url); // Clean up object URL
                
                this.classList.remove('downloading');
                
                // Show notification
                showNotification('File berhasil diunduh!', 'success');
            }, 500);
        });
    });
}

// Initialize tugas page
function initTugas() {
    setupCopyButtons();
    setupDownloadButtons();
    initCardAnimations();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', initTugas);