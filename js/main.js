import CONFIG from './config.js';
import AIService from './ai-service.js';
import { initWaveAnimation } from './animations.js';
import { initScrollHandling, initNavigation, initSkillsInteraction } from './ui-interactions.js';
import { setupChatDialog } from './chat-dialog.js';

document.addEventListener('DOMContentLoaded', function() {
    initializeAll();
});

function initializeAll() {
    try {
        window.aiService = new AIService(CONFIG.API_KEY);
        console.log('AIService initialized with key:', CONFIG.API_KEY);
        
        initMatrixRain();
        initClickHandlers();
        initAnimations();
        setupChatDialog();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

function initMatrixRain() {
    const particlesBg = document.getElementById('particles-bg');
    if (particlesBg) {
        particlesBg.style.background = '#000000';
        new MatrixRain();
    }
}

function initClickHandlers() {
    document.addEventListener('click', function(e) {
        if (e.target.matches('.cta-primary') || e.target.closest('.cta-primary')) {
            e.preventDefault();
            const experienceSection = document.querySelector('#about');
            if (experienceSection) {
                experienceSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

function initAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    initWaveAnimation();
}

class MatrixRain {
    constructor() {
        // ... 数字雨效果的实现代码 ...
    }
}