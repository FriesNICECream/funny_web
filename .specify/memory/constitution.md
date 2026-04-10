<!--
Sync Impact Report
Version change: 1.0.0 -> 1.0.0
Modified principles:
- 模板占位原则 -> I. 语言一致性
- 模板占位原则 -> II. 规格优先
- 模板占位原则 -> III. 前端结构清晰
- 模板占位原则 -> IV. 体验一致
- 模板占位原则 -> V. 可验证交付
Added sections:
- Additional Constraints
- Development Workflow
Removed sections:
- 无
Templates requiring updates:
- ✅ D:\code-gh\funny_web\.specify\templates\plan-template.md
- ✅ D:\code-gh\funny_web\.specify\templates\spec-template.md
- ✅ D:\code-gh\funny_web\.specify\templates\tasks-template.md
Follow-up TODOs:
- 仓库当前尚未存在 components.json；如后续落地 shadcn/ui，需先完成初始化并统一现有 ui 组件入口
-->

# funny_web Constitution

## Core Principles

### I. 语言一致性
所有代码注释、文档说明、规格说明、计划说明、任务说明 MUST 统一使用中文简体。
英文仅可用于专有名词、接口字段、框架名称等无法自然替换的术语，并 SHOULD
配合中文语义说明。任何新增规范或实现说明不得以英文作为主要表达语言。

### II. 规格优先
所有中大型功能改动 MUST 先完成 specification、plan、tasks，再进入实现阶段。
未经规格确认的结构性调整、跨模块重构、交互流程重写或范围显著扩张，均不得直接进入编码。
如为探索性验证或紧急修复，MUST 在文档中明确说明豁免原因与影响范围。

### III. 前端结构清晰
项目 MUST 保持清晰的 React + Vite 前端结构。页面层负责组合与编排，复杂状态、
业务逻辑、动画逻辑或数据映射 SHOULD 下沉到 feature、hook 或独立组件中。
`App.jsx` MUST 避免承担跨页面业务、复杂状态机或难以复用的实现细节。

### IV. 体验一致
视觉与交互动效 MUST 保持统一设计语言，并同时覆盖桌面端与移动端可用性。
动画效果 MUST 服务于信息表达，不得损害可读性、可访问性、操作反馈或基本性能。
新增模块在视觉层级、状态反馈、响应式布局方面 SHOULD 与现有产品体验保持一致。

### V. 可验证交付
每个功能 MUST 具备明确、可验证的验收标准。涉及用户流程、状态切换、异常场景、
空状态、加载反馈或关键交互的改动，MUST 在规格、计划或任务中体现可检查结果。
无法验证的模糊表述不得作为完成标准直接进入实现阶段。

## Additional Constraints

1. 本项目当前主技术栈为 React + Vite，后续计划文档 MUST 明确说明是否复用现有目录、
   组件与动画能力。
2. 规格文档 SHOULD 优先描述用户价值、页面目标与交互结果，避免提前写入实现细节。
3. 若新增依赖、目录层级或跨模块共享能力，计划与任务 MUST 标明引入理由、影响范围
   与回退边界。
4. 任何影响首屏体验、动画性能或移动端布局的改动，MUST 在成功标准或任务中包含验证方式。
5. 新增或替换基础 UI 组件时 MUST 优先使用 `shadcn/ui` 体系，而非继续扩散自定义散装
   组件。若项目尚未完成 `shadcn/ui` 初始化，计划阶段 MUST 明确初始化方案、组件迁移边界
   与与现有 `src/components/ui/` 的兼容策略。
6. 使用 `shadcn/ui` 时 SHOULD 优先组合现成组件、变体与语义化样式令牌，避免为常见交互
   重复手写基础结构或直接堆叠原始样式类。

## Development Workflow

1. 在进入 `speckit-specify` 前，需求描述 MUST 明确目标用户、核心场景与范围边界。
2. 在进入 `speckit-plan` 前，规格中的高影响歧义 SHOULD 通过 `speckit-clarify` 消解。
3. 在进入 `speckit-implement` 前，任务清单 MUST 可执行、具备明确文件路径，并通过必要的
   一致性检查。
4. 实现完成后，交付说明 SHOULD 回答以下问题：做了什么、如何验证、是否影响桌面端与
   移动端体验、是否存在遗留风险。

## Governance

本宪章高于规格、计划、任务与临时实现习惯。所有评审与实现活动 MUST 核对本宪章符合性。
宪章修订 MUST 记录版本与日期，并按照语义化版本规则递增：

- MAJOR：移除、重定义或弱化既有核心原则，产生不兼容治理变化。
- MINOR：新增原则、强制性约束或实质扩展治理范围。
- PATCH：措辞澄清、排版整理或不改变治理含义的轻微修订。

若规格、计划、任务与本宪章冲突，以本宪章为准。任何实现前 MUST 至少检查语言一致性、
前端结构清晰、体验一致、可验证交付四类硬性要求。

**Version**: 1.0.0 | **Ratified**: 2026-04-10 | **Last Amended**: 2026-04-10
