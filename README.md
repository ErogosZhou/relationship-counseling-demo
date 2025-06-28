# 智慧心愈 - AI亲密关系咨询师

一个基于Claude AI的专业亲密关系咨询平台demo，为用户提供温暖、专业的情感支持和关系指导。

## 功能特色

- 🤖 **专业AI咨询师**: 基于Claude Sonnet 4模型，提供专业的关系指导
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

1. 访问 [Demo地址](https://your-username.github.io/relationship-counseling-demo/)
2. 选择感兴趣的话题或直接输入问题
3. 与AI咨询师开始对话

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