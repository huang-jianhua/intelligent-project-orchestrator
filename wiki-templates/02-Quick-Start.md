# 📖 快速开始指南

本页面将帮助您在5分钟内上手智能项目编排系统，体验AI角色切换的强大功能。

## 🎯 学习目标

完成本指南后，您将能够：
- ✅ 成功安装并运行系统
- ✅ 理解7种专业角色的作用
- ✅ 体验智能角色切换功能
- ✅ 运行第一个工作流示例

## 📋 环境要求

### 🔧 系统要求
- **操作系统**: Windows 10+, macOS 10.15+, Linux (Ubuntu 18.04+)
- **Node.js**: 版本 14.0.0 或更高
- **内存**: 至少 512MB 可用内存
- **磁盘空间**: 至少 100MB 可用空间

### 🛠️ 开发工具 (推荐)
- **Cursor IDE**: 获得最佳的集成体验
- **VS Code**: 也支持，但功能有限
- **终端**: 支持Node.js和npm命令

## 🚀 安装步骤

### 第一步: 克隆仓库

```bash
# 使用HTTPS克隆
git clone https://github.com/huang-jianhua/intelligent-project-orchestrator.git

# 或使用SSH (如果已配置)
git clone git@github.com:huang-jianhua/intelligent-project-orchestrator.git

# 进入项目目录
cd intelligent-project-orchestrator
```

### 第二步: 安装依赖

```bash
# 安装项目依赖
npm install

# 验证安装
npm list --depth=0
```

### 第三步: 验证安装

```bash
# 运行测试确保一切正常
npm test

# 运行演示脚本
npm run demo
```

**期望输出**:
```
🎭 智能项目编排系统演示
══════════════════════════════════════════════
✅ 所有测试通过
🎉 智能编排系统演示完成！
```

## 💡 第一个示例

### 🎭 体验角色切换

创建一个简单的测试文件：

```javascript
// 创建文件: my-first-test.js
const ProjectOrchestrator = require('./src/orchestrator-demo.js');

// 创建编排器实例
const orchestrator = new ProjectOrchestrator();

// 测试不同的输入场景
const testCases = [
    '我们需要分析用户增长数据',      // 应该切换到运营总监
    '帮我修复这个登录bug',          // 应该切换到开发工程师
    '设计一个更好的用户界面',       // 应该切换到产品设计师
    '数据库查询太慢了',            // 应该切换到系统架构师
];

console.log('🎭 智能角色识别测试');
console.log('═══════════════════════');

testCases.forEach((input, index) => {
    console.log(`\n测试 ${index + 1}: "${input}"`);
    const result = orchestrator.determineRole(input);
    console.log(`🎯 识别角色: ${result.role}`);
    console.log(`📊 置信度: ${result.confidence}%`);
});
```

运行测试：
```bash
node my-first-test.js
```

### 🔄 体验工作流编排

```javascript
// 测试自动工作流
console.log('\n🔄 工作流编排测试');
console.log('═══════════════════════');

// 模拟一个Web应用开发项目
const webProject = orchestrator.createWorkflow('web-application');
webProject.execute('创建一个电商网站');

// 查看执行结果
console.log('📋 工作流步骤:');
webProject.getSteps().forEach((step, index) => {
    console.log(`${index + 1}. ${step.role} - ${step.task}`);
});
```

## 🎨 Cursor IDE 集成

如果您使用Cursor IDE，系统会自动激活智能编排功能：

### 1. 打开项目
```bash
cursor .
```

### 2. 查看.cursorrules文件
系统会自动读取项目根目录的`.cursorrules`文件，激活AI角色切换功能。

### 3. 开始对话
在Cursor中开始对话，系统会根据您的输入自动切换到最合适的角色：

- 💬 "帮我优化这个API的性能" → 🏗️ 系统架构师
- 💬 "这个按钮颜色不好看" → 🎨 产品设计师  
- 💬 "测试一下登录功能" → 🧪 测试工程师

## 📊 验证系统功能

### 🧪 运行完整测试套件

```bash
# 运行所有测试
npm test

# 运行角色测试
npm run test:roles

# 运行性能测试
npm run test:performance
```

### 📈 查看性能指标

```bash
# 运行性能分析
node examples/performance-analysis.js
```

**期望输出**:
```
📊 性能分析报告
═════════════════
🎯 角色识别准确率: 96.5%
⚡ 平均响应时间: 342ms
🔄 工作流效率提升: 58%
✅ 系统稳定性: 99.2%
```

## ⚠️ 常见问题

### ❌ Node.js版本过低
**错误**: `Error: Node.js version 12.x.x is not supported`

**解决**: 升级到Node.js 14.0.0或更高版本
```bash
# 使用nvm升级 (推荐)
nvm install 18
nvm use 18

# 或从官网下载最新版本
# https://nodejs.org/
```

### ❌ 依赖安装失败
**错误**: `npm ERR! peer dep missing`

**解决**: 清除缓存并重新安装
```bash
# 清除npm缓存
npm cache clean --force

# 删除node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### ❌ 权限错误
**错误**: `EACCES: permission denied`

**解决**: 使用正确的权限或配置npm
```bash
# macOS/Linux
sudo npm install -g npm

# 或配置npm使用不同目录
npm config set prefix ~/.npm-global
```

## 🔗 下一步

恭喜！您已经成功安装并运行了智能项目编排系统。现在可以：

### 📚 深入学习
- [🎭 角色系统详解](Role-System) - 了解7种专业角色的详细功能
- [🧠 智能决策算法](Decision-Algorithm) - 理解AI决策机制
- [📋 工作流编排](Workflow-Orchestration) - 学习自定义工作流

### 🔧 高级配置
- [⚙️ 配置指南](Configuration) - 自定义系统配置
- [🎯 Cursor集成](Cursor-Integration) - 深度IDE集成
- [🚀 部署指南](Deployment) - 生产环境部署

### 💡 实践应用
- [📊 使用案例](Use-Cases) - 真实项目应用场景
- [✨ 最佳实践](Best-Practices) - 团队使用经验
- [⚡ 性能优化](Performance) - 系统性能调优

## 🤝 获取帮助

遇到问题？这些资源可以帮助您：

- **📚 文档**: 查看完整的[Wiki文档](Home)
- **❓ FAQ**: 查看[常见问题](FAQ)解答
- **🐛 Bug报告**: 在[GitHub Issues](https://github.com/huang-jianhua/intelligent-project-orchestrator/issues)提交问题
- **💬 讨论**: 加入[GitHub Discussions](https://github.com/huang-jianhua/intelligent-project-orchestrator/discussions)

---

**💡 小贴士**: 如果您是团队负责人，建议查看[团队使用指南](Team-Guide)了解如何在团队中部署和使用系统。

**最后更新**: 2024-12-XX  
**页面版本**: v1.0  
**维护者**: [@huang-jianhua](https://github.com/huang-jianhua) 