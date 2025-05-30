/**
 * 智能项目编排系统 - 高级工作流示例
 * Advanced Workflow Example for Intelligent Project Orchestrator
 */

const ProjectOrchestrator = require('../src/orchestrator-demo.js');

function advancedWorkflowDemo() {
    console.log('🚀 智能项目编排系统 - 高级工作流示例');
    console.log('══════════════════════════════════════════════');
    
    const orchestrator = new ProjectOrchestrator();
    
    console.log('\n【高级示例1】电商平台开发完整流程');
    console.log('─────────────────────────────────────');
    
    // 定义电商平台工作流
    const ecommerceWorkflow = [
        { role: 'project_manager', task: '电商平台项目启动和需求分析', input: '创建一个完整的电商平台' },
        { role: 'operations_director', task: '市场调研和用户画像分析', input: '分析电商市场和目标用户' },
        { role: 'product_designer', task: '用户体验设计和原型制作', input: '设计购物流程和界面' },
        { role: 'system_architect', task: '技术架构和数据库设计', input: '设计高并发电商架构' },
        { role: 'developer', task: '前端商城界面开发', input: '实现商品展示和购物车功能' },
        { role: 'developer', task: '后端API和支付系统开发', input: '实现订单处理和支付集成' },
        { role: 'qa_engineer', task: '功能测试和性能测试', input: '测试购物流程和支付安全' },
        { role: 'devops_engineer', task: '部署配置和上线准备', input: '配置生产环境和CDN' },
        { role: 'operations_director', task: '上线后数据监控和运营优化', input: '监控用户行为和转化率' }
    ];
    
    // 执行工作流
    ecommerceWorkflow.forEach((step, index) => {
        console.log(`\n第${index + 1}步:`);
        orchestrator.switchRole(step.role, `工作流自动切换`);
        orchestrator.executeTask(step.task, step.input);
    });
    
    console.log('\n【高级示例2】用户增长优化专项');
    console.log('─────────────────────────────────────');
    
    // 用户增长优化工作流
    const growthOptimizationFlow = [
        { role: 'operations_director', task: '用户行为数据分析', input: '分析用户留存和流失原因' },
        { role: 'product_designer', task: '用户体验痛点识别', input: '找出影响用户体验的关键问题' },
        { role: 'operations_director', task: '增长策略制定', input: '设计用户获取和留存策略' },
        { role: 'developer', task: '增长功能开发', input: '实现推荐系统和个性化功能' },
        { role: 'qa_engineer', task: 'A/B测试执行', input: '测试不同增长策略的效果' },
        { role: 'operations_director', task: '数据监控和策略调优', input: '监控增长指标并优化策略' }
    ];
    
    growthOptimizationFlow.forEach((step, index) => {
        console.log(`\n增长优化第${index + 1}步:`);
        orchestrator.switchRole(step.role, `增长优化专项`);
        orchestrator.executeTask(step.task, step.input);
    });
    
    console.log('\n【高级示例3】智能决策优化展示');
    console.log('─────────────────────────────────────');
    
    // 复杂场景的智能决策
    const complexScenarios = [
        {
            input: '用户反馈登录页面加载慢，转化率下降了15%',
            expected: '需要系统架构师分析性能问题，运营总监关注转化率',
            context: { problemType: 'performance', urgency: 'high' }
        },
        {
            input: '竞品推出了新功能，我们需要快速响应',
            expected: '运营总监进行竞品分析，产品设计师设计对策',
            context: { problemType: 'competitive_analysis', urgency: 'medium' }
        },
        {
            input: '新用户注册流程太复杂，需要简化',
            expected: '产品设计师优化用户体验，开发工程师实现改进',
            context: { problemType: 'usability', urgency: 'medium' }
        }
    ];
    
    complexScenarios.forEach((scenario, index) => {
        console.log(`\n复杂场景${index + 1}: ${scenario.input}`);
        const result = orchestrator.determineRole(scenario.input, scenario.context);
        const role = orchestrator.roles[result.role];
        console.log(`智能决策: ${role.emoji} ${role.name} (置信度: ${result.confidence})`);
        console.log(`预期结果: ${scenario.expected}`);
        
        // 执行相应任务
        orchestrator.switchRole(result.role, '智能决策系统推荐');
        orchestrator.executeTask('问题分析和解决方案制定', scenario.input);
    });
    
    console.log('\n【系统性能统计】');
    console.log('─────────────────────────────────────');
    
    // 生成性能报告
    orchestrator.generateProjectSummary();
    
    console.log('\n✅ 高级工作流示例演示完成！');
    console.log('🎯 展示了智能编排系统在复杂项目中的应用能力');
}

// 运行示例
if (require.main === module) {
    advancedWorkflowDemo();
}

module.exports = advancedWorkflowDemo;