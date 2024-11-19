// 聊天对话框相关的JavaScript代码
function setupChatDialog() {
    console.log('Setting up chat dialog...'); // 调试日志

    // 获取所有需要的DOM元素
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const dialogContent = document.querySelector('.dialog-content');

    // 发送消息
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        console.log('Preparing to send message:', message); // 调试日志

        // 添加用户消息
        const userMsg = document.createElement('div');
        userMsg.className = 'message user';
        userMsg.textContent = message;
        dialogContent.appendChild(userMsg);

        // 清空输入框
        chatInput.value = '';

        // 添加加载消息
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'message ai loading';
        loadingMsg.textContent = '正在思考...';
        dialogContent.appendChild(loadingMsg);

        try {
            // 检查 AIService 是否正确初始化
            if (typeof window.aiService === 'undefined') {
                console.error('AIService is not initialized');
                throw new Error('AI服务未初始化，请刷新页面重试');
            }

            console.log('Sending message to AI service...'); // 调试日志

            // 调用 AI API
            const response = await window.aiService.chatWithAPIKey(message);
            console.log('Received AI response:', response); // 调试日志

            // 移除加载消息
            dialogContent.removeChild(loadingMsg);

            // 添加 AI 回复
            const aiMsg = document.createElement('div');
            aiMsg.className = 'message ai';
            aiMsg.textContent = response;
            dialogContent.appendChild(aiMsg);
        } catch (error) {
            console.error('Chat error:', error); // 调试日志
            
            // 移除加载消息
            if (loadingMsg.parentNode) {
                dialogContent.removeChild(loadingMsg);
            }

            // 添加错误消息
            const errorMsg = document.createElement('div');
            errorMsg.className = 'message ai error';
            errorMsg.textContent = error.message || '对话服务暂时不可用，请稍后重试';
            dialogContent.appendChild(errorMsg);
        }

        // 滚动到底部
        dialogContent.scrollTop = dialogContent.scrollHeight;
    }

    // 添加事件监听器
    if (sendButton) {
        console.log('Adding click listener to send button'); // 调试日志
        sendButton.addEventListener('click', async function(e) {
            e.preventDefault();
            console.log('Send button clicked'); // 调试日志
            await sendMessage();
        });
    } else {
        console.error('Send button not found'); // 调试日志
    }

    if (chatInput) {
        console.log('Adding keypress listener to chat input'); // 调试日志
        chatInput.addEventListener('keypress', async function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                console.log('Enter key pressed'); // 调试日志
                await sendMessage();
            }
        });

        // 自动调整输入框高度
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
    } else {
        console.error('Chat input not found'); // 调试日志
    }

    // 初始化时聚焦输入框
    if (chatInput) {
        chatInput.focus();
    }
}

// 导出函数
export { setupChatDialog }; 