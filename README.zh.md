# CastConnect (演员纽带)


## 项目简介

CastConnect 是一个创新的影视作品关联分析工具，帮助用户发现不同剧集之间的演员联系。用户可以轻松搜索并选择多个影视作品，系统将自动分析并展示这些作品之间的演员关联，包括共同出演者及其在各作品中扮演的角色。

### 主要特性

- 🔍 智能搜索：快速查找影视作品
- 🎭 多剧集选择：支持同时分析多个作品
- 👥 演员关联：直观展示共同演员信息
- 📱 响应式设计：完美支持各种设备
- 🌐 SEO 优化：更好的搜索引擎可见性

## 技术栈

- 框架：Next.js (App Router)
- 样式：Tailwind CSS
- UI组件：Shadcn UI
- 语言：TypeScript
- 部署：Vercel

## 项目结构

```
cast-connect/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx       # 全局布局
│   │   ├── page.tsx        # 主页面
│   │   └── globals.css     # 全局样式
│   ├── components/
│   │   └── ui/            # UI组件
│   ├── lib/
│   │   └── mockData.ts    # 模拟数据
│   └── types/
│       └── index.ts       # 类型定义
├── tailwind.config.ts     # Tailwind 配置
├── next.config.js        # Next.js 配置
├── package.json
└── tsconfig.json
```

## 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone https://github.com/Linncharm/cast-connect.git
cd cast-connect
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问 `http://localhost:3000`

## 开发指南

### 项目配置

项目使用 TypeScript 确保类型安全，主要配置文件包括：

1. `tsconfig.json` - TypeScript 配置
2. `tailwind.config.ts` - Tailwind CSS 配置
3. `next.config.js` - Next.js 配置

### 数据结构

核心数据类型定义：

```typescript
interface Show {
  id: number;
  title: string;
  coverImage: string;
  year: number;
}

interface Actor {
  id: number;
  name: string;
  image: string;
}

interface Role {
  showId: number;
  actorId: number;
  characterName: string;
}
```

### 组件设计

项目采用模块化设计，主要组件包括：

1. 搜索框组件
   - 实时搜索建议
   - 防抖处理
   - 错误处理

2. 剧集展示组件
   - 网格布局
   - 响应式设计
   - 删除功能

3. 关系图谱组件（计划中）
   - 可视化展示
   - 交互式操作
   - 数据过滤

## 样式指南

项目使用 Tailwind CSS 进行样式管理，主要颜色方案：

```css
/* 主题色 */
--primary: #3b82f6;   /* 蓝色 */
--secondary: #6b7280; /* 灰色 */
--accent: #8b5cf6;    /* 紫色 */

/* 背景色 */
--bg-primary: #111827;   /* 深色背景 */
--bg-secondary: #1f2937; /* 次深色背景 */

/* 文字色 */
--text-primary: #ffffff;   /* 主文字 */
--text-secondary: #9ca3af; /* 次要文字 */
```

## 部署指南

### Vercel 部署

1. 在 Vercel 上创建新项目
2. 连接 GitHub 仓库
3. 配置环境变量（如需要）
4. 部署

### 手动部署

1. 构建项目
```bash
npm run build
```

2. 启动生产服务器
```bash
npm start
```

## 路线图

### 第一阶段 (当前)
- [x] 基础界面设计
- [x] 搜索功能实现
- [x] 多选功能实现
- [ ] 演员数据整合

### 第二阶段
- [ ] 演员关系可视化
- [ ] 用户账户系统
- [ ] 收藏功能
- [ ] 分享功能

### 第三阶段
- [ ] API 优化
- [ ] 性能优化
- [ ] 国际化支持
- [ ] 更多数据源接入

## 贡献指南

欢迎提交 Pull Request 或创建 Issue！

### 贡献步骤

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 作者

- Linncharm

_最后更新时间：2025-02-20_