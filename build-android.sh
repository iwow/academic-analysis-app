#!/bin/bash
# Android APK 构建脚本 — 需要 Android SDK
set -e

echo "=== 构建学情分析系统 (Android APK) ==="

cd "$(dirname "$0")/android"

# 检查 Java
if ! command -v java &> /dev/null; then
    echo "❌ 需要安装 Java 11+"
    echo "   https://adoptium.net/"
    exit 1
fi

# 检查 ANDROID_HOME
if [ -z "$ANDROID_HOME" ]; then
    if [ -d "$HOME/Android/Sdk" ]; then
        export ANDROID_HOME="$HOME/Android/Sdk"
    elif [ -d "$HOME/Library/Android/sdk" ]; then
        export ANDROID_HOME="$HOME/Library/Android/sdk"
    else
        echo "❌ 请设置 ANDROID_HOME 环境变量"
        echo "    export ANDROID_HOME=~/Android/Sdk"
        exit 1
    fi
fi

echo "🔨 构建 APK..."
if command -v ./gradlew &> /dev/null; then
    ./gradlew assembleRelease
else
    gradle assembleRelease
fi

echo ""
echo "✅ 完成！"
echo "📁 APK 位置: app/build/outputs/apk/release/app-release.apk"
ls -lh app/build/outputs/apk/release/app-release.apk 2>/dev/null || true
