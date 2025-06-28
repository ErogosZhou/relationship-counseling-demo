# 部署指南

## GitHub Pages 部署步骤

1. **在GitHub上创建新仓库**
   - 访问 https://github.com/new
   - 仓库名: `relationship-counseling-demo`
   - 设置为Public（GitHub Pages免费版需要）
   - 不要初始化README（我们已经有了）

2. **推送代码到GitHub**
   ```bash
   # 在项目目录中执行
   git remote add origin https://github.com/你的用户名/relationship-counseling-demo.git
   git branch -M main
   git push -u origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库的Settings页面
   - 滚动到"Pages"部分
   - Source选择"Deploy from a branch"
   - Branch选择"main"和"/ (root)"
   - 点击Save

4. **访问你的网站**
   - 几分钟后，网站将在以下地址可用：
   - `https://你的用户名.github.io/relationship-counseling-demo/`

## 其他部署选项

### Netlify (推荐)
1. 访问 https://netlify.com
2. 连接GitHub账户
3. 选择仓库一键部署
4. 自动获得HTTPS域名

### Vercel
1. 访问 https://vercel.com
2. 导入GitHub项目
3. 一键部署

## 注意事项

⚠️ **API密钥安全**:
- 当前API密钥直接写在代码中，仅适用于demo
- 生产环境应使用环境变量或服务端代理
- 考虑设置API调用限制

🌐 **域名访问**:
- GitHub Pages提供免费的 .github.io 子域名
- 可以绑定自定义域名
- 自动支持HTTPS

📱 **功能测试**:
- 部署后请在不同设备上测试
- 确认API调用正常工作
- 检查响应式设计效果