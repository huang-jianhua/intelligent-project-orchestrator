# 🛠️ 故障排除指南

当智能项目编排系统出现问题时，本指南将帮助您快速诊断和解决常见故障。

## 🎯 学习目标

- 🔍 掌握系统故障诊断方法
- 🛠️ 学会解决常见技术问题
- 📊 了解性能监控和优化技巧
- 🚨 建立有效的预警和响应机制

## 🔍 诊断工具和方法

### 系统健康检查
```bash
#!/bin/bash
# health-check.sh - 系统健康检查脚本

echo "🔍 智能项目编排系统健康检查"
echo "═══════════════════════════════════════"

# 检查系统状态
check_system_status() {
    echo "📊 检查系统状态..."
    
    # 检查进程是否运行
    if pgrep -f "orchestrator" > /dev/null; then
        echo "✅ 主进程运行正常"
    else
        echo "❌ 主进程未运行"
        return 1
    fi
    
    # 检查端口是否监听
    if netstat -tuln | grep ":3000" > /dev/null; then
        echo "✅ API服务端口正常"
    else
        echo "❌ API服务端口未监听"
        return 1
    fi
    
    # 检查内存使用
    memory_usage=$(free | grep Mem | awk '{printf "%.1f", $3/$2 * 100.0}')
    if (( $(echo "$memory_usage < 85" | bc -l) )); then
        echo "✅ 内存使用正常 (${memory_usage}%)"
    else
        echo "⚠️ 内存使用偏高 (${memory_usage}%)"
    fi
    
    # 检查磁盘空间
    disk_usage=$(df / | grep / | awk '{print $5}' | sed 's/%//g')
    if [ $disk_usage -lt 85 ]; then
        echo "✅ 磁盘空间充足 (${disk_usage}%)"
    else
        echo "⚠️ 磁盘空间不足 (${disk_usage}%)"
    fi
}

# 检查配置文件
check_config_files() {
    echo "📋 检查配置文件..."
    
    config_files=(
        "config/orchestrator-config.yaml"
        "config/roles-config.json"
        "config/algorithm-config.json"
        ".cursorrules"
    )
    
    for file in "${config_files[@]}"; do
        if [ -f "$file" ]; then
            echo "✅ $file 存在"
            # 检查文件语法
            case "$file" in
                *.yaml|*.yml)
                    if python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null; then
                        echo "✅ $file 语法正确"
                    else
                        echo "❌ $file 语法错误"
                    fi
                    ;;
                *.json)
                    if python3 -c "import json; json.load(open('$file'))" 2>/dev/null; then
                        echo "✅ $file 语法正确"
                    else
                        echo "❌ $file 语法错误"
                    fi
                    ;;
            esac
        else
            echo "❌ $file 缺失"
        fi
    done
}

# 检查依赖服务
check_dependencies() {
    echo "🔗 检查依赖服务..."
    
    # 检查数据库连接
    if nc -z localhost 5432; then
        echo "✅ 数据库连接正常"
    else
        echo "❌ 数据库连接失败"
    fi
    
    # 检查Redis连接
    if nc -z localhost 6379; then
        echo "✅ Redis连接正常"
    else
        echo "❌ Redis连接失败"
    fi
    
    # 检查外部API
    if curl -s --connect-timeout 5 https://api.openai.com > /dev/null; then
        echo "✅ 外部API连接正常"
    else
        echo "⚠️ 外部API连接异常"
    fi
}

# 执行检查
check_system_status
check_config_files
check_dependencies

echo "═══════════════════════════════════════"
echo "🏁 健康检查完成"
```

