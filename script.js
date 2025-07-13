class RelationshipCounselor {
    constructor() {
        // 配置相关属性
        this.config = this.loadConfig();
        this.apiKey = this.config.apiKey;
        this.baseURL = 'https://xiaoai.plus/v1/chat/completions';
        this.model = this.config.model || 'claude-sonnet-4-20250514';
        this.systemPrompt = this.config.systemPrompt || this.getDefaultPrompt('relationship');
        this.conversationHistory = [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.setupQuickTopics();
        this.setupConfigModal();
        
        // 如果没有API密钥，自动打开配置模态框
        if (!this.apiKey) {
            this.showConfigModal();
        }
    }

    loadConfig() {
        const savedConfig = localStorage.getItem('ai_config');
        if (savedConfig) {
            return JSON.parse(savedConfig);
        }
        return {};
    }

    saveConfig(config) {
        localStorage.setItem('ai_config', JSON.stringify(config));
        this.config = config;
        this.apiKey = config.apiKey;
        this.model = config.model;
        this.systemPrompt = config.systemPrompt;
    }

    getDefaultPrompt(type) {
        const prompts = {
            relationship: `你是心愉，温暖的情感咨询师。

重要要求：
- 每次回复只能一段话，最多两句
- 像朋友聊天，用口语："嗯"、"哇"、"确实" 
- 多问具体问题，少给建议
- 用小例子建立共鸣："我朋友也..."
- 适当使用表达共情的emoji，例如❤️，🥺，💔，😔等等

例子：
用户：我和男友总是吵架
回复：哎呀，我朋友也遇到过这种 😔 你们最近一次是因为什么吵的？

记住：一段话，最多两句，简短有温度。`,
            general: '你是一个友善、有帮助的AI助手。请用中文回答用户的问题，保持礼貌和专业。',
            creative: '你是一个创意写作助手，擅长帮助用户进行创意写作、故事创作、文案撰写等工作。请发挥你的创造力和想象力。',
            professional: '你是一个专业的商务助手，擅长商务沟通、项目管理、数据分析等工作。请保持专业、准确、高效的风格。',
            teacher: '你是一个耐心的教学辅导老师，擅长解释复杂概念，提供学习建议。请用通俗易懂的方式回答问题。',
            custom: ''
        };
        return prompts[type] || prompts.general;
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        // 配置模态框元素
        this.configModal = document.getElementById('configModal');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.modelSelect = document.getElementById('modelSelect');
        this.systemPromptInput = document.getElementById('systemPromptInput');
        this.configBtn = document.getElementById('configBtn');
        this.saveConfigBtn = document.getElementById('saveConfig');
        this.cancelConfigBtn = document.getElementById('cancelConfig');
    }

    setupEventListeners() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.messageInput.addEventListener('input', () => {
            this.autoResize();
        });
    }

    setupQuickTopics() {
        const topicBtns = document.querySelectorAll('.topic-btn');
        topicBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const topic = btn.dataset.topic;
                if (topic) {
                    this.handleQuickTopic(topic);
                }
            });
        });
    }

    setupConfigModal() {
        // 配置按钮点击事件
        this.configBtn.addEventListener('click', () => {
            this.showConfigModal();
        });

        // 保存配置按钮
        this.saveConfigBtn.addEventListener('click', () => {
            this.handleSaveConfig();
        });

        // 取消按钮
        this.cancelConfigBtn.addEventListener('click', () => {
            this.hideConfigModal();
        });

        // 预设提示词按钮
        const presetBtns = document.querySelectorAll('.preset-btn');
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const preset = btn.dataset.preset;
                this.loadPresetPrompt(preset);
            });
        });

        // 点击模态框外部关闭
        this.configModal.addEventListener('click', (e) => {
            if (e.target === this.configModal) {
                this.hideConfigModal();
            }
        });
    }

    showConfigModal() {
        // 加载当前配置到表单
        this.apiKeyInput.value = this.config.apiKey || '';
        this.modelSelect.value = this.config.model || 'claude-sonnet-4-20250514';
        this.systemPromptInput.value = this.config.systemPrompt || this.getDefaultPrompt('relationship');
        
        this.configModal.classList.add('show');
    }

    hideConfigModal() {
        this.configModal.classList.remove('show');
    }

    loadPresetPrompt(preset) {
        const prompt = this.getDefaultPrompt(preset);
        this.systemPromptInput.value = prompt;
    }

    handleSaveConfig() {
        const apiKey = this.apiKeyInput.value.trim();
        const model = this.modelSelect.value;
        const systemPrompt = this.systemPromptInput.value.trim();

        // 验证API密钥
        if (!apiKey) {
            alert('请输入API密钥');
            return;
        }

        if (!apiKey.startsWith('sk-')) {
            alert('API密钥格式不正确，应该以 sk- 开头');
            return;
        }

        // 验证系统提示词
        if (!systemPrompt) {
            alert('请输入系统提示词');
            return;
        }

        // 保存配置
        const newConfig = {
            apiKey: apiKey,
            model: model,
            systemPrompt: systemPrompt
        };

        this.saveConfig(newConfig);
        this.hideConfigModal();
        
        // 清空对话历史，因为配置已改变
        this.conversationHistory = [];
        this.clearChatMessages();
        
        alert('配置已保存！');
    }

    clearChatMessages() {
        // 清空聊天消息，显示欢迎消息
        this.chatMessages.innerHTML = `
            <div class="welcome-message">
                <h3>配置已更新</h3>
                <p>您的AI配置已成功更新。现在可以开始新的对话了。</p>
                <p>当前模型：${this.model}</p>
            </div>
        `;
    }

    handleQuickTopic(topic) {
        const topicPrompts = {
            '沟通问题': '我在亲密关系中经常遇到沟通困难，我们总是误解对方的意思。请给我一些改善沟通的建议。',
            '信任危机': '我们的关系遇到了信任问题，我不知道该如何重建信任。请帮助我。',
            '情感表达': '我很难向伴侣表达自己的真实感受，害怕被拒绝或误解。该怎么办？',
            '冲突解决': '我们经常因为小事争吵，每次都不欢而散。如何更好地处理分歧？',
            '亲密度': '我感觉我们的关系缺乏亲密感，但不知道如何改善。请给些建议。',
            '长期关系': '我们在一起很久了，感觉关系进入了平淡期。如何保持关系的活力？',
            '性关系': '我们在性关系方面有些困扰，希望能得到一些专业的指导。'
        };

        const prompt = topicPrompts[topic];
        if (prompt) {
            this.messageInput.value = prompt;
            this.sendMessage();
        }
    }

    autoResize() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;

        // 检查是否已配置API密钥
        if (!this.apiKey) {
            alert('请先配置API密钥');
            this.showConfigModal();
            return;
        }

        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.autoResize();
        this.setSendButtonState(false);
        this.showTypingIndicator();

        try {
            await this.callAPI(message);
            this.hideTypingIndicator();
        } catch (error) {
            this.hideTypingIndicator();
            console.error('API调用失败:', error);
            
            let errorMessage = '抱歉，我现在无法回复。请稍后再试。';
            if (error.message.includes('401')) {
                errorMessage = '认证失败，请检查API密钥是否正确。';
            } else if (error.message.includes('429')) {
                errorMessage = 'API调用频率过高，请稍后再试。';
            } else if (error.message.includes('500')) {
                errorMessage = '服务器内部错误，请稍后再试。';
            }
            
            this.addMessage(errorMessage, 'assistant', true);
        } finally {
            this.setSendButtonState(true);
        }
    }

    async callAPI(message) {
        // 添加用户消息到对话历史
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        // 构建完整的消息数组
        const messages = [
            {
                role: 'system',
                content: this.systemPrompt
            },
            ...this.conversationHistory
        ];

        const requestData = {
            model: this.model,
            messages: messages,
            max_tokens: 500,
            temperature: 0.7,
            stream: true
        };

        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 创建一个空的assistant消息容器
        const assistantMessageDiv = this.addMessage('', 'assistant');
        const messageContent = assistantMessageDiv.querySelector('.message-content');
        
        let fullMessage = '';
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.slice(6);
                        if (jsonStr === '[DONE]') continue;
                        
                        try {
                            const data = JSON.parse(jsonStr);
                            const content = data.choices?.[0]?.delta?.content;
                            if (content) {
                                fullMessage += content;
                                messageContent.innerHTML = fullMessage.replace(/\n/g, '<br>');
                                this.scrollToBottom();
                            }
                        } catch (e) {
                            // 忽略解析错误
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }

        // 添加助手回复到对话历史
        this.conversationHistory.push({
            role: 'assistant',
            content: fullMessage
        });

        // 保持对话历史不超过20条消息
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }

        return fullMessage;
    }

    addMessage(content, sender, isError = false) {
        // 移除欢迎消息
        const welcomeMessage = this.chatMessages.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.remove();
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;

        const avatar = document.createElement('div');
        avatar.className = `avatar ${sender}-avatar`;
        avatar.textContent = sender === 'user' ? '我' : 'AI';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (isError) {
            messageContent.style.background = '#fee';
            messageContent.style.color = '#c53030';
        }

        // 处理换行符
        messageContent.innerHTML = content.replace(/\n/g, '<br>');

        if (sender === 'user') {
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(avatar);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
        }

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        return messageDiv;
    }

    showTypingIndicator() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.style.display = 'none';
    }

    setSendButtonState(enabled) {
        this.sendBtn.disabled = !enabled;
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new RelationshipCounselor();
});