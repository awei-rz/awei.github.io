// 生成二进制字符串
const generateBinaryString = () => Array(Math.floor(Math.random() * 12) + 6)
    .fill(0)
    .map(() => Math.random() > 0.5 ? '1' : '0')
    .join('');

// 创建矩阵雨效果
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.matrix-bg').appendChild(canvas);

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const positions = Array(60).fill().map(() => ({
        x: -100,
        y: Math.random() * canvas.height,
        speed: Math.random() * 1.5 + 0.8,
        fontSize: Math.floor(Math.random() * 20) + 15,
        opacity: Math.random() * 0.4 + 0.1,
        binaryString: generateBinaryString()
    }));

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        positions.forEach(pos => {
            if (Math.random() < 0.03) pos.binaryString = generateBinaryString();
            
            ctx.font = `bold ${pos.fontSize}px monospace`;
            ctx.fillStyle = `rgba(0, 255, 0, ${pos.opacity})`;
            ctx.fillText(pos.binaryString, pos.x, pos.y);
            
            pos.x += pos.speed;
            
            if (pos.x > canvas.width) {
                Object.assign(pos, {
                    x: -100,
                    y: Math.random() * canvas.height,
                    speed: Math.random() * 1.5 + 0.8,
                    fontSize: Math.floor(Math.random() * 20) + 15,
                    opacity: Math.random() * 0.4 + 0.1,
                    binaryString: generateBinaryString()
                });
            }
        });

        requestAnimationFrame(draw);
    }

    draw();
}

// 页面跳转效果
function setupPageTransitions() {
    document.querySelectorAll('.cyber-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== window.location.pathname) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => window.location.href = this.getAttribute('href'), 300);
            }
        });
    });
}

// 打字机效果
function typeWriter() {
    const terminal = document.querySelector('.terminal-content');
    if (!terminal) return;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = terminal.innerHTML;
    
    const links = Array.from(tempDiv.querySelectorAll('a')).map(link => ({
        text: link.textContent,
        html: link.outerHTML
    }));

    const plainText = tempDiv.textContent;
    terminal.innerHTML = '';
    terminal.style.visibility = 'visible';
    
    let currentText = '';
    let i = 0;

    (function type() {
        if (i < plainText.length) {
            currentText += plainText[i];
            let displayText = currentText;
            
            links.forEach(link => {
                if (currentText.includes(link.text)) {
                    displayText = displayText.replace(link.text, link.html);
                }
            });
            
            terminal.innerHTML = displayText;
            i++;
            setTimeout(type, 30);
        }
    })();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
    setupPageTransitions();
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '1';
    setTimeout(typeWriter, 500);
});