/**
 * 智能项目编排系统演示脚本
 * Intelligent Project Orchestrator Demo
 */

class ProjectOrchestrator {
    constructor() {
        this.currentRole = null;
        this.projectContext = {
            phase: 'planning',
            taskType: null,
            problemType: null,
            completedTasks: [],
            currentTask: null
        };
        
        // 角色定义
        this.roles = {
            project_manager: {
                name: '项目经理',
                emoji: '🎭',
                priority: 1,
                triggers: ['项目规划', '进度管控', '风险管理', '资源分配', '整体规划', '项目状态', '里程碑'],
                capabilities: ['项目整体规划', '进度跟踪管控', '风险识别管理', '资源分配协调'],
                mindset: '宏观视角，注重计划性和风险控制'
            },
            operations_director: {
                name: '运营总监',
                emoji: '📈',
                priority: 1.5,
                triggers: ['用户增长', '数据分析', '运营策略', '市场推广', '用户留存', '内容运营', 'SEO优化', '商业模式', '竞品分析', '用户画像', '增长黑客', '转化率优化'],
                capabilities: ['数据分析和洞察', '用户增长策略', '内容运营规划', 'SEO和市场推广', '商业模式设计', '用户体验优化'],
                mindset: '数据导向，增长优先，注重用户价值和商业变现'
            },
            system_architect: {
                name: '系统架构师',
                emoji: '🏗️',
                priority: 2,
                triggers: ['架构设计', '技术选型', '性能优化', '系统设计', '数据库设计', 'API设计', '技术方案'],
                capabilities: ['系统架构设计', '技术选型评估', '性能优化方案'],
                mindset: '技术导向，注重可扩展性和性能'
            },
            product_designer: {
                name: '产品设计师',
                emoji: '🎨',
                priority: 2.5,
                triggers: ['需求分析', '用户体验', '界面设计', '原型设计', '用户界面', '交互设计'],
                capabilities: ['需求分析和定义', '用户体验设计', '界面原型设计', '交互流程设计'],
                mindset: '用户导向，注重体验和可用性'
            },
            developer: {
                name: '开发工程师',
                emoji: '👨‍💻',
                priority: 3,
                triggers: ['编写代码', '实现功能', '修复bug', '代码重构', '程序开发', '代码审查', '单元测试'],
                capabilities: ['代码编写实现', '功能模块开发', 'Bug调试修复'],
                mindset: '实现导向，注重代码质量和效率'
            },
            qa_engineer: {
                name: '测试工程师',
                emoji: '🧪',
                priority: 4,
                triggers: ['测试', '质量检查', '自动化测试', '性能测试', '验证', '质量保证'],
                capabilities: ['测试计划制定', '测试用例设计', '自动化测试开发', '质量评估报告'],
                mindset: '质量导向，注重系统稳定性和可靠性'
            },
            devops_engineer: {
                name: '运维工程师',
                emoji: '🚀',
                priority: 5,
                triggers: ['部署', '运维', '监控', 'CI/CD', '自动化运维', '容器化', '云服务'],
                capabilities: ['部署环境配置', 'CI/CD流水线搭建', '系统监控告警', '自动化运维脚本'],
                mindset: '稳定导向，注重系统可用性和自动化'
            }
        };
        
        // 决策规则
        this.decisionRules = {
            // 基于关键词的角色映射
            keywords: {
                '项目规划': 'project_manager',
                '用户增长': 'operations_director',
                '数据分析': 'operations_director',
                '运营策略': 'operations_director',
                'SEO优化': 'operations_director',
                '商业模式': 'operations_director',
                '需求分析': 'product_designer',
                '用户界面': 'product_designer',
                '架构设计': 'system_architect',
                '技术选型': 'system_architect',
                '编写代码': 'developer',
                '实现功能': 'developer',
                '修复bug': 'developer',
                '测试': 'qa_engineer',
                '质量检查': 'qa_engineer',
                '部署': 'devops_engineer',
                '上线': 'devops_engineer',
                '监控': 'devops_engineer'
            },
            
            // 基于项目阶段的主导角色
            phases: {
                'initiation': 'project_manager',
                'planning': 'project_manager',
                'requirements': 'product_designer',
                'design': 'system_architect',
                'development': 'developer',
                'testing': 'qa_engineer',
                'deployment': 'devops_engineer',
                'maintenance': 'devops_engineer'
            },
            
            // 基于问题类型的角色分配
            problems: {
                'performance': 'system_architect',
                'usability': 'product_designer',
                'bugs': 'developer',
                'quality': 'qa_engineer',
                'deployment_failure': 'devops_engineer',
                'resource_conflict': 'project_manager'
            }
        };
        
        // 工作流模板
        this.workflows = {
            'web_application': [
                { role: 'project_manager', task: '项目规划和资源评估' },
                { role: 'product_designer', task: '需求分析和原型设计' },
                { role: 'system_architect', task: '技术架构和数据库设计' },
                { role: 'developer', task: '前端界面开发' },
                { role: 'developer', task: '后端API开发' },
                { role: 'qa_engineer', task: '功能测试和性能测试' },
                { role: 'devops_engineer', task: '部署配置和上线' },
                { role: 'project_manager', task: '项目总结和后续规划' }
            ],
            'bug_fixing': [
                { role: 'qa_engineer', task: '问题分析和重现' },
                { role: 'developer', task: '代码调试和修复' },
                { role: 'qa_engineer', task: '修复验证和回归测试' },
                { role: 'devops_engineer', task: '热修复部署' }
            ],
            'performance_optimization': [
                { role: 'system_architect', task: '性能瓶颈分析' },
                { role: 'developer', task: '代码和数据库优化' },
                { role: 'devops_engineer', task: '服务器和缓存优化' },
                { role: 'qa_engineer', task: '性能测试验证' }
            ]
        };
    }
    
