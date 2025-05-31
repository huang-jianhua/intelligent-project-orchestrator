# ❓ 常见问题 FAQ

解答智能项目编排系统使用过程中最常遇到的问题，帮助您快速找到解决方案。

## 🎯 学习目标

- ❓ 快速找到常见问题的答案
- 💡 了解系统的最佳使用方式
- 🔧 掌握问题排查和解决方法
- 📚 获取进一步学习的资源指引

## 🔍 快速搜索

使用 `Ctrl+F` (Windows/Linux) 或 `Cmd+F` (Mac) 搜索关键词：
- **安装配置**: 安装、配置、环境、依赖
- **角色系统**: 角色、切换、识别、准确性
- **工作流**: 工作流、执行、失败、超时
- **性能问题**: 性能、慢、内存、CPU
- **集成问题**: Cursor、API、MCP、GitHub

## 📋 常见问题分类

### 🚀 安装和配置问题

#### Q1: 系统安装失败，提示依赖缺失怎么办？

**A:** 按以下步骤检查和解决：

```bash
# 1. 检查Node.js版本（要求 >= 16.0.0）
node --version

# 2. 检查npm版本
npm --version

# 3. 清理npm缓存
npm cache clean --force

# 4. 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 5. 如果仍有问题，尝试使用yarn
npm install -g yarn
yarn install
```

如果仍然失败，请检查：
- 网络连接是否正常
- npm镜像源设置（建议使用淘宝镜像）
- 系统权限是否足够

#### Q2: 配置文件验证失败，如何修复语法错误？

**A:** 使用以下工具检查配置文件：

```bash
# 检查YAML文件语法
python3 -c "
import yaml
try:
    with open('config/orchestrator-config.yaml', 'r') as f:
        yaml.safe_load(f)
    print('✅ YAML配置正确')
except yaml.YAMLError as e:
    print(f'❌ YAML语法错误: {e}')
    print('请检查缩进、冒号、引号等语法')
"

# 检查JSON文件语法
python3 -c "
import json
try:
    with open('config/roles-config.json', 'r') as f:
        json.load(f)
    print('✅ JSON配置正确')
except json.JSONDecodeError as e:
    print(f'❌ JSON语法错误: {e}')
    print('请检查括号、逗号、引号等语法')
"
```

**常见语法错误：**
- YAML文件缩进不一致（必须使用空格，不能使用Tab）
- JSON文件末尾多了逗号
- 字符串中包含特殊字符未转义
- 配置项名称拼写错误

#### Q3: 环境变量配置不生效？

**A:** 检查环境变量设置：

```bash
# 1. 查看当前环境变量
printenv | grep ORCHESTRATOR

# 2. 检查.env文件是否存在且格式正确
cat .env

# 3. 确保.env文件格式正确（示例）
cat > .env << EOF
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=orchestrator_db
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_HOST=localhost
REDIS_PORT=6379
EOF

# 4. 重启应用使环境变量生效
npm restart
```

### 🎭 角色系统问题

#### Q4: 角色识别不准确，总是切换到错误的角色？

**A:** 这是最常见的问题之一，可以从以下几个方面优化：

**1. 优化输入描述**
```
❌ 不好的输入: "这个有问题"
✅ 好的输入: "网站响应速度太慢，需要进行性能优化"

❌ 不好的输入: "帮我看看"  
✅ 好的输入: "请帮我分析用户转化率下降的原因，提供数据分析报告"
```

**2. 提供更多上下文**
```javascript
// 在API调用中包含更多上下文信息
const decision = await orchestrator.analyzeInput({
    input: "优化系统性能",
    context: {
        projectType: "web_application",
        currentStage: "optimization",
        teamRole: "backend_developer",
        urgency: "high"
    }
});
```

**3. 自定义关键词权重**
```json
{
  "algorithm_tuning": {
    "weights": {
      "keyword_match": 0.5,        // 增加关键词匹配权重
      "context_analysis": 0.3,
      "project_stage": 0.15,
      "history_pattern": 0.05
    }
  }
}
```

#### Q5: 如何添加自定义角色？

**A:** 按以下步骤添加自定义角色：

```json
// 在 config/roles-config.json 中添加
{
  "roles": {
    "existing_roles": "...",
    "data_scientist": {
      "name": "数据科学家",
      "description": "专注数据分析和机器学习",
      "enabled": true,
      "priority": 8,
      "capabilities": [
        "数据挖掘",
        "机器学习建模",
        "统计分析",
        "数据可视化"
      ],
      "keywords": {
        "primary": [
          "数据分析", "机器学习", "统计", "模型",
          "数据挖掘", "预测", "算法", "特征工程"
        ],
        "secondary": [
          "Python", "R", "SQL", "TensorFlow",
          "数据清洗", "可视化", "报表"
        ],
        "weights": {
          "primary": 2.0,
          "secondary": 1.0
        }
      },
      "response_style": {
        "tone": "analytical",
        "detail_level": "technical",
        "include_examples": true,
        "provide_metrics": true
      }
    }
  }
}
```