### 日志分析工具
```bash
# log-analyzer.sh - 日志分析脚本

analyze_logs() {
    local log_file="/var/log/orchestrator/orchestrator.log"
    local time_range="1h"  # 分析最近1小时的日志
    
    echo "📊 分析最近${time_range}的日志..."
    
    # 错误统计
    echo "❌ 错误统计:"
    grep -i "error" "$log_file" | tail -100 | awk '{print $0}' | sort | uniq -c | sort -nr
    
    # 警告统计
    echo "⚠️ 警告统计:"
    grep -i "warn" "$log_file" | tail -100 | awk '{print $0}' | sort | uniq -c | sort -nr
    
    # 性能指标
    echo "⚡ 性能指标:"
    grep "response_time" "$log_file" | tail -100 | awk '{sum+=$NF; count++} END {printf "平均响应时间: %.2fms\n", sum/count}'
    
    # 角色切换统计
    echo "🎭 角色切换统计:"
    grep "role_switch" "$log_file" | tail -100 | awk '{print $6}' | sort | uniq -c | sort -nr
}

# 生成报告
generate_report() {
    local report_file="health_report_$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "智能项目编排系统健康报告"
        echo "生成时间: $(date)"
        echo "================================"
        analyze_logs
    } > "$report_file"
    
    echo "📊 报告已生成: $report_file"
}
```

## 🚨 常见故障及解决方案

### 1. 系统启动失败

#### 问题症状
- 进程无法启动
- 端口监听失败
- 配置加载错误

#### 诊断步骤
```bash
# 1. 检查进程状态
ps aux | grep orchestrator

# 2. 查看启动日志
tail -100 /var/log/orchestrator/orchestrator.log

# 3. 检查端口占用
netstat -tuln | grep 3000
lsof -i:3000

# 4. 验证配置文件
node scripts/validate-config.js
```

#### 解决方案

**配置文件错误**
```bash
# 修复YAML语法错误
python3 -c "
import yaml
try:
    with open('config/orchestrator-config.yaml', 'r') as f:
        yaml.safe_load(f)
    print('✅ YAML配置正确')
except yaml.YAMLError as e:
    print(f'❌ YAML语法错误: {e}')
"

# 修复JSON语法错误
python3 -c "
import json
try:
    with open('config/roles-config.json', 'r') as f:
        json.load(f)
    print('✅ JSON配置正确')
except json.JSONDecodeError as e:
    print(f'❌ JSON语法错误: {e}')
"
```

**端口占用问题**
```bash
# 查找占用端口的进程
lsof -ti:3000

# 强制终止进程
kill -9 $(lsof -ti:3000)

# 或者更换端口
export PORT=3001
```

**权限问题**
```bash
# 检查文件权限
ls -la config/
ls -la logs/

# 修复权限
chmod 644 config/*.yaml config/*.json
chmod 755 logs/
chown -R $(whoami):$(whoami) .
```

### 2. 角色识别不准确

#### 问题症状
- 角色切换错误
- 置信度过低
- 上下文理解偏差

#### 诊断步骤
```javascript
// debug-role-decision.js - 角色决策调试
class RoleDecisionDebugger {
    constructor() {
        this.debugMode = true;
    }
    
    analyzeDecision(input, context) {
        console.log('🔍 角色决策调试分析');
        console.log('输入:', input);
        console.log('上下文:', context);
        
        // 关键词匹配分析
        const keywordAnalysis = this.analyzeKeywords(input);
        console.log('关键词分析:', keywordAnalysis);
        
        // 上下文相关性分析
        const contextAnalysis = this.analyzeContext(input, context);
        console.log('上下文分析:', contextAnalysis);
        
        // 历史模式分析
        const patternAnalysis = this.analyzePattern(input);
        console.log('模式分析:', patternAnalysis);
        
        // 权重计算
        const weights = this.calculateWeights(keywordAnalysis, contextAnalysis, patternAnalysis);
        console.log('权重计算:', weights);
        
        return this.selectBestRole(weights);
    }
    
    analyzeKeywords(input) {
        const roles = ['project_manager', 'operations_director', 'system_architect', 'developer'];
        const analysis = {};
        
        roles.forEach(role => {
            const keywords = this.getRoleKeywords(role);
            const matchCount = keywords.filter(keyword => 
                input.toLowerCase().includes(keyword.toLowerCase())
            ).length;
            
            analysis[role] = {
                matchCount,
                totalKeywords: keywords.length,
                score: matchCount / keywords.length
            };
        });
        
        return analysis;
    }
    
    generateRecommendations(analysis) {
        const recommendations = [];
        
        // 分析角色得分分布
        const scores = Object.values(analysis.weights).map(w => w.finalScore);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const scoreGap = maxScore - minScore;
        
        if (scoreGap < 0.2) {
            recommendations.push({
                type: 'low_confidence',
                message: '角色得分差距较小，建议增加更多上下文信息',
                solution: '在输入中包含更具体的关键词或场景描述'
            });
        }
        
        if (maxScore < 0.6) {
            recommendations.push({
                type: 'no_clear_match',
                message: '没有明确的角色匹配',
                solution: '检查是否有新的用例需要扩展角色定义'
            });
        }
        
        return recommendations;
    }
}

// 使用示例
const debugger = new RoleDecisionDebugger();
const result = debugger.analyzeDecision(
    "我们的网站性能很慢，需要优化",
    { projectType: 'web', stage: 'optimization' }
);
```

