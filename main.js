const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

// ===== LANGUAGE SUPPORT =====
let lang = 'zh'; // default: Chinese
const langArg = process.argv.find(a => a.startsWith('--lang='));
if (langArg) {
  const v = langArg.split('=')[1];
  if (v === 'en' || v === 'zh') lang = v;
}

const L10N = {
  zh: {
    title: '学情分析系统',
    menuFile: '文件',
    menuEdit: '编辑',
    menuView: '视图',
    menuHelp: '帮助',
    menuLang: '语言',
    menuLangSwitch: '切换到英文版',
    langCode: 'en',
    exportLabel: '导出数据 (CSV)',
    printLabel: '打印报告',
    quitLabel: '退出',
    undoLabel: '撤销',
    redoLabel: '重做',
    cutLabel: '剪切',
    copyLabel: '复制',
    pasteLabel: '粘贴',
    reloadLabel: '刷新',
    devtoolsLabel: '开发者工具',
    zoomInLabel: '放大',
    zoomOutLabel: '缩小',
    resetZoomLabel: '重置缩放',
    aboutLabel: '关于学情分析系统',
    aboutTitle: '关于学情分析系统',
    aboutMsg: '九科学情分析系统 v1.1.0',
    aboutDetail: 'Win/Mac 通用桌面应用\n数据存储在浏览器本地，不会上传到任何服务器。\n\n基于 Electron 构建。\n中英文双版支持。',
    htmlFile: 'index.html'
  },
  en: {
    title: 'Academic Analysis',
    menuFile: 'File',
    menuEdit: 'Edit',
    menuView: 'View',
    menuHelp: 'Help',
    menuLang: 'Language',
    menuLangSwitch: 'Switch to 中文版',
    langCode: 'zh',
    exportLabel: 'Export Data (CSV)',
    printLabel: 'Print Report',
    quitLabel: 'Quit',
    undoLabel: 'Undo',
    redoLabel: 'Redo',
    cutLabel: 'Cut',
    copyLabel: 'Copy',
    pasteLabel: 'Paste',
    reloadLabel: 'Reload',
    devtoolsLabel: 'Developer Tools',
    zoomInLabel: 'Zoom In',
    zoomOutLabel: 'Zoom Out',
    resetZoomLabel: 'Reset Zoom',
    aboutLabel: 'About Academic Analysis',
    aboutTitle: 'About Academic Analysis',
    aboutMsg: 'Academic Analysis System v1.1.0',
    aboutDetail: 'Cross-platform desktop app (Win/Mac)\nAll data stored in browser localStorage — never uploaded.\n\nBuilt with Electron.\nBilingual: English & Chinese.',
    htmlFile: 'index.en.html'
  }
};

function switchLanguage() {
  const current = L10N[lang];
  lang = current.langCode;
  createWindow();
}

function getT() {
  return L10N[lang];
}

let mainWindow;

function createWindow() {
  // Close existing window if any
  if (mainWindow) {
    mainWindow.close();
    mainWindow = null;
  }

  const T = getT();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    title: T.title,
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'src', T.htmlFile));

  // Build application menu
  const menuTemplate = [
    {
      label: T.menuFile,
      submenu: [
        {
          label: T.exportLabel,
          accelerator: 'CmdOrCtrl+E',
          click: () => mainWindow.webContents.executeJavaScript('exportCSV()')
        },
        { type: 'separator' },
        {
          label: T.printLabel,
          accelerator: 'CmdOrCtrl+P',
          click: () => mainWindow.webContents.executeJavaScript('window.print()')
        },
        { type: 'separator' },
        { role: 'quit', label: T.quitLabel }
      ]
    },
    {
      label: T.menuEdit,
      submenu: [
        { role: 'undo', label: T.undoLabel },
        { role: 'redo', label: T.redoLabel },
        { type: 'separator' },
        { role: 'cut', label: T.cutLabel },
        { role: 'copy', label: T.copyLabel },
        { role: 'paste', label: T.pasteLabel }
      ]
    },
    {
      label: T.menuView,
      submenu: [
        { role: 'reload', label: T.reloadLabel },
        { role: 'toggleDevTools', label: T.devtoolsLabel },
        { type: 'separator' },
        { role: 'zoomIn', label: T.zoomInLabel },
        { role: 'zoomOut', label: T.zoomOutLabel },
        { role: 'resetZoom', label: T.resetZoomLabel }
      ]
    },
    {
      label: T.menuLang,
      submenu: [
        {
          label: T.menuLangSwitch,
          click: () => switchLanguage()
        }
      ]
    },
    {
      label: T.menuHelp,
      submenu: [
        {
          label: T.aboutLabel,
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: T.aboutTitle,
              message: T.aboutMsg,
              detail: T.aboutDetail
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
