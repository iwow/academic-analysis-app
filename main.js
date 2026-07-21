const { app, BrowserWindow, Menu, dialog } = require('electron');
const path = require('path');

// ===== LANGUAGE SUPPORT =====
const LANG_LIST = ['zh', 'en', 'zh-tw', 'ja', 'ko'];
let lang = 'zh';
const langArg = process.argv.find(a => a.startsWith('--lang='));
if (langArg) {
  const v = langArg.split('=')[1];
  if (LANG_LIST.includes(v)) lang = v;
}

const L10N = {
  zh: {
    title: '学情分析系统', menuFile: '文件', menuEdit: '编辑', menuView: '视图', menuHelp: '帮助',
    menuLang: '语言', menuLangLabel: '中文', langCode: 'en',
    exportLabel: '导出数据 (CSV)', printLabel: '打印报告', quitLabel: '退出',
    undoLabel: '撤销', redoLabel: '重做', cutLabel: '剪切', copyLabel: '复制', pasteLabel: '粘贴',
    reloadLabel: '刷新', devtoolsLabel: '开发者工具', zoomInLabel: '放大', zoomOutLabel: '缩小', resetZoomLabel: '重置缩放',
    aboutLabel: '关于学情分析系统', aboutTitle: '关于学情分析系统', aboutMsg: '九科学情分析系统 v1.3.0',
    aboutDetail: 'Win/Mac 通用桌面应用\n数据存储在浏览器本地，不会上传到任何服务器。\n\n基于 Electron 构建。\n支持 5 种语言。',
    htmlFile: 'index.html'
  },
  en: {
    title: 'Academic Analysis', menuFile: 'File', menuEdit: 'Edit', menuView: 'View', menuHelp: 'Help',
    menuLang: 'Language', menuLangLabel: 'English', langCode: 'zh',
    exportLabel: 'Export Data (CSV)', printLabel: 'Print Report', quitLabel: 'Quit',
    undoLabel: 'Undo', redoLabel: 'Redo', cutLabel: 'Cut', copyLabel: 'Copy', pasteLabel: 'Paste',
    reloadLabel: 'Reload', devtoolsLabel: 'Developer Tools', zoomInLabel: 'Zoom In', zoomOutLabel: 'Zoom Out', resetZoomLabel: 'Reset Zoom',
    aboutLabel: 'About Academic Analysis', aboutTitle: 'About Academic Analysis', aboutMsg: 'Academic Analysis System v1.3.0',
    aboutDetail: 'Cross-platform desktop app (Win/Mac)\nAll data stored in browser localStorage — never uploaded.\n\nBuilt with Electron.\n5 languages supported.',
    htmlFile: 'index.en.html'
  },
  'zh-tw': {
    title: '學業成績分析系統', menuFile: '檔案', menuEdit: '編輯', menuView: '檢視', menuHelp: '說明',
    menuLang: '語言', menuLangLabel: '繁體中文', langCode: 'en',
    exportLabel: '匯出資料 (CSV)', printLabel: '列印報告', quitLabel: '結束',
    undoLabel: '復原', redoLabel: '重做', cutLabel: '剪下', copyLabel: '複製', pasteLabel: '貼上',
    reloadLabel: '重新整理', devtoolsLabel: '開發者工具', zoomInLabel: '放大', zoomOutLabel: '縮小', resetZoomLabel: '重設縮放',
    aboutLabel: '關於學情分析系統', aboutTitle: '關於學情分析系統', aboutMsg: '學業成績分析系統 v1.3.0',
    aboutDetail: 'Win/Mac 通用桌面應用程式\n資料儲存在瀏覽器本地，不會上傳到任何伺服器。\n\n基於 Electron 建置。\n支援 5 種語言。',
    htmlFile: 'index.zh-tw.html'
  },
  ja: {
    title: '学業成績分析システム', menuFile: 'ファイル', menuEdit: '編集', menuView: '表示', menuHelp: 'ヘルプ',
    menuLang: '言語', menuLangLabel: '日本語', langCode: 'en',
    exportLabel: 'データエクスポート (CSV)', printLabel: '印刷', quitLabel: '終了',
    undoLabel: '元に戻す', redoLabel: 'やり直す', cutLabel: '切り取り', copyLabel: 'コピー', pasteLabel: '貼り付け',
    reloadLabel: '再読み込み', devtoolsLabel: '開発者ツール', zoomInLabel: '拡大', zoomOutLabel: '縮小', resetZoomLabel: 'ズームリセット',
    aboutLabel: '学業成績分析システムについて', aboutTitle: '学業成績分析システムについて', aboutMsg: '学業成績分析システム v1.3.0',
    aboutDetail: 'Win/Mac 対応デスクトップアプリ\nデータはブラウザの localStorage に保存され、サーバーに送信されることはありません。\n\nElectron で構築。\n5言語対応。',
    htmlFile: 'index.ja.html'
  },
  ko: {
    title: '학업 성적 분석 시스템', menuFile: '파일', menuEdit: '편집', menuView: '보기', menuHelp: '도움말',
    menuLang: '언어', menuLangLabel: '한국어', langCode: 'en',
    exportLabel: '데이터 내보내기 (CSV)', printLabel: '인쇄', quitLabel: '종료',
    undoLabel: '실행 취소', redoLabel: '다시 실행', cutLabel: '잘라내기', copyLabel: '복사', pasteLabel: '붙여넣기',
    reloadLabel: '새로고침', devtoolsLabel: '개발자 도구', zoomInLabel: '확대', zoomOutLabel: '축소', resetZoomLabel: '확대/축소 초기화',
    aboutLabel: '학업 성적 분석 시스템 정보', aboutTitle: '학업 성적 분석 시스템 정보', aboutMsg: '학업 성적 분석 시스템 v1.3.0',
    aboutDetail: 'Win/Mac 범용 데스크탑 앱\n모든 데이터는 브라우저 localStorage에 저장되며 서버에 업로드되지 않습니다.\n\nElectron 기반.\n5개 언어 지원.',
    htmlFile: 'index.ko.html'
  }
};

function switchLanguage(targetLang) {
  lang = targetLang;
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
      submenu: LANG_LIST
        .filter(l => l !== lang)
        .map(l => ({
          label: L10N[l].menuLangLabel,
          click: () => switchLanguage(l)
        }))
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