#### 解决方案

**优化关键词配置**
```json
{
  "keyword_optimization": {
    "system_architect": {
      "primary_keywords": [
        "性能优化", "架构设计", "技术选型", "系统设计",
        "数据库设计", "API设计", "微服务", "分布式"
      ],
      "secondary_keywords": [
        "高并发", "缓存", "负载均衡", "系统安全",
        "扩展性", "可用性", "响应时间", "吞吐量"
      ],
      "synonyms": {
        "性能": ["效率", "速度", "响应时间", "吞吐量"],
        "优化": ["改进", "提升", "增强", "调优"],
        "架构": ["设计", "结构", "框架", "体系"]
      }
    }
  }
}
```

**调整算法权重**
```json
{
  "algorithm_tuning": {
    "weights": {
      "keyword_match": 0.45,
      "context_analysis": 0.35,
      "project_stage": 0.15,
      "history_pattern": 0.05
    },
    "confidence_adjustment": {
      "min_threshold": 0.7,
      "boost_exact_match": 1.2,
      "penalty_ambiguous": 0.8
    }
  }
}
```

### 3. 工作流执行异常

#### 问题症状
- 工作流卡住不动
- 步骤执行失败
- 超时错误

#### 诊断步骤
```javascript
// workflow-debugger.js
class WorkflowDebugger {
    async diagnoseWorkflow(workflowId) {
        console.log(`🔍 诊断工作流: ${workflowId}`);
        
        // 获取工作流状态
        const workflow = await this.getWorkflowState(workflowId);
        console.log('工作流状态:', workflow.status);
        console.log('当前步骤:', workflow.currentStep);
        console.log('执行进度:', `${workflow.progress}%`);
        
        // 检查依赖关系
        const dependencies = this.checkDependencies(workflow);
        console.log('依赖检查:', dependencies);
        
        // 分析执行时间
        const timing = this.analyzeExecutionTiming(workflow);
        console.log('执行时间分析:', timing);
        
        // 检查资源使用
        const resources = this.checkResourceUsage(workflow);
        console.log('资源使用:', resources);
        
        return this.generateDiagnosisReport(workflow, dependencies, timing, resources);
    }
    
    checkDependencies(workflow) {
        const issues = [];
        
        workflow.steps.forEach((step, index) => {
            if (step.dependencies) {
                step.dependencies.forEach(dep => {
                    const depStep = workflow.steps.find(s => s.id === dep);
                    if (!depStep) {
                        issues.push({
                            step: step.name,
                            issue: `依赖步骤不存在: ${dep}`
                        });
                    } else if (depStep.status !== 'completed') {
                        issues.push({
                            step: step.name,
                            issue: `依赖步骤未完成: ${dep} (${depStep.status})`
                        });
                    }
                });
            }
        });
        
        return issues;
    }
    
    analyzeExecutionTiming(workflow) {
        const analysis = {
            totalTime: 0,
            averageStepTime: 0,
            slowestSteps: [],
            timeouts: []
        };
        
        const completedSteps = workflow.steps.filter(s => s.status === 'completed');
        
        if (completedSteps.length > 0) {
            const stepTimes = completedSteps.map(s => s.executionTime);
            analysis.totalTime = stepTimes.reduce((sum, time) => sum + time, 0);
            analysis.averageStepTime = analysis.totalTime / completedSteps.length;
            
            // 找出最慢的步骤
            analysis.slowestSteps = completedSteps
                .sort((a, b) => b.executionTime - a.executionTime)
                .slice(0, 3)
                .map(s => ({
                    name: s.name,
                    time: s.executionTime,
                    role: s.role
                }));
        }
        
        // 检查超时步骤
        analysis.timeouts = workflow.steps.filter(s => s.status === 'timeout');
        
        return analysis;
    }
}
```

