# 推送到 GitHub 脚本（全自动版）
# 使用 gh CLI 设备码方式登录并推送
# 只需按照提示在浏览器中授权即可

$GH = "/tmp/gh_extracted/bin/gh.exe"
if (-not (Test-Path $GH)) {
    Write-Host "⬇️ 正在下载 GitHub CLI..." -ForegroundColor Cyan
    $url = "https://github.com/cli/cli/releases/download/v2.56.0/gh_2.56.0_windows_amd64.zip"
    $tmp = "$env:TEMP\gh.zip"
    Invoke-WebRequest -Uri $url -OutFile $tmp
    Expand-Archive -Path $tmp -DestinationPath "$env:TEMP\gh_extracted" -Force
    $GH = "$env:TEMP\gh_extracted\bin\gh.exe"
    Write-Host "✅ 下载完成" -ForegroundColor Green
}

Write-Host "=== GitHub 设备码登录 ===" -ForegroundColor Cyan
Write-Host ""

# 启动设备码登录
$loginResult = & $GH auth login --hostname github.com --git-protocol https --web 2>&1 | Out-String

if ($loginResult -match "([A-Z0-9]{4}-[A-Z0-9]{4})") {
    $code = $matches[1]
    Write-Host "🔑 设备验证码: $code" -ForegroundColor Yellow
    Write-Host "🌐 请在浏览器中打开以下链接:" -ForegroundColor White
    Write-Host ""
    Write-Host "  https://github.com/login/device" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📝 输入验证码: $code" -ForegroundColor Green
    Write-Host ""
    Write-Host "⏳ 等待你完成授权..." -ForegroundColor Yellow
    Write-Host ""
    
    # 等待用户完成授权（等待 auth status 返回成功）
    $maxWait = 120
    $waited = 0
    while ($waited -lt $maxWait) {
        Start-Sleep -Seconds 3
        $status = & $GH auth status 2>&1 | Out-String
        if ($status -match "logged in") {
            Write-Host "✅ 登录成功!" -ForegroundColor Green
            break
        }
        $waited += 3
        Write-Host "  等待中... ($waited 秒)" -NoNewline
        Write-Host "`r" -NoNewline
    }
    
    if ($waited -ge $maxWait) {
        Write-Host "" 
        Write-Host "⏰ 等待超时。请手动登录:" -ForegroundColor Yellow
        Write-Host "  $GH auth login --web"
        exit 1
    }
} else {
    Write-Host "❌ 无法获取设备验证码" -ForegroundColor Red
    Write-Host "输出: $loginResult"
    exit 1
}

# 创建并推送仓库
Write-Host ""
Write-Host "=== 创建 GitHub 仓库 ===" -ForegroundColor Cyan

cd "C:\Users\BR\WorkBuddy\2026-07-01-20-27-18\academic-analysis-app"
$result = & $GH repo create academic-analysis-app --public --description "九科学情分析系统 - 跨平台 Win/Mac/Android" --push --source "." --remote origin 2>&1 | Out-String

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ 大功告成!" -ForegroundColor Green
    Write-Host "仓库地址: https://github.com/iwow/academic-analysis-app" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "其他电脑克隆:" -ForegroundColor White
    Write-Host "  git clone https://github.com/iwow/academic-analysis-app.git"
} else {
    Write-Host ""
    Write-Host "❌ 创建失败:" -ForegroundColor Red
    Write-Host "$result"
    Write-Host ""
    Write-Host "请手动操作:" -ForegroundColor Yellow
    Write-Host "  1. 打开 https://github.com/new"
    Write-Host "  2. 仓库名: academic-analysis-app (公开)"
    Write-Host "  3. 然后运行: git push -u origin master"
}
