# Tasks: Stitch Media Data 仪表盘

**Input**: Design documents from `/specs/001-stitch-media-data/`  
**Prerequisites**: plan.md、spec.md、research.md、data-model.md、contracts/、quickstart.md

**Tests**: 本次任务不单列自动化测试任务，因为规格未要求 TDD；验收以 `pnpm build` 与 [quickstart.md](./quickstart.md) 手工流程为准。  
**Organization**: 任务按用户故事分组，保证每个故事都能独立实现与验证。

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 建立媒体数据页的特性目录、资源基线与实现约束

- [ ] T001 创建媒体数据特性目录骨架于 `src/features/media-data/`
- [ ] T002 整理 Stitch 参考资源并落位实现期静态资源目录 `public/assets/media-data/`
- [ ] T003 创建媒体数据初始视图模型与 MOCK 数据文件 `src/features/media-data/data/mediaDataMock.js`
- [ ] T004 创建 shadcn/ui 兼容基线配置 `components.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 完成所有用户故事共用的页面壳层与状态基础设施

**⚠️ CRITICAL**: 完成前不得进入任何用户故事实现

- [ ] T005 调整仪表盘壳层以支持注入媒体数据主内容区域 `src/features/dashboard/DashboardPage.jsx`
- [ ] T006 [P] 创建媒体数据页面视图模型 Hook `src/features/media-data/hooks/useMediaDataViewModel.js`
- [ ] T007 [P] 创建媒体数据共享布局容器 `src/features/media-data/components/MediaDataShell.jsx`
- [ ] T008 [P] 创建空状态、无结果与字段缺省反馈组件 `src/features/media-data/components/MediaFeedbackState.jsx`

**Checkpoint**: 基础壳层、共享状态与反馈机制就绪，用户故事可开始实施

---

## Phase 3: User Story 1 - 浏览影视资源总览 (Priority: P1) 🎯 MVP

**Goal**: 已登录用户能在仪表盘中浏览影视卡片、核心元信息和资源链接  
**Independent Test**: 登录后进入媒体数据页，可看到标题区、资源卡片网格，以及每张卡片中的封面、评分、标签、年份与链接列表

### Implementation for User Story 1

- [ ] T009 [P] [US1] 创建资源链接列表组件 `src/features/media-data/components/MediaLinkList.jsx`
- [ ] T010 [P] [US1] 创建媒体资源卡片组件 `src/features/media-data/components/MediaCard.jsx`
- [ ] T011 [US1] 创建媒体资源网格组件 `src/features/media-data/components/MediaGrid.jsx`
- [ ] T012 [US1] 组装媒体数据主页面 `src/features/media-data/MediaDataPage.jsx`
- [ ] T013 [US1] 在仪表盘中接入媒体数据页面作为已登录主视图 `src/features/dashboard/DashboardPage.jsx`

**Checkpoint**: 用户故事 1 完成后，页面已可独立演示核心浏览与链接访问价值

---

## Phase 4: User Story 2 - 通过导航与筛选缩小范围 (Priority: P2)

**Goal**: 用户能通过导航、搜索与筛选入口缩小资源范围并获得明确反馈  
**Independent Test**: 用户可切换导航激活态、输入关键词或触发筛选排序入口，并看到结果区域或状态提示发生可感知变化

### Implementation for User Story 2

- [ ] T014 [P] [US2] 创建顶部分类导航组件 `src/features/media-data/components/MediaTopNav.jsx`
- [ ] T015 [P] [US2] 创建筛选与排序工具栏组件 `src/features/media-data/components/MediaToolbar.jsx`
- [ ] T016 [P] [US2] 创建媒体数据侧边导航区块 `src/features/media-data/components/MediaSidebarNav.jsx`
- [ ] T017 [US2] 扩展筛选、搜索、排序与导航激活逻辑 `src/features/media-data/hooks/useMediaDataViewModel.js`
- [ ] T018 [US2] 将导航与筛选交互接入主页面与仪表盘壳层 `src/features/media-data/MediaDataPage.jsx`

**Checkpoint**: 用户故事 2 完成后，页面可独立验证导航与筛选主流程

---

## Phase 5: User Story 3 - 在不同屏幕下保持可用体验 (Priority: P3)

**Goal**: 用户在桌面端与移动端都能完成浏览、导航与链接访问  
**Independent Test**: 在桌面宽度和移动宽度下访问页面，确认导航可达、卡片布局稳定、长文本不破坏主要操作区

### Implementation for User Story 3

- [ ] T019 [P] [US3] 为媒体数据页面补齐桌面端与移动端布局切换 `src/features/media-data/MediaDataPage.jsx`
- [ ] T020 [P] [US3] 优化卡片长文本、标签换行与链接区域响应式表现 `src/features/media-data/components/MediaCard.jsx`
- [ ] T021 [P] [US3] 优化移动端侧栏开合与内容区可达性 `src/features/dashboard/DashboardPage.jsx`
- [ ] T022 [US3] 将空状态、无结果和字段缺省反馈完整接入页面主流程 `src/features/media-data/components/MediaFeedbackState.jsx`

**Checkpoint**: 用户故事 3 完成后，桌面端与移动端均可独立完成主流程验收

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 完成交付前的一致性收口与文档校对

- [ ] T023 [P] 统一媒体数据页共享样式令牌与全局样式补充 `src/styles.css`
- [ ] T024 [P] 根据最终实现回写资源与验收说明 `specs/001-stitch-media-data/quickstart.md`
- [ ] T025 对照最终实现补充交付说明与范围边界 `specs/001-stitch-media-data/plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: 无依赖，可立即开始
- **Phase 2: Foundational**: 依赖 Phase 1 完成，并阻塞所有用户故事
- **Phase 3-5: User Stories**: 依赖 Phase 2 完成；之后按优先级推进，必要时可并行
- **Phase 6: Polish**: 依赖已交付的用户故事完成