#### 解决方案

**超时问题解决**
```yaml
# 调整超时配置
workflow_engine:
  execution:
    step_timeout: 7200  # 增加到2小时
    workflow_timeout: 172800  # 增加到48小时
    retry_attempts: 5  # 增加重试次数
    retry_delay: 10  # 增加重试间隔
```

**资源不足解决**
```bash
# 增加内存限制
export NODE_OPTIONS="--max-old-space-size=4096"

# 优化垃圾回收
export NODE_OPTIONS="--gc-interval=100"

# 监控资源使用
htop
iostat -x 1
```

**步骤失败恢复**
```javascript
// 工作流恢复脚本
async function recoverWorkflow(workflowId) {
    const workflow = await getWorkflow(workflowId);
    
    // 找到失败的步骤
    const failedSteps = workflow.steps.filter(s => s.status === 'failed');
    
    for (const step of failedSteps) {
        console.log(`🔄 重试步骤: ${step.name}`);
        
        try {
            // 重置步骤状态
            step.status = 'pending';
            step.retryCount = (step.retryCount || 0) + 1;
            
            // 重新执行
            await executeStep(step);
            
            console.log(`✅ 步骤重试成功: ${step.name}`);
        } catch (error) {
            console.log(`❌ 步骤重试失败: ${step.name}`, error.message);
        }
    }
}
```

### 4. 性能问题

#### 问题症状
- 响应时间过长
- 内存使用过高
- CPU使用率高

#### 诊断步骤
```bash
# performance-monitor.sh
monitor_performance() {
    echo "📊 系统性能监控"
    
    # CPU使用情况
    echo "💻 CPU使用率:"
    top -bn1 | grep "Cpu(s)" | awk '{print $2}' | sed 's/%us,//'
    
    # 内存使用情况
    echo "🧠 内存使用:"
    free -h | grep "Mem:"
    
    # 磁盘IO
    echo "💾 磁盘IO:"
    iostat -d 1 1
    
    # 网络连接
    echo "🌐 网络连接:"
    netstat -an | grep :3000 | wc -l
    
    # 进程资源使用
    echo "🔍 进程资源:"
    ps aux | grep orchestrator | grep -v grep
}

# 应用性能分析
analyze_app_performance() {
    local pid=$(pgrep -f orchestrator)
    
    if [ -n "$pid" ]; then
        echo "📈 应用性能分析 (PID: $pid)"
        
        # 内存详情
        echo "内存详情:"
        cat /proc/$pid/status | grep -E "(VmSize|VmRSS|VmData|VmStk)"
        
        # 文件描述符
        echo "文件描述符:"
        ls /proc/$pid/fd | wc -l
        
        # 线程数
        echo "线程数:"
        cat /proc/$pid/status | grep Threads
        
        # CPU时间
        echo "CPU时间:"
        cat /proc/$pid/stat | awk '{print "用户时间: " $14 ", 系统时间: " $15}'
    fi
}
```

#### 解决方案

