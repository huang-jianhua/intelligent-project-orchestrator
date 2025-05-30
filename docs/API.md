# 🔌 API 文档

## ProjectOrchestrator 类

### 构造函数

```javascript
const orchestrator = new ProjectOrchestrator();
```

创建一个新的项目编排器实例。

### 核心方法

#### `determineRole(userInput, context)`

智能角色决策方法。

**参数:**
- `userInput` (string): 用户输入文本
- `context` (object, 可选): 上下文信息
  - `phase` (string): 项目阶段
  - `problemType` (string): 问题类型
  - `urgency` (string): 紧急程度

**返回值:**
- `{role: string, confidence: number}`: 识别的角色和置信度

**示例:**
```javascript
const result = orchestrator.determineRole('我们需要分析用户增长数据');
console.log(result); // {role: 'operations_director', confidence: 0.8}
```

#### `switchRole(newRole, reason)`

手动切换角色。

**参数:**
- `newRole` (string): 目标角色名称
- `reason` (string, 可选): 切换原因

**返回值:**
- `object`: 角色信息对象

**示例:**
```javascript
orchestrator.switchRole('operations_director', '数据分析需求');
```

#### `executeTask(task, userInput)`

执行任务。

**参数:**
- `task` (string): 任务描述
- `userInput` (string): 用户输入

**返回值:**
- `array`: 任务输出列表

**示例:**
```javascript
const outputs = orchestrator.executeTask('用户增长分析', '分析用户行为数据');
```

#### `autoAdvanceProject(userInput)`

自动推进项目。

**参数:**
- `userInput` (string): 项目描述

**示例:**
```javascript
orchestrator.autoAdvanceProject('帮我创建一个电商网站');
```

#### `manualRoleSwitch(roleName, reason)`

手动角色切换（别名方法）。

**参数:**
- `roleName` (string): 角色名称
- `reason` (string, 可选): 切换原因

**返回值:**
- `boolean`: 切换是否成功

#### `showStatus()`

显示当前项目状态。

#### `generateProjectSummary()`

生成项目执行总结。

### 属性

#### `roles`

角色定义对象，包含所有可用角色的配置信息。

**结构:**
```javascript
{
  role_name: {
    name: string,        // 角色名称
    emoji: string,       // 角色图标
    priority: number,    // 优先级
    triggers: array,     // 触发关键词
    capabilities: array, // 专业能力
    mindset: string     // 思维模式
  }
}
```

#### `currentRole`

当前激活的角色名称。

#### `projectContext`

项目上下文信息，包含项目阶段、完成任务等。

**结构:**
```javascript
{
  phase: string,           // 项目阶段
  taskType: string,        // 任务类型
  problemType: string,     // 问题类型
  completedTasks: array,   // 已完成任务
  currentTask: string      // 当前任务
}
```

### 配置对象

#### `decisionRules`

决策规则配置。

**结构:**
```javascript
{
  keywords: object,        // 关键词映射
  phases: object,          // 阶段映射
  problems: object,        // 问题类型映射
  keywordWeight: number,   // 关键词权重
  phaseWeight: number,     // 阶段权重
  contextWeight: number,   // 上下文权重
  urgencyWeight: number    // 紧急程度权重
}
```

#### `workflows`

预定义工作流模板。

**结构:**
```javascript
{
  workflow_name: [
    {
      role: string,    // 角色名称
      task: string     // 任务描述
    }
  ]
}
```

## 使用示例

### 基本使用

```javascript
const ProjectOrchestrator = require('./src/orchestrator-demo.js');

// 创建实例
const orchestrator = new ProjectOrchestrator();

// 智能角色识别
const result = orchestrator.determineRole('需要优化网站性能');
console.log(`推荐角色: ${result.role}`);

// 角色切换
orchestrator.switchRole(result.role, '性能优化需求');

// 执行任务
orchestrator.executeTask('性能分析和优化', '网站加载速度优化');
```

### 高级用法

```javascript
// 带上下文的角色决策
const context = {
  phase: 'development',
  problemType: 'performance',
  urgency: 'high'
};

const result = orchestrator.determineRole('系统响应慢', context);

// 自动项目推进
orchestrator.autoAdvanceProject('创建博客系统');

// 查看项目状态
orchestrator.showStatus();
```

## 错误处理

所有方法都包含适当的错误处理机制：

```javascript
try {
  const result = orchestrator.determineRole('invalid input');
} catch (error) {
  console.error('角色决策失败:', error.message);
}
```

## 扩展开发

### 添加新角色

```javascript
// 在构造函数中添加新角色
this.roles.new_role = {
  name: '新角色',
  emoji: '🆕',
  priority: 6,
  triggers: ['关键词1', '关键词2'],
  capabilities: ['能力1', '能力2'],
  mindset: '思维模式描述'
};

// 添加决策规则
this.decisionRules.keywords['关键词1'] = 'new_role';

// 添加输出模板
this.generateRoleSpecificOutput.new_role = [
  '输出1',
  '输出2'
];
```

### 自定义工作流

```javascript
this.workflows.custom_workflow = [
  { role: 'project_manager', task: '自定义任务1' },
  { role: 'new_role', task: '自定义任务2' }
];
```