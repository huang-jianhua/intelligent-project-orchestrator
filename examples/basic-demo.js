/**
 * 智能项目编排系统 - 基本使用示例
 * Basic Usage Example for Intelligent Project Orchestrator
 */

const ProjectOrchestrator = require('../src/orchestrator-demo.js');

function basicDemo() {
    console.log('🎭 智能项目编排系统 - 基本使用示例');
    console.log('══════════════════════════════════════════════');
    
    // 创建编排器实例
    const orchestrator = new ProjectOrchestrator();
    
    console.log('\n【示例1】智能角色识别');
    console.log('─────────────────────────────────────');
    
    const testInputs = [
        '我们需要分析用户增长数据',
        '帮我设计一个登录界面',
        '系统架构需要优化',
        '代码有bug需要修复',
        '执行功能测试',
        '部署到生产环境'
    ];
    
    testInputs.forEach((input, index) => {
        const result = orchestrator.determineRole(input);
        const role = orchestrator.roles[result.role];
        console.log(`${index + 1}. "${input}"`);
        console.log(`   → ${role.emoji} ${role.name} (置信度: ${result.confidence})`);
    });
    
    console.log('\n【示例2】角色切换和任务执行');
    console.log('─────────────────────────────────────');
    
    // 手动切换到运营总监角色
    orchestrator.switchRole('operations_director', '用户增长分析需求');
    
    // 执行任务
    orchestrator.executeTask('用户增长数据分析', '分析用户行为和增长趋势');
    
    console.log('\n【示例3】项目状态查看');
    console.log('─────────────────────────────────────');
    
    orchestrator.showStatus();
    
    console.log('\n【示例4】所有角色展示');
    console.log('─────────────────────────────────────');
    
    Object.entries(orchestrator.roles).forEach(([key, role], index) => {
        console.log(`${index + 1}. ${role.emoji} ${role.name}`);
        console.log(`   优先级: ${role.priority} | 能力: ${role.capabilities.slice(0, 2).join(', ')}`);
    });
    
    console.log('\n✅ 基本示例演示完成！');
    console.log('💡 提示: 运行 npm test 查看完整的系统演示');
}

// 运行示例
if (require.main === module) {
    basicDemo();
}

module.exports = basicDemo; 