**内存优化**
```javascript
// memory-optimization.js
class MemoryOptimizer {
    constructor() {
        this.cache = new Map();
        this.maxCacheSize = 1000;
    }
    
    // 实现LRU缓存
    optimizeCache() {
        if (this.cache.size > this.maxCacheSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }
    
    // 定期清理内存
    scheduleCleanup() {
        setInterval(() => {
            // 强制垃圾回收（仅在开发环境）
            if (process.env.NODE_ENV === 'development' && global.gc) {
                global.gc();
            }
            
            // 清理过期缓存
            this.cleanExpiredCache();
            
            // 输出内存使用情况
            const usage = process.memoryUsage();
            console.log('内存使用:', {
                rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
                heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
                heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`
            });
        }, 30000); // 每30秒执行一次
    }
    
    cleanExpiredCache() {
        const now = Date.now();
        for (const [key, value] of this.cache.entries()) {
            if (value.expireAt && value.expireAt < now) {
                this.cache.delete(key);
            }
        }
    }
}
```

**CPU优化**
```javascript
// cpu-optimization.js
class CPUOptimizer {
    constructor() {
        this.taskQueue = [];
        this.processing = false;
    }
    
    // 异步处理CPU密集型任务
    async processCPUIntensiveTask(task) {
        return new Promise((resolve, reject) => {
            // 使用worker_threads处理CPU密集型任务
            const { Worker, isMainThread, parentPort } = require('worker_threads');
            
            if (isMainThread) {
                const worker = new Worker(__filename);
                worker.postMessage(task);
                
                worker.on('message', resolve);
                worker.on('error', reject);
                worker.on('exit', (code) => {
                    if (code !== 0) {
                        reject(new Error(`Worker stopped with exit code ${code}`));
                    }
                });
            } else {
                // Worker线程中的处理逻辑
                parentPort.on('message', (task) => {
                    const result = this.executeCPUTask(task);
                    parentPort.postMessage(result);
                });
            }
        });
    }
    
    // 批量处理优化
    batchProcess(tasks, batchSize = 10) {
        const batches = [];
        for (let i = 0; i < tasks.length; i += batchSize) {
            batches.push(tasks.slice(i, i + batchSize));
        }
        
        return Promise.all(
            batches.map(batch => this.processBatch(batch))
        );
    }
    
    async processBatch(batch) {
        const results = [];
        for (const task of batch) {
            const result = await this.processTask(task);
            results.push(result);
            
            // 让出CPU时间
            await new Promise(resolve => setImmediate(resolve));
        }
        return results;
    }
}
```

### 5. 数据库连接问题

#### 问题症状
- 连接超时
- 连接池耗尽
- 查询缓慢

#### 诊断步骤
```sql
-- 检查数据库连接
SELECT 
    client_addr,
    state,
    query,
    query_start
FROM pg_stat_activity 
WHERE datname = 'orchestrator_db';

-- 检查慢查询
SELECT 
    query,
    mean_time,
    calls,
    total_time
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- 检查锁等待
SELECT 
    blocked_locks.pid AS blocked_pid,
    blocked_activity.usename AS blocked_user,
    blocking_locks.pid AS blocking_pid,
    blocking_activity.usename AS blocking_user,
    blocked_activity.query AS blocked_statement,
    blocking_activity.query AS current_statement_in_blocking_process
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.granted;
```

#### 解决方案

**连接池优化**
```javascript
// database-optimization.js
const { Pool } = require('pg');

class DatabaseOptimizer {
    constructor() {
        this.pool = new Pool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            
            // 连接池配置优化
            max: 20,                    // 最大连接数
            min: 5,                     // 最小连接数
            idle: 30000,                // 空闲超时30秒
            acquire: 60000,             // 获取连接超时60秒
            evict: 1000,                // 回收间隔1秒
            
            // 连接超时配置
            connectionTimeoutMillis: 10000,  // 连接超时10秒
            idleTimeoutMillis: 30000,        // 空闲超时30秒
            query_timeout: 20000,            // 查询超时20秒
            
            // 重连配置
            retry: {
                max: 3,
                delay: 1000
            }
        });
        
        // 监控连接池状态
        this.monitorPool();
    }
    
    monitorPool() {
        setInterval(() => {
            console.log('连接池状态:', {
                total: this.pool.totalCount,
                idle: this.pool.idleCount,
                waiting: this.pool.waitingCount
            });
        }, 30000);
    }
    
    async executeQuery(query, params = []) {
        const client = await this.pool.connect();
        
        try {
            const start = Date.now();
            const result = await client.query(query, params);
            const duration = Date.now() - start;
            
            // 记录慢查询
            if (duration > 1000) {
                console.warn('慢查询检测:', {
                    query: query.substring(0, 100),
                    duration: `${duration}ms`,
                    params: params.length
                });
            }
            
            return result;
        } finally {
            client.release();
        }
    }
}
```

## 📊 监控和预警

### 实时监控面板
```javascript
// monitoring-dashboard.js
class MonitoringDashboard {
    constructor() {
        this.metrics = {
            system: new Map(),
            application: new Map(),
            business: new Map()
        };
        
        this.alerts = [];
        this.thresholds = {
            cpu: 80,
            memory: 85,
            disk: 90,
            response_time: 2000,
            error_rate: 5
        };
    }
    
