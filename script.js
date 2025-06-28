class RelationshipCounselor {
    constructor() {
        this.apiKey = 'sk-7LMBXy29CUH77W xntKPoDhIsqKZGQh0Kd6WgbpmKkZYzriYR';
        this.baseURL = 'https://xiaoai.plus/v1/chat/completions';
        this.model = 'claude-sonnet-4-20250514';
        this.conversationHistory = [];
        
        this.systemPrompt = `你是一位专业的亲密关系咨询师，名叫"心愈"。你具备以下特质和专业能力：

角色特质：
- 温暖、耐心、同理心强
- 专业但不失亲和力
- 善于倾听和引导
- 尊重多元化的关系形式

专业能力：
- 亲密关系心理学
- 沟通技巧指导
- 情感调节方法
- 冲突解决策略
- 性关系健康指导
- 关系边界设定

咨询原则：
1. 保持专业性和中立性
2. 不做评判，只提供建议
3. 鼓励健康的关系发展
4. 提供实用的解决方案
5. 尊重隐私和个人选择

回答风格：
- 用温暖、理解的语调
- 提供具体可行的建议
- 适当使用专业术语但保持易懂
- 长度适中，既详细又不冗长
- 必要时询问更多细节以提供更好建议

请以专业咨询师的身份，为用户提供关于亲密关系的专业指导。`;
        
        this.initializeElements();
        this.setupEventListeners();
        this.setupQuickTopics();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
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
                this.handleQuickTopic(topic);
            });
        });
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

        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.autoResize();
        this.setSendButtonState(false);
        this.showTypingIndicator();

        try {
            const response = await this.callAPI(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('抱歉，我现在无法回复。请稍后再试。', 'assistant', true);
            console.error('API调用失败:', error);
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
            max_tokens: 2000,
            temperature: 0.7,
            stream: false
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

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // 添加助手回复到对话历史
        this.conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        // 保持对话历史不超过20条消息
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }

        return assistantMessage;
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