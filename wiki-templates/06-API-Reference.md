# 📚 API 参考文档

智能项目编排系统提供完整的API接口，支持所有核心功能的编程访问和集成。

## 🎯 学习目标

- 📚 掌握所有API接口的使用方法
- 🔧 了解请求响应格式和参数
- ⚡ 学会错误处理和最佳实践
- 🔐 理解认证和权限机制

## 🌐 API 概览

### 基础信息
- **Base URL**: `https://api.intelligent-orchestrator.com/v1`
- **认证方式**: Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 版本信息
- **当前版本**: v1.2.0
- **支持版本**: v1.0+
- **弃用通知**: 提前3个月

## 🔐 认证机制

### 获取访问令牌

```http
POST /auth/token
Content-Type: application/json

{
    "client_id": "your_client_id",
    "client_secret": "your_client_secret",
    "grant_type": "client_credentials"
}
```

**响应示例**:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "orchestrator:read orchestrator:write"
}
```

### 使用令牌

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🎭 角色管理 API

### 获取所有角色

```http
GET /roles
Authorization: Bearer {token}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "roles": [
            {
                "id": "project_manager",
                "name": "项目经理",
                "description": "负责项目整体规划和管理",
                "capabilities": [
                    "项目规划", "进度管控", "风险管理", "资源分配"
                ],
                "keywords": [
                    "项目规划", "进度管控", "风险管理", "资源分配"
                ],
                "priority": 1,
                "enabled": true
            },
            {
                "id": "operations_director",
                "name": "运营总监", 
                "description": "专注用户增长和数据分析",
                "capabilities": [
                    "数据分析", "用户增长", "运营策略", "市场推广"
                ],
                "keywords": [
                    "用户增长", "数据分析", "运营策略", "转化率优化"
                ],
                "priority": 2,
                "enabled": true
            }
        ],
        "total": 7
    }
}
```

### 获取单个角色详情

```http
GET /roles/{role_id}
Authorization: Bearer {token}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "role": {
            "id": "system_architect",
            "name": "系统架构师",
            "description": "负责技术架构设计和优化",
            "capabilities": [
                "架构设计", "技术选型", "性能优化", "系统设计"
            ],
            "keywords": [
                "架构设计", "技术选型", "性能优化", "微服务"
            ],
            "config": {
                "response_style": "technical",
                "detail_level": "high",
                "include_examples": true
            },
            "statistics": {
                "usage_count": 1250,
                "success_rate": 0.96,
                "average_response_time": 450
            }
        }
    }
}
```

## 🧠 决策引擎 API

### 角色决策

```http
POST /decisions/role
Authorization: Bearer {token}
Content-Type: application/json

{
    "input": "我们的网站响应速度太慢，需要进行性能优化",
    "context": {
        "project_type": "web_application",
        "current_stage": "optimization", 
        "history": [
            {
                "input": "用户反馈页面加载慢",
                "role": "operations_director",
                "timestamp": "2024-12-01T10:00:00Z"
            }
        ]
    },
    "user_id": "user_123",
    "preferences": {
        "prefer_detailed": true,
        "include_reasoning": true
    }
}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "decision": {
            "selected_role": "system_architect",
            "confidence": 92.5,
            "reasoning": "输入内容涉及性能优化，属于技术架构范畴",
            "alternative_roles": [
                {
                    "role": "developer",
                    "score": 78.2,
                    "reason": "可能涉及代码层面优化"
                },
                {
                    "role": "devops_engineer", 
                    "score": 65.8,
                    "reason": "可能需要服务器配置优化"
                }
            ],
            "execution_plan": {
                "primary_tasks": [
                    "性能瓶颈分析",
                    "架构优化方案设计",
                    "技术方案评估"
                ],
                "estimated_time": "2-4小时",
                "required_resources": ["性能监控工具", "测试环境"]
            },
            "metadata": {
                "processing_time": 125,
                "algorithm_version": "v1.2.0",
                "request_id": "req_abc123"
            }
        }
    }
}
```

### 批量决策

```http
POST /decisions/batch
Authorization: Bearer {token}
Content-Type: application/json

{
    "requests": [
        {
            "id": "req_1",
            "input": "设计用户登录界面",
            "context": {"project_type": "web_application"}
        },
        {
            "id": "req_2", 
            "input": "优化数据库查询性能",
            "context": {"project_type": "backend_service"}
        }
    ],
    "user_id": "user_123"
}
```

## 📋 工作流 API

### 创建工作流

```http
POST /workflows
Authorization: Bearer {token}
Content-Type: application/json