    collectMetrics() {
        setInterval(async () => {
            // 系统指标
            const systemMetrics = await this.getSystemMetrics();
            this.metrics.system.set(Date.now(), systemMetrics);
            
            // 应用指标
            const appMetrics = await this.getApplicationMetrics();
            this.metrics.application.set(Date.now(), appMetrics);
            
            // 业务指标
            const businessMetrics = await this.getBusinessMetrics();
            this.metrics.business.set(Date.now(), businessMetrics);
            
            // 检查告警
            this.checkAlerts(systemMetrics, appMetrics, businessMetrics);
            
            // 清理过期数据
            this.cleanOldMetrics();
        }, 10000); // 每10秒收集一次
    }
    
    checkAlerts(systemMetrics, appMetrics, businessMetrics) {
        const alerts = [];
        
        // CPU告警
        if (systemMetrics.cpu > this.thresholds.cpu) {
            alerts.push({
                type: 'cpu_high',
                level: 'warning',
                message: `CPU使用率过高: ${systemMetrics.cpu}%`,
                value: systemMetrics.cpu,
                threshold: this.thresholds.cpu
            });
        }
        
        // 内存告警
        if (systemMetrics.memory > this.thresholds.memory) {
            alerts.push({
                type: 'memory_high',
                level: 'warning',
                message: `内存使用率过高: ${systemMetrics.memory}%`,
                value: systemMetrics.memory,
                threshold: this.thresholds.memory
            });
        }
        
        // 响应时间告警
        if (appMetrics.avgResponseTime > this.thresholds.response_time) {
            alerts.push({
                type: 'response_slow',
                level: 'critical',
                message: `响应时间过长: ${appMetrics.avgResponseTime}ms`,
                value: appMetrics.avgResponseTime,
                threshold: this.thresholds.response_time
            });
        }
        
        // 错误率告警
        if (appMetrics.errorRate > this.thresholds.error_rate) {
            alerts.push({
                type: 'error_rate_high',
                level: 'critical',
                message: `错误率过高: ${appMetrics.errorRate}%`,
                value: appMetrics.errorRate,
                threshold: this.thresholds.error_rate
            });
        }
        
        // 发送告警
        if (alerts.length > 0) {
            this.sendAlerts(alerts);
        }
    }
    
    sendAlerts(alerts) {
        alerts.forEach(alert => {
            console.log(`🚨 ${alert.level.toUpperCase()}: ${alert.message}`);
            
            // 发送到告警系统
            this.sendToAlertSystem(alert);
            
            // 记录告警历史
            this.alerts.push({
                ...alert,
                timestamp: new Date()
            });
        });
    }
    
