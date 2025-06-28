# GitHub 提交和部署指南

## 1. 创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名称：`relationship-counseling-demo`
3. 描述：`智慧心愉 - AI亲密关系咨询师demo`
4. 设置为 **Public**（GitHub Pages免费版需要）
5. 不要勾选任何初始化选项（README, .gitignore, license）
6. 点击 "Create repository"

## 2. 推送代码到GitHub

创建仓库后，GitHub会显示命令，或者你可以在终端执行：

```bash
# 在项目目录中执行以下命令：
cd "/Users/zhouzichao/产品体验设计/relationship-counseling-demo"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/relationship-counseling-demo.git

# 推送代码
git branch -M main
git push -u origin main
```

## 3. 启用GitHub Pages

1. 进入你的仓库页面
2. 点击 **Settings** 标签
3. 滚动到 **Pages** 部分
4. 在 "Source" 下选择：
   - **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. 点击 **Save**

## 4. 访问你的网站

几分钟后，你的网站将在以下地址可用：
```
https://YOUR_USERNAME.github.io/relationship-counseling-demo/
```

## 5. 测试功能

- 主应用：`https://YOUR_USERNAME.github.io/relationship-counseling-demo/`
- 测试工具：`https://YOUR_USERNAME.github.io/relationship-counseling-demo/test.html`

## 注意事项

⚠️ **重要**：
- 确保仓库设置为Public，否则GitHub Pages不可用
- 部署可能需要5-10分钟生效
- 如遇问题，检查Settings > Pages中的状态

🔗 **分享链接**：
部署完成后，你可以将链接分享给同事测试！