#### Q6: 角色切换太频繁，如何保持稳定性？

**A:** 调整角色切换策略：

```json
{
  "role_stability": {
    "switch_threshold": 0.8,          // 提高切换阈值
    "context_memory_length": 5,       // 增加上下文记忆长度
    "role_switch_delay": 2000,        // 增加切换延迟
    "prefer_current_role": true,      // 偏向当前角色
    "current_role_boost": 0.2         // 当前角色加权
  }
}
```

### 📋 工作流问题

#### Q7: 工作流执行卡住不动，如何解决？

**A:** 按以下步骤诊断和解决：

**1. 检查工作流状态**
```bash
# 查看工作流执行状态
curl -X GET "http://localhost:3000/api/workflows/executions/{execution_id}" \
  -H "Authorization: Bearer your_token"
```

**2. 检查依赖关系**
```javascript
// 使用调试工具分析工作流
const debugger = new WorkflowDebugger();
const analysis = await debugger.diagnoseWorkflow(workflowId);
console.log('依赖问题:', analysis.dependencies);
console.log('执行时间:', analysis.timing);
```

**3. 常见解决方案**
```yaml
# 调整超时配置
workflow_engine:
  execution:
    step_timeout: 7200      # 增加步骤超时时间
    retry_attempts: 5       # 增加重试次数
    retry_delay: 10         # 增加重试延迟
```

#### Q8: 工作流执行失败，如何重试？

**A:** 有多种重试方式：

**1. 自动重试配置**
```yaml
workflow_engine:
  auto_retry:
    enabled: true
    max_attempts: 3
    backoff_strategy: "exponential"
    initial_delay: 1000
    max_delay: 10000
```

**2. 手动重试**
```bash
# 重试失败的工作流
curl -X POST "http://localhost:3000/api/workflows/executions/{execution_id}/retry" \
  -H "Authorization: Bearer your_token" \
  -H "Content-Type: application/json" \
  -d '{"retry_failed_steps": true}'
```

**3. 部分重试**
```javascript
// 只重试特定步骤
const retrySteps = ['step_3', 'step_5'];
await orchestrator.retryWorkflowSteps(executionId, retrySteps);
```

#### Q9: 如何创建自定义工作流？

**A:** 创建自定义工作流的步骤：

```javascript
// 1. 定义工作流结构
const customWorkflow = {
    name: "我的自定义工作流",
    description: "适合我的项目的专用流程",
    type: "custom",
    steps: [
        {
            name: "需求分析",
            role: "project_manager",
            tasks: [
                "收集用户需求",
                "分析业务逻辑",
                "制定功能清单"
            ],
            estimated_duration: "2天",
            dependencies: []
        },
        {
            name: "技术设计", 
            role: "system_architect",
            tasks: [
                "系统架构设计",
                "技术方案选型",
                "接口设计"
            ],
            estimated_duration: "3天",
            dependencies: ["需求分析"]
        }
    ],
    variables: {
        project_type: "web_application",
        team_size: 5,
        deadline: "4周"
    },
    triggers: {
        keywords: ["我的项目", "自定义流程"],
        auto_trigger: true
    }
};

// 2. 保存工作流
const response = await fetch('/api/workflows', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(customWorkflow)
});
```

### 📊 性能问题

#### Q10: 系统响应很慢，如何优化性能？

**A:** 按优先级进行性能优化：

**1. 即时优化措施**
```bash
# 检查系统资源使用
top -p $(pgrep -f orchestrator)
free -h
df -h

# 重启服务清理内存
npm restart

# 清理缓存
redis-cli FLUSHDB
```

**2. 配置优化**
```json
{
  "performance": {
    "cache_enabled": true,
    "cache_ttl": 300,
    "max_cache_size": 1000,
    "parallel_processing": true,
    "worker_threads": 4
  }
}
```

**3. 代码优化**
```javascript
// 启用缓存
const cache = new Map();
function getCachedResult(key, computeFn) {
    if (cache.has(key)) {
        return cache.get(key);
    }
    const result = computeFn();
    cache.set(key, result);
    return result;
}

// 批量处理
function batchProcess(items, batchSize = 10) {
    const batches = [];
    for (let i = 0; i < items.length; i += batchSize) {
        batches.push(items.slice(i, i + batchSize));
    }
    return Promise.all(batches.map(processBatch));
}
```

#### Q11: 内存使用过高怎么办？

**A:** 内存优化策略：