    generateHealthReport() {
        const now = Date.now();
        const oneHourAgo = now - 3600000;
        
        // 获取最近一小时的指标
        const recentMetrics = {
            system: Array.from(this.metrics.system.entries())
                .filter(([time]) => time > oneHourAgo)
                .map(([, metrics]) => metrics),
            application: Array.from(this.metrics.application.entries())
                .filter(([time]) => time > oneHourAgo)
                .map(([, metrics]) => metrics),
            business: Array.from(this.metrics.business.entries())
                .filter(([time]) => time > oneHourAgo)
                .map(([, metrics]) => metrics)
        };
        
        return {
            summary: this.calculateSummary(recentMetrics),
            trends: this.analyzeTrends(recentMetrics),
            alerts: this.alerts.filter(alert => 
                alert.timestamp > new Date(oneHourAgo)
            ),
            recommendations: this.generateRecommendations(recentMetrics)
        };
    }
}
```

### 自动恢复机制
```javascript
// auto-recovery.js
class AutoRecovery {
    constructor() {
        this.recoveryActions = new Map();
        this.setupRecoveryActions();
    }
    
    setupRecoveryActions() {
        // CPU过高恢复
        this.recoveryActions.set('cpu_high', async () => {
            console.log('🔄 执行CPU过高恢复...');
            
            // 1. 降低工作线程数
            process.env.WORKER_THREADS = Math.max(1, 
                parseInt(process.env.WORKER_THREADS || '4') - 1
            );
            
            // 2. 增加任务队列延迟
            await this.adjustTaskDelay(200);
            
            // 3. 触发垃圾回收
            if (global.gc) {
                global.gc();
            }
        });
        
        // 内存过高恢复
        this.recoveryActions.set('memory_high', async () => {
            console.log('🔄 执行内存过高恢复...');
            
            // 1. 清理缓存
            await this.clearCache();
            
            // 2. 触发垃圾回收
            if (global.gc) {
                global.gc();
            }
            
            // 3. 重启worker进程
            await this.restartWorkers();
        });
        
        // 响应时间过长恢复
        this.recoveryActions.set('response_slow', async () => {
            console.log('🔄 执行响应时间优化...');
            
            // 1. 启用缓存
            await this.enableCache();
            
            // 2. 减少并发请求
            await this.reduceConcurrency();
            
            // 3. 优化数据库查询
            await this.optimizeQueries();
        });
    }
    
    async executeRecovery(alertType) {
        const action = this.recoveryActions.get(alertType);
        
        if (action) {
            try {
                await action();
                console.log(`✅ 自动恢复成功: ${alertType}`);
                return true;
            } catch (error) {
                console.error(`❌ 自动恢复失败: ${alertType}`, error);
                return false;
            }
        }
        
        return false;
    }
}
```

## 📞 获取帮助

### 技术支持渠道
- **📧 邮件支持**: support@intelligent-orchestrator.com
- **💬 在线聊天**: 官网在线客服
- **🐛 问题反馈**: [GitHub Issues](https://github.com/huang-jianhua/intelligent-project-orchestrator/issues)
- **💡 功能建议**: [GitHub Discussions](https://github.com/huang-jianhua/intelligent-project-orchestrator/discussions)

### 紧急故障响应
```bash
# 紧急重启脚本
#!/bin/bash
# emergency-restart.sh

echo "🚨 执行紧急重启..."

# 1. 保存当前状态
echo "💾 保存当前状态..."
cp -r logs/ backup/logs_$(date +%Y%m%d_%H%M%S)/
cp -r data/ backup/data_$(date +%Y%m%d_%H%M%S)/

# 2. 停止服务
echo "⏹️ 停止服务..."
pkill -f orchestrator
sleep 5

# 3. 清理资源
echo "🧹 清理资源..."
rm -rf /tmp/orchestrator_*
echo 3 > /proc/sys/vm/drop_caches

# 4. 启动服务
echo "🚀 启动服务..."
npm start

# 5. 验证服务
echo "✅ 验证服务..."
sleep 10
curl -f http://localhost:3000/health || echo "❌ 服务启动失败"

echo "🏁 紧急重启完成"
```

## 🔗 相关链接

- [❓ 常见问题FAQ](FAQ) - 查看常见问题解答
- [⚙️ 配置指南](Configuration) - 系统配置优化
- [📊 性能优化](Performance) - 性能调优指南
- [🎭 角色系统详解](Role-System) - 角色配置说明

---

**最后更新**: 2024-12-XX  
**页面版本**: v1.0  
**维护者**: [@huang-jianhua](https://github.com/huang-jianhua) 