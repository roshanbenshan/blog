const API_URL = 'https://api.x.ai';
const API_KEY = 'xai-d6PkgdNmwx8x28hxr5H1Kbk1LpOIoZQ0tPNqd1JytJvdljR6x0EVUeKcPQkvI7XqwKpknwg0AP65x9pN';

class AIService {
    async sendMessage(message) {
        try {
            const response = await fetch(`${API_URL}/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    messages: [{
                        role: 'user',
                        content: message
                    }],
                    model: 'grok-beta',
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error('API请求失败');
            }

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('AI服务错误:', error);
            return '抱歉，我现在无法回应，请稍后再试。';
        }
    }
}

export const aiService = new AIService(); 