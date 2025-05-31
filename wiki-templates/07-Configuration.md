# ⚙️ 配置指南

智能项目编排系统提供灵活的配置选项，支持角色自定义、算法调优、工作流配置等多种定制化需求。

## 🎯 学习目标

- ⚙️ 掌握系统各项配置参数
- 🎭 学会自定义角色配置
- 🔧 理解算法参数调优
- 📋 了解工作流配置方法

## 📁 配置文件结构

```
intelligent-project-orchestrator/
├── config/
│   ├── orchestrator-config.yaml     # 主配置文件
│   ├── roles-config.json           # 角色配置
│   ├── algorithm-config.json       # 算法参数配置
│   ├── workflow-config.yaml        # 工作流配置
│   └── environment/
│       ├── development.yaml        # 开发环境配置
│       ├── staging.yaml            # 测试环境配置
│       └── production.yaml         # 生产环境配置
└── .cursorrules                    # Cursor集成配置
```

## 🎭 角色配置

### 角色配置文件 (roles-config.json)

```json
{
  "roles": {
    "project_manager": {
      "name": "项目经理",
      "description": "负责项目整体规划和管理",
      "enabled": true,
      "priority": 1,
      "capabilities": [
        "项目规划",
        "进度管控", 
        "风险管理",
        "资源分配",
        "团队协调"
      ],
      "keywords": {
        "primary": [
          "项目规划", "进度管控", "风险管理", "资源分配",
          "整体规划", "项目状态", "里程碑", "团队协作"
        ],
        "secondary": [
          "需求分析", "项目管理", "计划制定", "风险评估"
        ],
        "weights": {
          "primary": 2.0,
          "secondary": 1.0
        }
      },
      "response_style": {
        "tone": "professional",
        "detail_level": "comprehensive",
        "include_examples": true,
        "provide_timeline": true
      },
      "constraints": {
        "max_response_length": 2000,
        "response_time_limit": 30,
        "requires_approval": false
      }
    },
    "operations_director": {
      "name": "运营总监",
      "description": "专注用户增长和数据分析",
      "enabled": true,
      "priority": 2,
      "capabilities": [
        "数据分析",
        "用户增长",
        "运营策略",
        "市场推广",
        "转化率优化"
      ],
      "keywords": {
        "primary": [
          "用户增长", "数据分析", "运营策略", "市场推广",
          "用户留存", "SEO优化", "转化率优化", "用户画像"
        ],
        "secondary": [
          "增长黑客", "营销策略", "用户研究", "竞品分析"
        ],
        "weights": {
          "primary": 2.0,
          "secondary": 1.0
        }
      },
      "response_style": {
        "tone": "data_driven",
        "detail_level": "analytical",
        "include_metrics": true,
        "provide_insights": true
      }
    },
    "system_architect": {
      "name": "系统架构师", 
      "description": "负责技术架构设计和优化",
      "enabled": true,
      "priority": 3,
      "capabilities": [
        "架构设计",
        "技术选型", 
        "性能优化",
        "系统设计",
        "安全设计"
      ],
      "keywords": {
        "primary": [
          "架构设计", "技术选型", "性能优化", "系统设计",
          "数据库设计", "API设计", "微服务", "分布式"
        ],
        "secondary": [
          "高并发", "缓存", "负载均衡", "系统安全"
        ]
      }
    }
  },
  "global_settings": {
    "default_role": "developer",
    "fallback_role": "project_manager",
    "role_switch_delay": 500,
    "context_memory_length": 10,
    "enable_role_learning": true
  }
}
```

### 添加自定义角色

```json
{
  "custom_roles": {
    "ai_specialist": {
      "name": "AI专家",
      "description": "专注AI和机器学习相关技术",
      "parent_role": "system_architect",
      "enabled": true,
      "priority": 8,
      "capabilities": [
        "机器学习模型设计",
        "AI算法优化",
        "数据科学分析",
        "深度学习架构"
      ],
      "keywords": {
        "primary": [
          "机器学习", "深度学习", "神经网络", "AI算法",
          "数据挖掘", "自然语言处理", "计算机视觉"
        ],
        "secondary": [
          "TensorFlow", "PyTorch", "模型训练", "特征工程"
        ]
      },
      "inheritance": {
        "inherit_from": "system_architect",
        "override_capabilities": true,
        "merge_keywords": true
      }
    }
  }
}
```