    /**
     * 智能角色决策
     */
    determineRole(userInput, context = {}) {
        let bestRole = null;
        let confidence = 0;
        
        // 1. 基于关键词匹配
        for (const [keyword, role] of Object.entries(this.decisionRules.keywords)) {
            if (userInput.includes(keyword)) {
                bestRole = role;
                confidence = Math.max(confidence, 0.8);
                break;
            }
        }
        
        // 2. 基于项目阶段
        if (context.phase && this.decisionRules.phases[context.phase]) {
            const phaseRole = this.decisionRules.phases[context.phase];
            if (!bestRole || confidence < 0.6) {
                bestRole = phaseRole;
                confidence = 0.6;
            }
        }
        
        // 3. 基于问题类型
        if (context.problemType && this.decisionRules.problems[context.problemType]) {
            const problemRole = this.decisionRules.problems[context.problemType];
            bestRole = problemRole;
            confidence = 0.9;
        }
        
        return { role: bestRole || 'project_manager', confidence };
    }
    
    /**
     * 角色切换
     */
    switchRole(newRole, reason = '') {
        const oldRole = this.currentRole;
        this.currentRole = newRole;
        
        const roleInfo = this.roles[newRole];
        
        console.log(`\n🔄 角色切换: ${oldRole ? this.roles[oldRole].emoji + this.roles[oldRole].name : '无'} → ${roleInfo.emoji}${roleInfo.name}`);
        if (reason) {
            console.log(`   切换原因: ${reason}`);
        }
        console.log(`   专业能力: ${roleInfo.capabilities.join(', ')}`);
        console.log(`   思维模式: ${roleInfo.mindset}`);
        console.log(`   ─────────────────────────────────────`);
        
        return roleInfo;
    }
    
    /**
     * 执行任务
     */
    executeTask(task, userInput) {
        const roleInfo = this.roles[this.currentRole];
        
        console.log(`\n${roleInfo.emoji} 【${roleInfo.name}】正在执行任务:`);
        console.log(`   任务: ${task}`);
        console.log(`   输入: ${userInput}`);
        
        // 模拟任务执行过程
        const outputs = this.generateRoleSpecificOutput(this.currentRole, task, userInput);
        
        console.log(`   输出:`);
        outputs.forEach(output => {
            console.log(`   ✓ ${output}`);
        });
        
        // 记录完成的任务
        this.projectContext.completedTasks.push({
            role: this.currentRole,
            task: task,
            timestamp: new Date().toISOString(),
            outputs: outputs
        });
        
        return outputs;
    }
    
    /**
     * 生成角色特定的输出
     */
    generateRoleSpecificOutput(role, task, input) {
        const outputs = {
            project_manager: [
                '制定项目计划和时间表',
                '分配团队资源和责任',
                '识别项目风险和应对措施',
                '设定项目里程碑和验收标准'
            ],
            operations_director: [
                '分析用户行为数据和增长指标',
                '制定用户获取和留存策略',
                '优化内容运营和SEO策略',
                '设计商业模式和变现方案'
            ],
            product_designer: [
                '分析用户需求和使用场景',
                '设计用户界面原型',
                '制定交互流程图',
                '建立设计规范和风格指南'
            ],
            system_architect: [
                '设计系统整体架构',
                '选择技术栈和框架',
                '设计数据库结构',
                '制定API接口规范'
            ],
            developer: [
                '编写核心功能代码',
                '实现业务逻辑',
                '集成第三方服务',
                '编写单元测试'
            ],
            qa_engineer: [
                '设计测试用例',
                '执行功能测试',
                '进行性能测试',
                '生成质量报告'
            ],
            devops_engineer: [
                '配置生产环境',
                '设置CI/CD流水线',
                '配置监控和告警',
                '编写部署脚本'
            ]
        };
        
        return outputs[role] || ['执行专业任务', '产出高质量成果'];
    }
    