{
    "name": "电商网站开发",
    "description": "完整的电商网站开发流程",
    "type": "custom",
    "steps": [
        {
            "name": "需求分析",
            "role": "project_manager",
            "tasks": [
                "用户需求调研",
                "功能规格定义"
            ],
            "estimated_duration": "3天",
            "dependencies": []
        },
        {
            "name": "技术架构设计",
            "role": "system_architect", 
            "tasks": [
                "系统架构设计",
                "技术栈选型"
            ],
            "estimated_duration": "5天",
            "dependencies": ["需求分析"]
        }
    ],
    "variables": {
        "project_type": "e-commerce",
        "tech_stack": "React + Node.js",
        "deadline": "60天"
    },
    "triggers": {
        "keywords": ["电商", "购物网站", "在线商城"]
    }
}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "workflow": {
            "id": "wf_abc123",
            "name": "电商网站开发",
            "status": "created",
            "version": "1.0",
            "created_at": "2024-12-01T10:00:00Z",
            "estimated_duration": "45-60天",
            "total_steps": 2,
            "complexity": "high"
        }
    }
}
```

### 执行工作流

```http
POST /workflows/{workflow_id}/execute
Authorization: Bearer {token}
Content-Type: application/json

{
    "input": "创建一个B2C电商平台",
    "context": {
        "budget": "50万",
        "timeline": "3个月",
        "team_size": 8
    },
    "options": {
        "auto_proceed": false,
        "send_notifications": true,
        "save_intermediate_results": true
    }
}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "execution": {
            "id": "exec_xyz789",
            "workflow_id": "wf_abc123",
            "status": "running",
            "current_step": 1,
            "progress": 0.0,
            "started_at": "2024-12-01T10:00:00Z",
            "estimated_completion": "2024-12-01T18:00:00Z",
            "results": []
        }
    }
}
```

### 获取执行状态

```http
GET /workflows/executions/{execution_id}
Authorization: Bearer {token}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "execution": {
            "id": "exec_xyz789",
            "workflow_id": "wf_abc123",
            "status": "in_progress",
            "current_step": 2,
            "progress": 45.5,
            "started_at": "2024-12-01T10:00:00Z",
            "updated_at": "2024-12-01T14:30:00Z",
            "estimated_completion": "2024-12-01T16:45:00Z",
            "steps_completed": 1,
            "total_steps": 2,
            "results": [
                {
                    "step_name": "需求分析",
                    "role": "project_manager",
                    "status": "completed",
                    "result": {
                        "deliverables": [
                            "用户需求文档",
                            "功能规格说明"
                        ],
                        "insights": [
                            "目标用户主要是25-40岁城市白领",
                            "核心功能包括商品展示、购物车、支付"
                        ]
                    },
                    "duration": 180,
                    "completed_at": "2024-12-01T13:00:00Z"
                }
            ]
        }
    }
}
```

## 📊 分析统计 API

### 系统性能统计

```http
GET /analytics/performance
Authorization: Bearer {token}
Query Parameters:
  - start_date: 2024-11-01
  - end_date: 2024-12-01
  - granularity: daily
```

**响应**:
```json
{
    "status": "success", 
    "data": {
        "performance": {
            "period": {
                "start": "2024-11-01T00:00:00Z",
                "end": "2024-12-01T00:00:00Z"
            },
            "metrics": {
                "total_requests": 12580,
                "total_decisions": 8950,
                "total_workflows": 156,
                "average_response_time": 425.6,
                "accuracy_rate": 0.952,
                "success_rate": 0.988
            },
            "trends": {
                "daily_requests": [
                    {"date": "2024-11-01", "count": 245},
                    {"date": "2024-11-02", "count": 312}
                ],
                "role_usage": {
                    "developer": 3850,
                    "system_architect": 2100,
                    "operations_director": 1500
                }
            }
        }
    }
}
```

### 角色使用统计

```http
GET /analytics/roles
Authorization: Bearer {token}
Query Parameters:
  - timespan: 30d
  - role_id: system_architect (可选)
```

## 🔧 配置管理 API

### 获取系统配置

```http
GET /config
Authorization: Bearer {token}
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "config": {
            "decision_algorithm": {
                "weights": {
                    "keyword_match": 0.4,
                    "context_analysis": 0.3,
                    "project_stage": 0.2,
                    "history_pattern": 0.1
                },
                "confidence_threshold": 0.6,
                "cache_enabled": true,
                "cache_ttl": 300
            },
            "workflow_engine": {
                "max_concurrent_executions": 10,
                "step_timeout": 3600,
                "retry_attempts": 3,
                "auto_recovery": true
            },
            "api_limits": {
                "requests_per_minute": 1000,
                "requests_per_hour": 10000,
                "max_batch_size": 50
            }
        }
    }
}
```

### 更新配置

```http
PUT /config
Authorization: Bearer {token}
Content-Type: application/json

