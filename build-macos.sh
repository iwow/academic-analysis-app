#!/bin/bash
# macOS 构建脚本 — 在 Mac 上运行
set -e

echo "=== 构建学情分析系统 (macOS) ==="

# 检查环境
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ 请在 macOS 上运行此脚本"
    exit 1
fi

cd "$(dirname "$0")"

# 安装依赖
echo "📦 安装依赖..."
npm install

# 构建 macOS 应用
echo "🔨 构建中..."
npm run pack:mac

echo ""
echo "✅ 完成！"
echo "📁 输出目录: dist/"
ls -lh dist/*.dmg 2>/dev/null || ls -lh dist/学情分析系统-darwin-x64/
