const express = require('express');
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// 允许所有来源的请求
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// 智谱AI配置
const API_KEY = process.env.ZHIPU_API_KEY;
const GLM_CHAT_URL = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';

// 生成JWT Token
function generateToken(apiKey) {
    try {
        const [id, secret] = apiKey.split('.');
        if (!id || !secret) {
            throw new Error('API密钥格式不正确');
        }
        
        const payload = {
            api_key: id,
            exp: Math.floor(Date.now() / 1000) + 3600,
            timestamp: Math.floor(Date.now() / 1000)
        };

        console.log('正在生成token，payload:', {
            api_key: id,
            exp: payload.exp,
            timestamp: payload.timestamp
        });

        const token = jwt.sign(payload, secret, {
            algorithm: 'HS256',
            header: {
                alg: 'HS256',
                sign_type: 'SIGN'
            }
        });

        return token;
    } catch (error) {
        console.error('生成Token失败:', error);
        throw error;
    }
}

// 处理聊天请求
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            throw new Error('消息内容不能为空');
        }
        console.log('收到消息:', message);

        if (!API_KEY) {
            throw new Error('API密钥未配置');
        }

        const token = generateToken(API_KEY);
        console.log('生成token成功:', token.substring(0, 50) + '...');

        console.log('准备发送请求到智谱AI...');
        const requestData = {
            model: 'glm-4',
            messages: [{
                role: 'user',
                content: message
            }]
        };
        console.log('请求数据:', requestData);

        const response = await axios.post(
            GLM_CHAT_URL,
            requestData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // 30秒超时
            }
        );
        
        console.log('智谱AI响应状态:', response.status);
        console.log('智谱AI响应头:', response.headers);
        console.log('智谱AI响应数据:', response.data);
        
        if (!response.data || !response.data.choices || !response.data.choices[0]) {
            throw new Error('AI响应格式不正确');
        }

        res.json({
            success: true,
            reply: response.data.choices[0].message.content
        });
    } catch (error) {
        console.error('错误详情:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
        });

        res.status(500).json({
            success: false,
            error: '服务器错误',
            details: error.response?.data || error.message
        });
    }
});

// 测试路由
app.get('/test', (req, res) => {
    res.json({ message: '服务器正常运行' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log('API_KEY:', API_KEY ? '已配置' : '未配置');
    console.log('环境变量:', {
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV
    });
});

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的Promise拒绝:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
}); 