**1. 监控内存使用**
```javascript
// 添加内存监控
setInterval(() => {
    const usage = process.memoryUsage();
    console.log('内存使用:', {
        rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
        heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
        heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`
    });
    
    // 内存使用超过阈值时告警
    if (usage.heapUsed > 500 * 1024 * 1024) { // 500MB
        console.warn('⚠️ 内存使用过高，建议重启');
    }
}, 30000);
```

**2. 内存优化配置**
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=2048"

# 启用垃圾回收优化
export NODE_OPTIONS="--gc-interval=100 --gc-global"
```

**3. 代码内存优化**
```javascript
// 限制缓存大小
class LRUCache {
    constructor(maxSize = 1000) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }
    
    set(key, value) {
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

// 定期清理无用对象
setInterval(() => {
    // 清理过期缓存
    cleanExpiredCache();
    
    // 手动触发垃圾回收（开发环境）
    if (process.env.NODE_ENV === 'development' && global.gc) {
        global.gc();
    }
}, 60000);
```

### 🔌 集成问题

#### Q12: Cursor集成不生效，如何配置？

**A:** 检查Cursor集成配置：

**1. 验证.cursorrules文件**
```bash
# 检查文件是否存在
ls -la .cursorrules

# 查看文件内容
cat .cursorrules
```

**2. 确认配置格式**
```
# .cursorrules 示例配置
AUTO_ORCHESTRATION_ENABLED=true
VERBOSE_MODE=true
QUALITY_THRESHOLD=0.85

# 角色触发关键词
TRIGGER_PROJECT_MANAGER: "项目规划,进度管控,风险管理"
TRIGGER_DEVELOPER: "编写代码,实现功能,修复bug"
```

**3. 重启Cursor编辑器**
- 关闭Cursor
- 重新打开项目
- 测试角色切换功能

#### Q13: API调用返回401认证错误？

**A:** 解决认证问题：

**1. 检查API密钥**
```bash
# 检查环境变量
echo $ORCHESTRATOR_API_KEY

# 如果没有，请设置
export ORCHESTRATOR_API_KEY="your_api_key_here"
```

**2. 验证令牌格式**
```javascript
// 正确的API调用方式
const response = await fetch('/api/roles', {
    headers: {
        'Authorization': 'Bearer your_access_token',
        'Content-Type': 'application/json'
    }
});

// 检查响应状态
if (!response.ok) {
    console.error('API调用失败:', response.status, response.statusText);
}
```

**3. 获取新的访问令牌**
```bash
# 重新获取令牌
curl -X POST "http://localhost:3000/auth/token" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
  }'
```

#### Q14: GitHub集成失败，无法推送代码？

**A:** 检查GitHub集成配置：

**1. 验证Git配置**
```bash
# 检查远程仓库配置
git remote -v

# 检查认证状态
git config user.name
git config user.email

# 测试连接
ssh -T git@github.com
```

**2. 重新配置远程仓库**
```bash
# 更新远程仓库URL
git remote set-url origin https://github.com/username/repository.git

# 或使用SSH
git remote set-url origin git@github.com:username/repository.git
```

**3. 解决权限问题**
```bash
# 生成新的SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 添加到GitHub账户
cat ~/.ssh/id_ed25519.pub
# 复制输出的内容到GitHub SSH Keys设置
```

### 💾 数据和备份问题

#### Q15: 如何备份系统数据？

**A:** 完整的备份策略：

**1. 配置文件备份**
```bash
#!/bin/bash
# backup-config.sh

BACKUP_DIR="backup/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# 备份配置文件
cp -r config/ "$BACKUP_DIR/"
cp .cursorrules "$BACKUP_DIR/"
cp .env "$BACKUP_DIR/"

# 备份日志
cp -r logs/ "$BACKUP_DIR/"

echo "配置备份完成: $BACKUP_DIR"
```

**2. 数据库备份**
```bash
# PostgreSQL备份
pg_dump -h localhost -p 5432 -U postgres orchestrator_db > backup/db_backup_$(date +%Y%m%d).sql

# Redis备份
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb backup/redis_backup_$(date +%Y%m%d).rdb
```

**3. 自动化备份**
```bash
# 添加到crontab
crontab -e

# 每日凌晨2点自动备份
0 2 * * * /path/to/backup-script.sh
```

#### Q16: 如何恢复系统数据？

**A:** 数据恢复步骤：

**1. 恢复配置文件**
```bash
# 停止服务
npm stop

# 恢复配置
cp backup/2024XXXX_XXXXXX/config/* config/
cp backup/2024XXXX_XXXXXX/.cursorrules .
cp backup/2024XXXX_XXXXXX/.env .

# 验证配置
npm run validate-config
```

