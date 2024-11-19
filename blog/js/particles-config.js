// 创建数字雨效果
class MatrixRain {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particlesBg = document.getElementById('particles-bg');
        
        // 添加 canvas 到背景
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '1';
        this.particlesBg.appendChild(this.canvas);

        // 字符集
        this.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテト";
        this.drops = [];

        // 初始化
        this.initialize();
        
        // 开始动画
        this.animate();

        // 监听窗口大小变化
        window.addEventListener('resize', () => this.initialize());
    }

    initialize() {
        // 设置canvas尺寸
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // 字体大小
        const fontSize = 14;
        this.ctx.font = fontSize + 'px monospace';
        
        // 计算列数
        const columns = Math.floor(this.canvas.width / fontSize);
        
        // 初始化雨滴
        this.drops = [];
        for (let i = 0; i < columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }

    draw() {
        // 半透明黑色背景，形成拖尾效果
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 设置文字样式
        this.ctx.fillStyle = '#0F0';
        this.ctx.font = '14px monospace';

        // 绘制字符
        for (let i = 0; i < this.drops.length; i++) {
            // 随机字符
            const char = this.chars[Math.floor(Math.random() * this.chars.length)];
            
            // 计算位置
            const x = i * 14;
            const y = this.drops[i] * 14;

            // 绘制字符
            this.ctx.fillText(char, x, y);

            // 字符到底部后重置，或随机重置一些字符
            if (y > this.canvas.height || Math.random() > 0.98) {
                this.drops[i] = 0;
            }

            // 移动雨滴
            this.drops[i]++;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// 初始化数字雨
document.addEventListener('DOMContentLoaded', function() {
    const particlesBg = document.getElementById('particles-bg');
    if (particlesBg) {
        // 设置背景
        particlesBg.style.background = '#000000';
        
        // 添加发光效果
        const glowEffect = document.createElement('div');
        glowEffect.className = 'matrix-glow';
        particlesBg.appendChild(glowEffect);

        // 创建数字雨
        new MatrixRain();
    }
});

// 添加样式
const matrixStyles = `
.matrix-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    background: radial-gradient(circle at center, 
        rgba(0, 255, 0, 0.1) 0%, 
        rgba(0, 0, 0, 0.5) 50%, 
        rgba(0, 0, 0, 0.9) 100%
    );
    z-index: 2;
}

#particles-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background: #000000;
    overflow: hidden;
}
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = matrixStyles;
document.head.appendChild(styleSheet);

export default {}; // 为了保持模块化结构 