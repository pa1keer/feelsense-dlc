@echo off
chcp 65001
setlocal enabledelayedexpansion

echo ===================================================
echo    Публикация FeelSense DLC на GitHub Pages
echo    Пользователь GitHub: pa1kker
echo ===================================================
echo.

:: Проверка наличия Git
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ОШИБКА] Git не установлен. Пожалуйста, установите Git и повторите попытку.
    goto :EOF
)

:: Проверка наличия Node.js и npm
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ОШИБКА] Node.js не установлен. Пожалуйста, установите Node.js и повторите попытку.
    goto :EOF
)

:: Название репозитория
set REPO_NAME=feelsense-dlc

:: Создание необходимых директорий
echo [1/8] Создание необходимых директорий...
if not exist .github\workflows mkdir .github\workflows
if not exist public mkdir public

:: Создание next.config.mjs
echo [2/8] Создание next.config.mjs...
echo /** @type {import('next').NextConfig} */ > next.config.mjs
echo const nextConfig = { >> next.config.mjs
echo   output: 'export', >> next.config.mjs
echo   eslint: { >> next.config.mjs
echo     ignoreDuringBuilds: true, >> next.config.mjs
echo   }, >> next.config.mjs
echo   typescript: { >> next.config.mjs
echo     ignoreBuildErrors: true, >> next.config.mjs
echo   }, >> next.config.mjs
echo   images: { >> next.config.mjs
echo     unoptimized: true, >> next.config.mjs
echo   }, >> next.config.mjs
echo }; >> next.config.mjs
echo. >> next.config.mjs
echo export default nextConfig; >> next.config.mjs

:: Создание файла GitHub Actions workflow
echo [3/8] Создание файла GitHub Actions workflow...
echo name: Deploy to GitHub Pages > .github\workflows\deploy.yml
echo. >> .github\workflows\deploy.yml
echo on: >> .github\workflows\deploy.yml
echo   push: >> .github\workflows\deploy.yml
echo     branches: [main] >> .github\workflows\deploy.yml
echo   workflow_dispatch: >> .github\workflows\deploy.yml
echo. >> .github\workflows\deploy.yml
echo permissions: >> .github\workflows\deploy.yml
echo   contents: read >> .github\workflows\deploy.yml
echo   pages: write >> .github\workflows\deploy.yml
echo   id-token: write >> .github\workflows\deploy.yml
echo. >> .github\workflows\deploy.yml
echo concurrency: >> .github\workflows\deploy.yml
echo   group: "pages" >> .github\workflows\deploy.yml
echo   cancel-in-progress: false >> .github\workflows\deploy.yml
echo. >> .github\workflows\deploy.yml
echo jobs: >> .github\workflows\deploy.yml
echo   build: >> .github\workflows\deploy.yml
echo     runs-on: ubuntu-latest >> .github\workflows\deploy.yml
echo     steps: >> .github\workflows\deploy.yml
echo       - name: Checkout >> .github\workflows\deploy.yml
echo         uses: actions/checkout@v3 >> .github\workflows\deploy.yml
echo       - name: Setup Node >> .github\workflows\deploy.yml
echo         uses: actions/setup-node@v3 >> .github\workflows\deploy.yml
echo         with: >> .github\workflows\deploy.yml
echo           node-version: "18" >> .github\workflows\deploy.yml
echo           cache: 'npm' >> .github\workflows\deploy.yml
echo       - name: Setup Pages >> .github\workflows\deploy.yml
echo         uses: actions/configure-pages@v3 >> .github\workflows\deploy.yml
echo         with: >> .github\workflows\deploy.yml
echo           static_site_generator: next >> .github\workflows\deploy.yml
echo       - name: Install dependencies >> .github\workflows\deploy.yml
echo         run: npm ci >> .github\workflows\deploy.yml
echo       - name: Build with Next.js >> .github\workflows\deploy.yml
echo         run: npm run build >> .github\workflows\deploy.yml
echo       - name: Upload artifact >> .github\workflows\deploy.yml
echo         uses: actions/upload-pages-artifact@v2 >> .github\workflows\deploy.yml
echo         with: >> .github\workflows\deploy.yml
echo           path: ./out >> .github\workflows\deploy.yml
echo. >> .github\workflows\deploy.yml
echo   deploy: >> .github\workflows\deploy.yml
echo     environment: >> .github\workflows\deploy.yml
echo       name: github-pages >> .github\workflows\deploy.yml
echo       url: ${{ steps.deployment.outputs.page_url }} >> .github\workflows\deploy.yml
echo     runs-on: ubuntu-latest >> .github\workflows\deploy.yml
echo     needs: build >> .github\workflows\deploy.yml
echo     steps: >> .github\workflows\deploy.yml
echo       - name: Deploy to GitHub Pages >> .github\workflows\deploy.yml
echo         id: deployment >> .github\workflows\deploy.yml
echo         uses: actions/deploy-pages@v2 >> .github\workflows\deploy.yml

:: Создание файла 404.html
echo [4/8] Создание файла 404.html...
echo ^<!DOCTYPE html^> > public\404.html
echo ^<html^> >> public\404.html
echo ^<head^> >> public\404.html
echo   ^<meta charset="utf-8"^> >> public\404.html
echo   ^<title^>FeelSense DLC^</title^> >> public\404.html
echo   ^<script type="text/javascript"^> >> public\404.html
echo     // Перенаправление на главную страницу >> public\404.html
echo     window.location.href = '/'; >> public\404.html
echo   ^</script^> >> public\404.html
echo ^</head^> >> public\404.html
echo ^<body^> >> public\404.html
echo   ^<p^>Перенаправление на главную страницу...^</p^> >> public\404.html
echo ^</body^> >> public\404.html
echo ^</html^> >> public\404.html

:: Установка зависимостей
echo [5/8] Установка зависимостей...
call npm install

:: Инициализация Git и первый коммит
echo [6/8] Инициализация Git и создание первого коммита...
git init
git add .
git commit -m "Подготовка к публикации на GitHub Pages"

:: Подключение к удаленному репозиторию
echo [7/8] Подключение к удаленному репозиторию...
git branch -M main
git remote add origin https://github.com/pa1keer/%REPO_NAME%.git

:: Отправка кода на GitHub
echo [8/8] Отправка кода на GitHub...
git push -u origin main

echo.
echo ===================================================
echo    Публикация успешно завершена!
echo ===================================================
echo.
echo Ваш сайт будет доступен по адресу:
echo https://pa1kker.github.io/%REPO_NAME%/
echo.
echo Для проверки статуса деплоя перейдите по ссылке:
echo https://github.com/pa1kker/%REPO_NAME%/actions
echo.
echo Не забудьте настроить GitHub Pages в настройках репозитория:
echo https://github.com/pa1kker/%REPO_NAME%/settings/pages
echo.
echo Выберите "GitHub Actions" в качестве источника для сборки.
echo.
pause