## 🧠 算法配置

### 决策算法配置 (algorithm-config.json)

```json
{
  "decision_algorithm": {
    "version": "v1.2.0",
    "weights": {
      "keyword_match": 0.4,
      "context_analysis": 0.3,
      "project_stage": 0.2,
      "history_pattern": 0.1
    },
    "thresholds": {
      "confidence_threshold": 0.6,
      "fallback_threshold": 0.3,
      "learning_threshold": 0.8
    },
    "keyword_matching": {
      "exact_match_weight": 1.0,
      "fuzzy_match_weight": 0.7,
      "synonym_weight": 0.8,
      "stemming_enabled": true,
      "case_sensitive": false
    },
    "context_analysis": {
      "history_decay_factor": 0.8,
      "semantic_similarity_threshold": 0.6,
      "max_context_length": 5,
      "enable_deep_analysis": true
    },
    "performance": {
      "cache_enabled": true,
      "cache_ttl": 300,
      "max_cache_size": 1000,
      "parallel_processing": true,
      "timeout_ms": 5000
    }
  },
  "learning_system": {
    "enabled": true,
    "feedback_weight": 0.1,
    "adaptation_rate": 0.05,
    "min_samples_for_learning": 100,
    "model_update_frequency": "daily",
    "backup_model_count": 3
  }
}
```

### 动态权重调整

```yaml
# algorithm-tuning.yaml
dynamic_adjustment:
  enabled: true
  adjustment_frequency: "hourly"
  
  rules:
    # 准确率低时的调整策略
    - condition: "accuracy < 0.85"
      adjustments:
        keyword_match: +0.05
        context_analysis: -0.03
        history_pattern: -0.02
      
    # 响应时间过长时的调整策略  
    - condition: "avg_response_time > 1000ms"
      adjustments:
        cache_enabled: true
        parallel_processing: true
        timeout_ms: 3000
    
    # 用户满意度低时的调整策略
    - condition: "user_satisfaction < 0.8"
      adjustments:
        confidence_threshold: +0.1
        context_analysis: +0.05

  monitoring:
    metrics:
      - accuracy_rate
      - response_time
      - user_satisfaction
      - cache_hit_rate
    alert_thresholds:
      accuracy_drop: 0.05
      response_time_increase: 500
```

## 📋 工作流配置

### 工作流引擎配置 (workflow-config.yaml)

```yaml
workflow_engine:
  version: "1.1.0"
  
  execution:
    max_concurrent_workflows: 10
    max_steps_per_workflow: 50
    step_timeout: 3600  # 秒
    workflow_timeout: 86400  # 24小时
    retry_attempts: 3
    retry_delay: 5  # 秒
    
  storage:
    persist_intermediate_results: true
    cleanup_completed_workflows: true
    cleanup_retention_days: 30
    max_storage_per_workflow: "100MB"
    
  notifications:
    enabled: true
    channels:
      - webhook
      - email
    events:
      - workflow_started
      - workflow_completed
      - workflow_failed
      - step_failed
      
  monitoring:
    metrics_enabled: true
    detailed_logging: true
    performance_tracking: true
    
predefined_workflows:
  web_application:
    enabled: true
    auto_trigger: true
    trigger_keywords:
      - "Web应用"
      - "网站开发"
      - "前端项目"
    default_variables:
      tech_stack: "React + Node.js"
      deployment_target: "cloud"
      
  performance_optimization:
    enabled: true
    auto_trigger: false
    priority: "high"
    
  data_analysis:
    enabled: true
    auto_trigger: true
    requires_approval: false

custom_workflows:
  validation:
    require_unique_names: true
    max_custom_workflows: 100
    validate_dependencies: true
    
  permissions:
    create: ["admin", "lead_developer"]
    modify: ["admin", "workflow_owner"]
    execute: ["admin", "developer", "analyst"]
    delete: ["admin", "workflow_owner"]
```

## 🌐 环境配置

### 开发环境 (development.yaml)

```yaml
environment: development

logging:
  level: debug
  console_output: true
  file_output: true
  log_file: "logs/orchestrator-dev.log"
  
api:
  host: "localhost"
  port: 3000
  cors_enabled: true
  rate_limiting: false
  
database:
  type: "sqlite"
  connection: "dev-database.db"
  pool_size: 5
  
cache:
  type: "memory"
  max_size: "100MB"
  ttl: 300
  
security:
  auth_required: false
  api_key_required: false
  https_only: false

debugging:
  enable_debug_mode: true
  show_decision_process: true
  log_performance_metrics: true
  save_debug_info: true
```

