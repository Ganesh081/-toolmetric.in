// ToolMetric - Common JavaScript Functions
// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Utility functions
function showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.tool-content') || document.querySelector('main');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).then(() => {
            showMessage('Copied to clipboard!', 'success');
        }).catch(() => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showMessage('Copied to clipboard!', 'success');
    } catch (err) {
        showMessage('Failed to copy text', 'error');
    }
    
    textArea.remove();
}

function downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type: type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    showMessage(`File "${filename}" downloaded!`, 'success');
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Reading time calculation
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength++;
    else feedback.push("At least 8 characters");
    
    if (password.length >= 12) strength++;
    
    if (/[a-z]/.test(password)) strength++;
    else feedback.push("Lowercase letter");
    
    if (/[A-Z]/.test(password)) strength++;
    else feedback.push("Uppercase letter");
    
    if (/[0-9]/.test(password)) strength++;
    else feedback.push("Number");
    
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    else feedback.push("Special character");
    
    const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981'];
    
    return {
        score: strength,
        level: levels[strength] || 'Very Weak',
        color: colors[strength] || '#ef4444',
        feedback: feedback
    };
}

// File validation
function validateFileType(file, allowedTypes) {
    return allowedTypes.includes(file.type);
}

function validateFileSize(file, maxSizeMB) {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxSizeBytes;
}

// Format bytes to human readable format
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

// Get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set URL parameters
function setUrlParameter(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, '', url);
}

// Local storage helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Failed to save to localStorage:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Failed to get from localStorage:', e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Failed to remove from localStorage:', e);
        return false;
    }
}

// Loading state management
function showLoading(element) {
    if (element) {
        element.disabled = true;
        element.innerHTML = '<span class="spinner"></span> Processing...';
    }
}

function hideLoading(element, originalText) {
    if (element) {
        element.disabled = false;
        element.innerHTML = originalText;
    }
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRequired(fields) {
    let isValid = true;
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element && !element.value.trim()) {
            element.classList.add('error');
            isValid = false;
        } else if (element) {
            element.classList.remove('error');
        }
    });
    return isValid;
}

// Theme management (for future dark mode)
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    saveToLocalStorage('theme', newTheme);
}

function loadTheme() {
    const savedTheme = getFromLocalStorage('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Analytics (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, properties);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackEvent('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
});

// Service Worker registration (for future PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Placeholder for service worker registration
        console.log('Service Worker support detected');
    });
}
