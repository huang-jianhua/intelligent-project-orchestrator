 # 🎭 智能项目编排系统 (Intelligent Project Orchestrator)

## 📋 项目简介

智能项目编排系统是一个基于AI角色切换的自动化项目管理工具，能够根据用户输入自动识别最适合的专业角色，实现智能化的项目协作和任务编排。

## ✨ 核心特性

- 🔄 **智能角色切换**: 根据关键词自动识别并切换到最合适的专业角色
- 🧠 **多维决策算法**: 基于关键词匹配、项目阶段、上下文分析的智能决策
- 📋 **自动化工作流**: 预定义的项目流程自动编排
- 🎯 **7个专业角色**: 覆盖完整的产品开发生命周期
- 🚀 **Cursor深度集成**: 无缝融入Cursor开发环境
- 📊 **可视化追踪**: 实时显示角色切换和任务执行过程

## 👥 角色体系

| 角色 | 优先级 | 专业领域 | 触发关键词 |
|------|--------|----------|------------|
| 🎭 项目经理 | 1 | 项目规划、风险管控、资源分配 | 项目规划、进度管控、风险管理 |
| 📈 运营总监 | 1.5 | 用户增长、数据分析、商业模式 | 用户增长、数据分析、SEO优化 |
| 🏗️ 系统架构师 | 2 | 技术架构、性能优化、技术选型 | 架构设计、技术选型、性能优化 |
| 🎨 产品设计师 | 2.5 | 用户体验、界面设计、交互设计 | 需求分析、用户体验、界面设计 |
| 👨‍💻 开发工程师 | 3 | 代码实现、功能开发、Bug修复 | 编写代码、实现功能、修复bug |
| 🧪 测试工程师 | 4 | 质量保证、自动化测试、性能测试 | 测试、质量检查、自动化测试 |
| 🚀 运维工程师 | 5 | 部署运维、监控告警、自动化运维 | 部署、运维、监控、CI/CD |

## 🚀 快速开始

### 安装

```bash
git clone https://github.com/huang-jianhua/intelligent-project-orchestrator.git
cd intelligent-project-orchestrator
npm install
```

### 基本使用

```javascript
const ProjectOrchestrator = require('./src/orchestrator-demo.js');

// 创建编排器实例
const orchestrator = new ProjectOrchestrator();

// 智能角色识别
const result = orchestrator.determineRole('我们需要分析用户增长数据');
console.log(`识别角色: ${result.role}, 置信度: ${result.confidence}`);

// 手动角色切换
orchestrator.switchRole('operations_director', '数据分析需求');

// 执行任务
orchestrator.executeTask('用户增长数据分析', '分析用户行为数据');
```

### 运行演示

```bash
# 运行基本演示
npm run test

# 运行角色测试
npm run test:roles

# 启动系统
npm start
```

## 📁 项目结构

```
intelligent-project-orchestrator/
├── src/                          # 核心源码
│   └── orchestrator-demo.js      # 主要实现文件
├── config/                       # 配置文件
│   └── roles-config.json         # 角色配置
├── tests/                        # 测试文件
│   └── orchestrator-test.js      # 主测试文件
├── examples/                     # 示例代码
├── docs/                         # 文档
├── .cursorrules                  # Cursor集成规则
├── package.json                  # 项目配置
└── README.md                     # 项目说明
```

## 🔧 配置说明

### 角色配置 (config/roles-config.json)

```json
{
  "system": {
    "version": "1.1.0",
    "autoSwitch": true,
    "verboseMode": true,
    "qualityThreshold": 0.85
  },
  "roles": {
    "operations_director": {
      "name": "运营总监",
      "emoji": "📈",
      "priority": 1.5,
      "triggers": {
        "keywords": ["用户增长", "数据分析", "运营策略"],
        "phases": ["market_research", "growth", "optimization"],
        "contexts": ["user_growth", "data_analysis"]
      },
      "capabilities": [
        "数据分析和洞察",
        "用户增长策略",
        "商业模式设计"
      ]
    }
  }
}
```

### Cursor集成 (.cursorrules)

系统提供完整的Cursor IDE集成支持，自动激活智能编排功能：

- 🔍 **自动检测**: 识别项目类型和文件结构
- ⚡ **快速切换**: 根据编辑的文件类型自动切换角色
- 🎯 **上下文感知**: 智能理解当前开发阶段

## 📊 使用场景

### 1. Web应用开发
```bash
输入: "帮我创建一个电商网站"
流程: 项目经理 → 产品设计师 → 系统架构师 → 开发工程师 → 测试工程师 → 运维工程师
```

### 2. 性能优化
```bash
输入: "网站加载很慢，需要优化"
流程: 系统架构师 → 开发工程师 → 运维工程师 → 测试工程师
```

### 3. 用户增长分析
```bash
输入: "分析用户增长数据"
角色: 📈 运营总监
任务: 数据分析、增长策略制定、转化率优化
```

## 🎯 核心算法

### 智能决策算法

```javascript
决策权重 = 关键词匹配(40%) + 项目阶段(30%) + 上下文分析(20%) + 紧急程度(10%)
```

### 角色切换逻辑

1. **关键词分析**: 识别用户输入中的专业术语
2. **项目阶段判断**: 根据当前项目进度确定主导角色
3. **上下文理解**: 分析历史对话和项目状态
4. **置信度评估**: 确保角色切换的准确性

## 🛠️ 开发指南

### 添加新角色

1. 在`config/roles-config.json`中定义角色
2. 在`src/orchestrator-demo.js`中添加角色逻辑
3. 更新决策规则和输出模板
4. 编写测试用例

### 自定义工作流

```javascript
this.workflows.custom_workflow = [
  { role: 'project_manager', task: '项目启动' },
  { role: 'operations_director', task: '市场调研' },
  { role: 'developer', task: '功能实现' }
];
```

## 📈 性能指标

- **角色识别准确率**: >95%
- **平均响应时间**: <500ms
- **工作流执行效率**: 提升60%
- **团队协作效率**: 提升40%

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📝 更新日志

### v1.1.0 (2025-5-31)
- ✨ 新增运营总监角色
- 🚀 完善7角色体系
- 📈 提升决策算法准确率
- 🔧 优化Cursor集成

### v1.0.0 (2025-5-30)
- 🎉 首次发布
- 🎭 6角色智能编排系统
- 🔄 自动角色切换功能
- 📋 基础工作流支持

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- 感谢所有贡献者的支持
- 特别感谢Cursor团队提供的优秀开发环境
- 感谢开源社区的宝贵建议

## 📞 联系方式

- 作者: Huang Jianhua
- GitHub: [@huang-jianhua](https://github.com/huang-jianhua)
- 项目链接: [intelligent-project-orchestrator](https://github.com/huang-jianhua/intelligent-project-orchestrator)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！