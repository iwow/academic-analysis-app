# Academic Analysis — 学情分析系统

一站式学生成绩追踪、可视化分析与学习建议生成工具。
支持 **Windows / macOS / Linux / Android**，**5 种语言**。

## 🌏 多语言版本

| 语言 | 文件 | 启动命令 |
|------|------|---------|
| 🇨🇳 简体中文 | `src/index.html` | `npm run start:zh` |
| 🇺🇸 English | `src/index.en.html` | `npm run start:en` |
| 🇹🇼 繁體中文 | `src/index.zh-tw.html` | `npm run start:zh-tw` |
| 🇯🇵 日本語 | `src/index.ja.html` | `npm run start:ja` |
| 🇰🇷 한국어 | `src/index.ko.html` | `npm run start:ko` |

## 功能

- 九科成绩录入与编辑（双击表格直接修改）
- 雷达图、趋势图、堆叠图、热力图
- 文理分科与新高考选科适配（7 种组合）
- 外语语种支持（英语/日语/俄语/法语/德语/西班牙语/韩语）
- CSV 批量导入导出
- 数据浏览器本地持久化
- 打印报告

## 使用方式

### 浏览器直接使用（无需安装）

打开对应语言的 `src/index.*.html` 即可 — Win / Mac / Linux 通用。

### Electron 桌面版

```bash
npm install
npm run start        # 默认中文
npm run start:en     # English
npm run start:ja     # 日本語
npm run pack:win     # 打包 Windows 安装包
npm run pack:mac     # 打包 macOS 安装包
```

## 项目结构

```
academic-analysis-app/
├── src/
│   ├── index.html          # 简体中文
│   ├── index.en.html       # English
│   ├── index.zh-tw.html    # 繁體中文
│   ├── index.ja.html       # 日本語
│   └── index.ko.html       # 한국어
├── main.js                 # Electron 主进程（5 语言切换菜单）
├── preload.js              # Electron 安全隔离
├── android/                # Android WebView 壳
├── build-macos.sh          # macOS 一键构建脚本
├── build-android.sh        # Android 构建脚本
├── package.json            # 依赖与构建配置 (electron-builder)
├── main.js                 # Electron 主进程 (5 语言菜单)
├── preload.js              # 预加载脚本
└── README.md

## 下载安装包

从 GitHub Releases 下载预构建版本：
- **Windows**: https://github.com/iwow/academic-analysis-app/releases

## 构建环境要求

| 目标 | 环境 | 命令 |
|------|------|------|
| Windows exe | Node.js 18+, Windows | `npm run pack:win` |
| macOS dmg | Node.js 18+, macOS + Xcode | `npm run pack:mac` |
| Android apk | Java 11+, Android SDK | `bash build-android.sh` |