    /**
     * 自动推进项目
     */
    autoAdvanceProject(userInput) {
        console.log(`\n🚀 启动智能项目编排系统`);
        console.log(`用户输入: "${userInput}"`);
        console.log(`═════════════════════════════════════`);
        
        // 确定工作流类型
        let workflowType = 'web_application'; // 默认
        if (userInput.includes('bug') || userInput.includes('错误') || userInput.includes('修复')) {
            workflowType = 'bug_fixing';
        } else if (userInput.includes('优化') || userInput.includes('性能') || userInput.includes('速度')) {
            workflowType = 'performance_optimization';
        }
        
        const workflow = this.workflows[workflowType];
        console.log(`\n📋 选择工作流: ${workflowType}`);
        console.log(`包含 ${workflow.length} 个阶段任务`);
        
        // 执行工作流
        workflow.forEach((step, index) => {
            // 切换角色
            this.switchRole(step.role, `工作流第${index + 1}步`);
            
            // 执行任务
            this.executeTask(step.task, userInput);
            
            // 模拟思考和决策过程
            if (index < workflow.length - 1) {
                console.log(`\n💭 分析下一步需求...`);
                setTimeout(() => {}, 100); // 模拟思考时间
            }
        });
        
        // 项目总结
        this.generateProjectSummary();
    }
    
    /**
     * 生成项目总结
     */
    generateProjectSummary() {
        console.log(`\n📊 项目执行总结`);
        console.log(`═════════════════════════════════════`);
        console.log(`总计执行任务: ${this.projectContext.completedTasks.length} 个`);
        console.log(`涉及角色: ${new Set(this.projectContext.completedTasks.map(t => t.role)).size} 个`);
        
        // 按角色分组统计
        const roleStats = {};
        this.projectContext.completedTasks.forEach(task => {
            if (!roleStats[task.role]) {
                roleStats[task.role] = 0;
            }
            roleStats[task.role]++;
        });
        
        console.log(`\n角色工作量分布:`);
        Object.entries(roleStats).forEach(([role, count]) => {
            const roleInfo = this.roles[role];
            console.log(`  ${roleInfo.emoji} ${roleInfo.name}: ${count} 个任务`);
        });
        
        console.log(`\n✅ 项目编排完成！`);
    }
    
    /**
     * 手动角色切换
     */
    manualRoleSwitch(roleName, reason = '用户指定') {
        if (this.roles[roleName]) {
            this.switchRole(roleName, reason);
            return true;
        }
        return false;
    }
    
    /**
     * 显示当前状态
     */
    showStatus() {
        console.log(`\n📋 当前项目状态`);
        console.log(`═════════════════════════════════════`);
        console.log(`当前角色: ${this.currentRole ? this.roles[this.currentRole].emoji + this.roles[this.currentRole].name : '未设置'}`);
        console.log(`项目阶段: ${this.projectContext.phase}`);
        console.log(`已完成任务: ${this.projectContext.completedTasks.length} 个`);
        
        if (this.projectContext.completedTasks.length > 0) {
            console.log(`\n最近任务:`);
            this.projectContext.completedTasks.slice(-3).forEach(task => {
                const roleInfo = this.roles[task.role];
                console.log(`  ${roleInfo.emoji} ${task.task}`);
            });
        }
    }
}

// 演示使用
function demonstrateOrchestrator() {
    const orchestrator = new ProjectOrchestrator();
    
    console.log('🎭 智能项目编排系统演示');
    console.log('══════════════════════════════════════════════');
    
    // 演示1: 自动推进Web应用项目
    console.log('\n【演示1】创建Web应用项目');
    orchestrator.autoAdvanceProject('帮我创建一个电商网站');
    
    // 稍作停顿
    console.log('\n'.repeat(3));
    
    // 演示2: 性能优化项目
    console.log('【演示2】性能优化项目');
    const orchestrator2 = new ProjectOrchestrator();
    orchestrator2.autoAdvanceProject('网站加载速度很慢，需要优化性能');
    
    // 演示3: 手动角色切换
    console.log('\n'.repeat(2));
    console.log('【演示3】手动角色切换');
    const orchestrator3 = new ProjectOrchestrator();
    orchestrator3.manualRoleSwitch('developer', '用户指定开发模式');
    orchestrator3.executeTask('实现用户登录功能', '需要实现安全的用户认证');
    orchestrator3.showStatus();
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectOrchestrator;
} else {
    // 浏览器环境下直接运行演示
    demonstrateOrchestrator();
} 