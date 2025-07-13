# 智慧心愈 - AI亲密关系咨询师

一个基于Claude AI的专业亲密关系咨询平台demo，为用户提供温暖、专业的情感支持和关系指导。

## 🆕 新功能特色

- ⚙️ **智能配置**: 支持多种AI模型选择（Claude、GPT-4等）
- 📝 **自定义提示词**: 预设多种角色（咨询师、助手、老师等）或自定义提示词
- 🔧 **灵活配置**: 用户可随时修改API密钥、模型和系统提示词
- 💾 **配置保存**: 所有配置自动保存到本地存储

## 功能特色

- 🤖 **多模型支持**: 支持Claude Sonnet 4、GPT-4o等多种AI模型
- 💬 **实时对话**: 流畅的聊天界面，支持实时交互
- 🎯 **快速话题**: 预设常见咨询话题，快速开始对话
- 📱 **响应式设计**: 支持手机和桌面设备
- 🔒 **隐私保护**: 对话数据仅在本地存储

## 咨询领域

- 💬 沟通问题与技巧
- 🤝 信任建立与修复  
- 💝 情感表达与理解
- ⚖️ 冲突处理方式
- 💕 亲密度与边界
- 🌱 长期关系维护
- 🌹 性关系健康指导

## 技术架构

- **前端**: 纯HTML + CSS + JavaScript
- **AI模型**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- **API服务**: xiaoai.plus镜像服务
- **部署**: GitHub Pages

## 快速开始

### 🎯 简单使用
1. 访问 [Demo地址](https://your-username.github.io/relationship-counseling-demo/)
2. 首次使用会自动弹出配置窗口，输入你的API密钥
3. 选择适合的AI模型和角色提示词
4. 点击"保存配置"开始使用

### ⚙️ 配置说明
- **API密钥**: 支持Claude或OpenAI的API密钥
- **模型选择**: 
  - Claude Sonnet 4 (推荐，适合对话)
  - GPT-4o (强大的多模态模型)
  - GPT-4o Mini (快速响应)
  - GPT-4 (经典版本)
  - GPT-3.5 Turbo (经济实惠)
- **预设角色**:
  - 亲密关系咨询师 (默认)
  - 通用AI助手
  - 创意写作助手
  - 专业商务助手
  - 教学辅导老师
  - 自定义角色

### 💡 使用技巧
1. 点击侧边栏的"⚙️ AI配置设置"随时修改配置
2. 选择不同角色会清空对话历史，开始新的会话
3. 所有配置都保存在本地，下次访问自动加载

## 本地运行

```bash
# 克隆项目
git clone https://github.com/your-username/relationship-counseling-demo.git

# 进入项目目录
cd relationship-counseling-demo

# 使用任意HTTP服务器运行
python -m http.server 8000
# 或者
npx serve .

# 访问 http://localhost:8000
```

## 项目结构

```
relationship-counseling-demo/
├── index.html          # 主页面
├── script.js           # 核心JavaScript逻辑
├── README.md           # 项目说明
└── assets/             # 静态资源(如需要)
```

## 配置说明

API配置在 `script.js` 中：

```javascript
class RelationshipCounselor {
    constructor() {
        this.apiKey = 'your-api-key';
        this.baseURL = 'https://xiaoai.plus/v1/chat/completions';
        this.model = 'claude-sonnet-4-20250514';
        // ...
    }
}
```

## 注意事项

⚠️ **重要提示**: 
- 本项目仅用于演示和学习目的
- AI咨询师的建议不能替代专业心理咨询师的意见
- 如遇严重心理健康问题，请寻求专业医疗帮助

## 隐私声明

- 对话数据不会被永久存储
- 建议不要分享过于敏感的个人信息
- 本demo不提供危机干预服务

## 许可证

MIT License

## 联系我们

如有问题或建议，欢迎提交Issue或PR。

---

💡 **温馨提示**: 健康的亲密关系需要双方的努力和理解，AI只是一个辅助工具，真正的改变需要在现实生活中践行。