{
    "decision_algorithm": {
        "weights": {
            "keyword_match": 0.45,
            "context_analysis": 0.35,
            "project_stage": 0.15,
            "history_pattern": 0.05
        }
    }
}
```

## 📝 事件和日志 API

### 获取系统事件

```http
GET /events
Authorization: Bearer {token}
Query Parameters:
  - limit: 100
  - offset: 0
  - level: info,warn,error
  - start_time: 2024-12-01T00:00:00Z
  - end_time: 2024-12-01T23:59:59Z
```

**响应**:
```json
{
    "status": "success",
    "data": {
        "events": [
            {
                "id": "evt_123",
                "type": "role_decision",
                "level": "info",
                "message": "角色决策完成: system_architect (置信度: 92.5%)",
                "timestamp": "2024-12-01T10:15:30Z",
                "metadata": {
                    "user_id": "user_123",
                    "request_id": "req_abc123",
                    "processing_time": 125
                }
            }
        ],
        "pagination": {
            "total": 1250,
            "limit": 100,
            "offset": 0,
            "has_next": true
        }
    }
}
```

## 🔍 搜索和查询 API

### 搜索工作流

```http
GET /search/workflows
Authorization: Bearer {token}
Query Parameters:
  - q: 电商开发
  - type: custom,predefined
  - status: active,archived
  - limit: 20
```

### 搜索执行历史

```http
GET /search/executions
Authorization: Bearer {token}
Query Parameters:
  - user_id: user_123
  - status: completed,failed
  - date_from: 2024-11-01
  - date_to: 2024-12-01
```

## ⚠️ 错误处理

### 错误响应格式

```json
{
    "status": "error",
    "error": {
        "code": "INVALID_REQUEST",
        "message": "请求参数不正确",
        "details": "字段 'input' 是必需的",
        "request_id": "req_abc123",
        "timestamp": "2024-12-01T10:00:00Z"
    }
}
```

### 常见错误码

| 错误码 | HTTP状态码 | 说明 |
|--------|------------|------|
| `INVALID_REQUEST` | 400 | 请求参数不正确 |
| `UNAUTHORIZED` | 401 | 认证失败 |
| `FORBIDDEN` | 403 | 权限不足 |
| `NOT_FOUND` | 404 | 资源不存在 |
| `RATE_LIMITED` | 429 | 请求频率超限 |
| `INTERNAL_ERROR` | 500 | 服务器内部错误 |
| `SERVICE_UNAVAILABLE` | 503 | 服务暂时不可用 |

## 📱 SDK 和客户端库

### JavaScript/Node.js

```javascript
const { IntelligentOrchestrator } = require('@intelligent-orchestrator/sdk');

const client = new IntelligentOrchestrator({
    apiKey: 'your_api_key',
    baseURL: 'https://api.intelligent-orchestrator.com/v1'
});

// 角色决策
const decision = await client.decisions.role({
    input: '优化网站性能',
    context: { project_type: 'web_application' }
});

// 执行工作流
const execution = await client.workflows.execute('wf_abc123', {
    input: '创建电商网站'
});
```

### Python

```python
from intelligent_orchestrator import IntelligentOrchestrator

client = IntelligentOrchestrator(
    api_key='your_api_key',
    base_url='https://api.intelligent-orchestrator.com/v1'
)

# 角色决策
decision = client.decisions.role(
    input='优化网站性能',
    context={'project_type': 'web_application'}
)

# 执行工作流
execution = client.workflows.execute(
    'wf_abc123',
    input='创建电商网站'
)
```

## 🔒 安全最佳实践

### API密钥管理
- 🔐 使用环境变量存储API密钥
- 🔄 定期轮换密钥
- 🚫 不要在代码中硬编码密钥
- 📝 记录API使用情况

### 请求安全
- 🌐 始终使用HTTPS
- ✅ 验证响应数据
- ⏰ 设置合理的超时时间
- 🔒 实施请求重试机制

## 📊 API 使用限制

### 频率限制
- **免费版**: 1000 请求/小时
- **专业版**: 10000 请求/小时  
- **企业版**: 100000 请求/小时

### 数据限制
- **最大请求体**: 1MB
- **最大响应体**: 10MB
- **批量请求**: 最多50个
- **并发连接**: 最多10个

## 🔗 相关链接

- [🎭 角色系统详解](Role-System) - 了解角色功能
- [📋 工作流编排](Workflow-Orchestration) - 工作流使用
- [⚙️ 配置指南](Configuration) - 系统配置
- [💡 使用案例](Use-Cases) - 实际应用示例

---

**最后更新**: 2024-12-XX  
**页面版本**: v1.0  
**维护者**: [@huang-jianhua](https://github.com/huang-jianhua) 