# Implementation Plan: Stitch Media Data 仪表盘

**Branch**: `[001-stitch-media-data]` | **Date**: 2026-04-10 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/001-stitch-media-data/spec.md`

## Summary

基于 Stitch 的 “Media Data (Updated Nav & Links)” 屏幕，重构当前已登录后的仪表盘主视图。实现方式采用现有 React + Vite 单页结构，在仪表盘壳层下新增独立的媒体数据 feature，以前端 MOCK 数据驱动导航、卡片、筛选和资源链接视图模型，并补齐桌面端与移动端的可用性验证路径。

## Technical Context

**Language/Version**: JavaScript ES Modules + React 19  
**Primary Dependencies**: React 19、React DOM 19、Vite 7、Tailwind CSS 4、现有自定义 `src/components/ui/` 基础组件  
**Storage**: N/A，当前采用前端 MOCK 数据文件承载页面内容  
**Testing**: `pnpm build` 构建校验 + `quickstart.md` 手工验收流程  
**Target Platform**: 现代桌面与移动浏览器  
**Project Type**: 单仓库前端 Web 应用  
**Performance Goals**: 首屏主视图稳定渲染，常规桌面设备与移动设备浏览页面时交互流畅，无明显掉帧或布局阻塞  
**Constraints**: 保留现有登录态与用户信息操作；避免将复杂业务继续堆入 `src/App.jsx`；当前阶段不接入后端接口而采用 MOCK 数据；兼顾桌面端与移动端可用性；新增或替换基础交互时需遵循 shadcn/ui 兼容方向  
**Scale/Scope**: 1 个已登录主视图改版，包含 1 套头部导航、1 套侧边导航、1 个媒体资源卡片网格和相关筛选反馈逻辑

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **语言一致性**: 通过。规格、计划、后续任务均使用中文简体。
- **规格优先**: 通过。已先完成 `spec.md`、`requirements.md`，再进入计划阶段。
- **前端结构清晰**: 通过。计划采用 `src/features/media-data/` 独立承接新页面，避免继续扩大 `src/App.jsx` 与现有 `DashboardPage.jsx` 责任。
- **体验一致**: 通过。计划明确覆盖桌面端与移动端，并沿用现有仪表盘壳层、主题与会话操作。
- **可验证交付**: 通过。已定义可测成功标准，并在 `quickstart.md` 中补充验收流程。
- **附加约束检查**:
  - 当前项目为 React + Vite，计划复用现有目录结构与 UI 组件入口。
  - 仓库当前不存在 `components.json`，因此基础阶段需补充 shadcn/ui 初始化边界或兼容策略，避免继续扩散散装基础组件。

## Project Structure

### Documentation (this feature)

```text
specs/001-stitch-media-data/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── media-dashboard-ui-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.jsx
├── components/
│   ├── ThemeToggle.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Sidebar.jsx
│       └── TextField.jsx
├── features/
│   ├── auth/
│   ├── dashboard/
│   │   └── DashboardPage.jsx
│   └── media-data/
│       ├── MediaDataPage.jsx
│       ├── components/
│       ├── data/
│       └── hooks/
├── hooks/
└── styles.css

public/
└── assets/
    └── media-data/
```

**Structure Decision**: 保持单仓库前端结构不变，在现有 `dashboard` 壳层下新增 `media-data` feature 目录承接页面内容、视图模型与资源数据；基础 UI 优先复用 `src/components/ui/`，必要时再补充 shadcn/ui 初始化边界。

## Phase 0: Research Output

- 复用 React + Vite 单页结构，不直接嵌入 Stitch HTML
- 将 Stitch 页面转为本地可维护的 MOCK 视图模型
- 将媒体数据页实现为独立 dashboard feature
- 采用桌面常驻侧栏 + 移动端折叠入口的响应式策略
- 将 shadcn/ui 兼容方案列为基础阶段显式任务

## Phase 1: Design Output

- `data-model.md`: 定义媒体资源项、资源链接项、导航项、筛选状态与页面展示状态
- `contracts/media-dashboard-ui-contract.md`: 约束页面入口、结构、卡片、链接、筛选反馈和响应式行为
- `quickstart.md`: 定义构建校验与手工验收路径

## Post-Design Constitution Check

- **语言一致性**: 持续通过，所有设计产物均为中文简体。
- **前端结构清晰**: 持续通过，目录已限定为 `features/media-data` 扩展，不要求在全局壳层堆积业务实现。
- **体验一致**: 持续通过，合同与 quickstart 都明确包含桌面/移动双端验收。
- **可验证交付**: 持续通过，数据模型、合同和 quickstart 已补足验收语义。

## Complexity Tracking

本次计划无需额外复杂度豁免。
