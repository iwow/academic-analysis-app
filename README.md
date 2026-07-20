# 九科学情分析系统

一站式学生成绩追踪、可视化分析与学习建议生成工具。支持 **Windows / macOS / Android** 三端。

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

打开 `src/index.html` 即可 — Win / Mac / Linux 通用。

### Windows 桌面版 (exe)

```bash
npm install
npm run pack:win
```

输出文件在 `dist/` 目录：
- **安装包**: `学情分析系统_1.0.0_win64.exe`
- **便携版**: `学情分析系统_1.0.0_win64_portable.exe`（免安装，直接运行）

### macOS 桌面版 (dmg)

```bash
npm install
npm run pack:mac
```

输出文件在 `dist/` 目录：
- **安装包**: `学情分析系统_1.0.0_mac.dmg`

### Android APP (apk)

用 Android Studio 打开 `android/` 目录，Build → Build APK(s)。

或命令行：

```bash
cd android
./gradlew assembleRelease
```

输出文件：`android/app/build/outputs/apk/release/app-release.apk`

## 项目结构

```
academic-analysis-app/
├── src/                  # 前端网页源码
│   └── index.html        # 主要应用（含全部 JS/CSS）
├── main.js               # Electron 主进程
├── preload.js            # Electron 预加载脚本
├── package.json          # 依赖与构建配置
├── android/              # Android 源码
│   └── app/src/main/
│       ├── java/         # Java 主代码
│       ├── res/          # 资源文件
│       └── AndroidManifest.xml
└── README.md
```

## 技术栈

- **前端**: 原生 HTML + Chart.js 图表
- **桌面壳**: Electron 28
- **安卓壳**: Android WebView + AppCompat
- **构建**: electron-builder

## 构建环境要求

- Node.js 18+（桌面端构建）
- Electron 依赖: Windows 需 Visual Studio Build Tools, macOS 需 Xcode
- Android Studio / Gradle（安卓端构建）