### User Story Dependencies

- **US1**: 仅依赖 Foundational，完成后即可形成 MVP
- **US2**: 依赖 Foundational，并复用 US1 已具备的页面承载能力
- **US3**: 依赖 Foundational，并对 US1、US2 的布局与状态进行响应式加固

### Within Each User Story

- 先完成数据与基础组件，再组装页面主入口
- 先完成交互逻辑，再完成页面级接线
- 完成每个用户故事后，必须按 `quickstart.md` 进行独立验收

### Parallel Opportunities

- Phase 1 中的 `T002`、`T003`、`T004` 可并行
- Phase 2 中的 `T006`、`T007`、`T008` 可并行
- US1 中的 `T009`、`T010` 可并行
- US2 中的 `T014`、`T015`、`T016` 可并行
- US3 中的 `T019`、`T020`、`T021` 可并行
- Phase 6 中的 `T023`、`T024`、`T025` 可并行

---

## Parallel Example: User Story 2

```bash
Task: "创建顶部分类导航组件 `src/features/media-data/components/MediaTopNav.jsx`"
Task: "创建筛选与排序工具栏组件 `src/features/media-data/components/MediaToolbar.jsx`"
Task: "创建媒体数据侧边导航区块 `src/features/media-data/components/MediaSidebarNav.jsx`"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1 与 Phase 2
2. 完成 User Story 1
3. 按 `quickstart.md` 验证登录后主视图、卡片信息和链接访问
4. 通过后再继续导航筛选与响应式增强

### Incremental Delivery

1. 先交付可浏览资源的媒体数据页
2. 再交付导航与筛选能力
3. 最后补齐响应式与异常状态加固

### Notes

- 所有任务描述均包含明确文件路径，便于后续直接执行
- 本期不做后端接入扩展，默认使用前端 MOCK 数据完成页面改版
- 若实现中新增基础 UI 组件，需保持与 `components.json` 中的 shadcn/ui 兼容策略一致