### 生产环境 (production.yaml)

```yaml
environment: production

logging:
  level: info
  console_output: false
  file_output: true
  log_file: "/var/log/orchestrator/orchestrator.log"
  rotate_logs: true
  max_log_size: "100MB"
  
api:
  host: "0.0.0.0"
  port: 8080
  cors_enabled: false
  rate_limiting: true
  rate_limit: 1000  # requests per hour
  
database:
  type: "postgresql"
  host: "${DB_HOST}"
  port: 5432
  database: "${DB_NAME}"
  username: "${DB_USER}"
  password: "${DB_PASSWORD}"
  pool_size: 20
  ssl_mode: "require"
  
cache:
  type: "redis"
  host: "${REDIS_HOST}"
  port: 6379
  password: "${REDIS_PASSWORD}"
  db: 0
  
security:
  auth_required: true
  api_key_required: true
  https_only: true
  session_timeout: 3600
  
monitoring:
  metrics_endpoint: "/metrics"
  health_check_endpoint: "/health"
  enable_profiling: false
```

## 🎯 Cursor 集成配置

### .cursorrules 配置

```
# 🎭 智能项目编排系统 - Cursor自动激活规则

## 系统配置
AUTO_ORCHESTRATION_ENABLED=true
VERBOSE_MODE=true
QUALITY_THRESHOLD=0.85

## 角色自动切换规则
TRIGGER_PROJECT_MANAGER: "项目规划,进度管控,风险管理,资源分配,整体规划"
TRIGGER_OPERATIONS_DIRECTOR: "用户增长,数据分析,运营策略,市场推广,转化率优化"
TRIGGER_SYSTEM_ARCHITECT: "架构设计,技术选型,性能优化,系统设计"
TRIGGER_DEVELOPER: "编写代码,实现功能,修复bug,代码重构,程序开发"
TRIGGER_PRODUCT_DESIGNER: "需求分析,用户体验,界面设计,原型设计"
TRIGGER_QA_ENGINEER: "测试,质量检查,自动化测试,性能测试,验证"
TRIGGER_DEVOPS_ENGINEER: "部署,运维,监控,CI/CD,自动化运维,容器化"

## 自动化工作流
ON_PROJECT_INIT: |
  1. 切换到项目经理模式
  2. 分析项目结构和需求
  3. 制定开发计划
  4. 推荐技术栈

ON_ERROR_DETECTED: |
  1. 切换到对应专家角色
  2. 问题诊断分析
  3. 解决方案建议
  4. 预防措施

## 性能配置
ROLE_SWITCH_DELAY=0.5s
CONTEXT_ANALYSIS_TIMEOUT=10s
AUTO_SAVE_INTERVAL=30s
```

## 🔧 高级配置

### 性能调优

```yaml
performance_tuning:
  # 内存管理
  memory:
    max_heap_size: "2GB"
    gc_strategy: "G1GC"
    memory_monitoring: true
    
  # 并发控制
  concurrency:
    max_threads: 20
    thread_pool_size: 10
    async_processing: true
    
  # 缓存优化
  caching:
    levels:
      - name: "L1_Memory"
        size: "100MB"
        ttl: 60
      - name: "L2_Redis" 
        size: "1GB"
        ttl: 3600
    strategies:
      - "LRU"
      - "LFU"
      
  # 网络优化
  network:
    connection_pool_size: 50
    timeout: 30000
    keep_alive: true
    compression: true

monitoring:
  metrics:
    system:
      - cpu_usage
      - memory_usage
      - disk_usage
      - network_io
    application:
      - request_count
      - response_time
      - error_rate
      - cache_hit_rate
      
  alerts:
    cpu_threshold: 80
    memory_threshold: 85
    error_rate_threshold: 5
    response_time_threshold: 2000
```

### 安全配置