**2. 恢复数据库**
```bash
# PostgreSQL恢复
psql -h localhost -p 5432 -U postgres -d orchestrator_db < backup/db_backup_20241201.sql

# Redis恢复
redis-cli SHUTDOWN
cp backup/redis_backup_20241201.rdb /var/lib/redis/dump.rdb
redis-server
```

**3. 重启服务**
```bash
# 启动服务
npm start

# 验证恢复
curl -f http://localhost:3000/health
```

### 🔧 开发和扩展问题

#### Q17: 如何开发自定义插件？

**A:** 插件开发指南：

**1. 创建插件结构**
```javascript
// plugins/my-plugin/index.js
class MyPlugin {
    constructor(options = {}) {
        this.name = 'my-plugin';
        this.version = '1.0.0';
        this.options = options;
    }
    
    // 插件初始化
    async initialize(orchestrator) {
        this.orchestrator = orchestrator;
        console.log(`插件 ${this.name} 初始化完成`);
    }
    
    // 角色决策钩子
    async onRoleDecision(input, context, candidates) {
        // 自定义角色决策逻辑
        return candidates;
    }
    
    // 工作流执行钩子
    async onWorkflowExecution(workflow, step) {
        // 自定义工作流逻辑
        console.log(`执行步骤: ${step.name}`);
    }
    
    // 插件清理
    async cleanup() {
        console.log(`插件 ${this.name} 清理完成`);
    }
}

module.exports = MyPlugin;
```

**2. 注册插件**
```javascript
// 在主应用中注册插件
const MyPlugin = require('./plugins/my-plugin');

const orchestrator = new IntelligentOrchestrator({
    plugins: [
        new MyPlugin({
            option1: 'value1',
            option2: 'value2'
        })
    ]
});
```

#### Q18: 如何贡献代码到项目？

**A:** 贡献流程：

**1. Fork项目**
```bash
# 克隆Fork的仓库
git clone https://github.com/your-username/intelligent-project-orchestrator.git
cd intelligent-project-orchestrator

# 添加上游仓库
git remote add upstream https://github.com/huang-jianhua/intelligent-project-orchestrator.git
```

**2. 创建功能分支**
```bash
# 同步最新代码
git fetch upstream
git checkout main
git merge upstream/main

# 创建功能分支
git checkout -b feature/my-new-feature
```

**3. 提交代码**
```bash
# 添加和提交更改
git add .
git commit -m "feat: 添加新功能描述"

# 推送到Fork仓库
git push origin feature/my-new-feature
```

**4. 创建Pull Request**
- 访问GitHub仓库页面
- 点击"New Pull Request"
- 填写详细的PR描述
- 等待代码审查

## 🆘 获取更多帮助

### 社区支持
- **💬 讨论社区**: [GitHub Discussions](https://github.com/huang-jianhua/intelligent-project-orchestrator/discussions)
- **🐛 问题反馈**: [GitHub Issues](https://github.com/huang-jianhua/intelligent-project-orchestrator/issues)
- **📖 文档**: [官方Wiki](https://github.com/huang-jianhua/intelligent-project-orchestrator/wiki)

### 技术支持
- **📧 邮件**: support@intelligent-orchestrator.com
- **💭 在线聊天**: 官网在线客服（工作日 9:00-18:00）
- **📞 电话**: +86-XXX-XXXX-XXXX（紧急支持）

### 学习资源
- **📺 视频教程**: [YouTube频道](https://youtube.com/c/intelligent-orchestrator)
- **📚 博客文章**: [官方博客](https://blog.intelligent-orchestrator.com)
- **🎓 在线课程**: [在线学习平台](https://learn.intelligent-orchestrator.com)

## 📝 提问模板

如果您的问题不在FAQ中，请使用以下模板提问：

```markdown
## 问题描述
简要描述您遇到的问题

## 环境信息
- 操作系统: 
- Node.js版本: 
- 系统版本: 
- 浏览器版本: 

## 重现步骤
1. 
2. 
3. 

## 期望行为
描述您期望的正常行为

## 实际行为
描述实际发生的情况

## 错误日志
```
粘贴相关的错误日志
```

## 已尝试的解决方案
列出您已经尝试过的解决方法
```

## 🔗 相关链接

- [🚀 快速开始](Quick-Start) - 系统入门指南
- [🛠️ 故障排除](Troubleshooting) - 深度问题诊断
- [⚙️ 配置指南](Configuration) - 系统配置详解
- [📚 API文档](API-Reference) - 完整API参考

---

**最后更新**: 2024-12-XX  
**页面版本**: v1.0  
**维护者**: [@huang-jianhua](https://github.com/huang-jianhua)  
**问题反馈**: [提交问题](https://github.com/huang-jianhua/intelligent-project-orchestrator/issues/new) 