// UI交互相关的JavaScript代码
function initScrollHandling() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 更新导航链接状态
    function updateNavLinks() {
        const currentPath = window.location.hash || '#hero';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 添加点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                updateNavLinks();
            }
        });
    });

    // 初始化时更新导航状态
    updateNavLinks();
}

function initSkillsInteraction() {
    const skillPoints = document.querySelectorAll('.skill-point');
    const tooltip = document.querySelector('.skill-tooltip');
    
    skillPoints.forEach(point => {
        const circle = point.querySelector('circle');
        
        circle.addEventListener('mouseenter', function(e) {
            showTooltip(e, point, tooltip);
        });
        
        circle.addEventListener('mouseleave', function() {
            hideTooltip(tooltip);
        });
    });
}

function showTooltip(event, point, tooltip) {
    const skill = point.dataset.skill;
    const score = point.dataset.score;
    const desc = point.dataset.desc;
    
    tooltip.innerHTML = `
        <div class="skill-title">${skill}</div>
        <div class="skill-score">能力评分：${score}分</div>
        <div class="skill-desc">${desc}</div>
    `;
    
    positionTooltip(event, tooltip);
    tooltip.classList.add('visible');
}

function hideTooltip(tooltip) {
    tooltip.classList.remove('visible');
}

function positionTooltip(event, tooltip) {
    const rect = event.target.getBoundingClientRect();
    const containerRect = document.querySelector('.radar-container').getBoundingClientRect();
    
    // ... 计算提示框位置的逻辑 ...
}

export { initScrollHandling, initNavigation, initSkillsInteraction }; 