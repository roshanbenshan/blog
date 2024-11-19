// 动画相关的JavaScript代码
function initWaveAnimation() {
    // 设置初始状态
    const chars = document.querySelectorAll('.char');
    chars.forEach(char => {
        char.style.opacity = '0';
        char.style.transform = 'translateY(-100px)';
    });

    // 标题动画序列
    const titleChars = document.querySelectorAll('.animated-title .char');
    titleChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // 标语动画序列
    const taglineChars = document.querySelectorAll('.animated-tagline .char');
    taglineChars.forEach((char, index) => {
        setTimeout(() => {
            char.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        }, 1200 + (100 * index));
    });

    // 角色标签动画
    const roles = document.querySelectorAll('.role');
    roles.forEach((role, index) => {
        role.style.opacity = '0';
        role.style.transform = 'translateY(-50px)';
        setTimeout(() => {
            role.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            role.style.opacity = '1';
            role.style.transform = 'translateY(0)';
        }, 2000 + (200 * index));
    });

    // 联系信息动画
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            item.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 3000 + (200 * index));
    });

    // 按钮动画
    const buttons = document.querySelectorAll('.cta-buttons > *');
    buttons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(-30px)';
        setTimeout(() => {
            button.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 3500 + (200 * index));
    });

    // 波浪效果
    setTimeout(() => {
        titleChars.forEach((char, index) => {
            setTimeout(() => {
                char.classList.add('wave');
            }, index * 100);
        });
    }, 5000);
}

// 监听页面加载完成
document.addEventListener('DOMContentLoaded', () => {
    initWaveAnimation();
});

export { initWaveAnimation }; 