```yaml
security:
  authentication:
    methods:
      - api_key
      - jwt_token
      - oauth2
    session_management:
      timeout: 3600
      refresh_token: true
      
  authorization:
    rbac_enabled: true
    roles:
      admin:
        permissions: ["*"]
      developer:
        permissions: ["read", "execute_workflow", "create_workflow"]
      analyst:
        permissions: ["read", "execute_analysis"]
        
  encryption:
    at_rest: true
    in_transit: true
    algorithm: "AES-256"
    key_rotation: "monthly"
    
  audit:
    enabled: true
    log_requests: true
    log_responses: false
    retention_days: 90
```

## 📊 配置验证

### 配置验证脚本

```bash
#!/bin/bash
# validate-config.sh

echo "🔍 验证智能项目编排系统配置..."

# 检查必需的配置文件
CONFIG_FILES=(
    "config/orchestrator-config.yaml"
    "config/roles-config.json" 
    "config/algorithm-config.json"
    ".cursorrules"
)

for file in "${CONFIG_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file 存在"
    else
        echo "❌ $file 缺失"
        exit 1
    fi
done

# 验证配置语法
echo "🔧 验证配置文件语法..."
python3 scripts/validate-yaml.py config/orchestrator-config.yaml
python3 scripts/validate-json.py config/roles-config.json

# 测试配置加载
echo "📋 测试配置加载..."
node scripts/test-config-load.js

echo "✅ 配置验证完成！"
```

### 配置测试工具

```javascript
// scripts/test-config-load.js
const fs = require('fs');
const yaml = require('js-yaml');

try {
    // 测试主配置文件
    const mainConfig = yaml.load(
        fs.readFileSync('config/orchestrator-config.yaml', 'utf8')
    );
    console.log('✅ 主配置文件加载成功');
    
    // 测试角色配置
    const rolesConfig = JSON.parse(
        fs.readFileSync('config/roles-config.json', 'utf8')
    );
    console.log('✅ 角色配置文件加载成功');
    
    // 验证角色完整性
    const requiredRoles = [
        'project_manager', 'operations_director', 'system_architect',
        'developer', 'product_designer', 'qa_engineer', 'devops_engineer'
    ];
    
    const missingRoles = requiredRoles.filter(
        role => !rolesConfig.roles[role]
    );
    
    if (missingRoles.length === 0) {
        console.log('✅ 所有必需角色配置完整');
    } else {
        console.log('❌ 缺失角色配置:', missingRoles);
    }
    
} catch (error) {
    console.error('❌ 配置加载失败:', error.message);
    process.exit(1);
}
```

## 🔄 配置热更新

### 热更新机制

```javascript
class ConfigHotReload {
    constructor() {
        this.watchers = new Map();
        this.reloadCallbacks = new Map();
    }
    
    watchConfig(configPath, callback) {
        const watcher = fs.watch(configPath, (eventType) => {
            if (eventType === 'change') {
                console.log(`🔄 配置文件变更: ${configPath}`);
                this.reloadConfig(configPath, callback);
            }
        });
        
        this.watchers.set(configPath, watcher);
        this.reloadCallbacks.set(configPath, callback);
    }
    
    reloadConfig(configPath, callback) {
        try {
            let newConfig;
            
            if (configPath.endsWith('.yaml') || configPath.endsWith('.yml')) {
                newConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
            } else if (configPath.endsWith('.json')) {
                newConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            }
            
            callback(newConfig);
            console.log(`✅ 配置重载成功: ${configPath}`);
            
        } catch (error) {
            console.error(`❌ 配置重载失败: ${configPath}`, error);
        }
    }
    
    stopWatching() {
        this.watchers.forEach(watcher => watcher.close());
        this.watchers.clear();
        this.reloadCallbacks.clear();
    }
}

// 使用示例
const hotReload = new ConfigHotReload();

hotReload.watchConfig('config/roles-config.json', (newConfig) => {
    orchestrator.updateRolesConfig(newConfig);
});

hotReload.watchConfig('config/algorithm-config.json', (newConfig) => {
    orchestrator.updateAlgorithmConfig(newConfig);
});
```

## 🔗 相关链接

- [🎭 角色系统详解](Role-System) - 角色配置详解
- [🧠 智能决策算法](Decision-Algorithm) - 算法参数说明
- [📋 工作流编排](Workflow-Orchestration) - 工作流配置
- [📚 API参考文档](API-Reference) - API配置参数

---

**最后更新**: 2024-12-XX  
**页面版本**: v1.0  
**维护者**: [@huang-jianhua](https://github.com/huang-jianhua) 