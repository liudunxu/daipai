#!/bin/bash

# 启动前后端服务

echo "🚀 启动后端 API 服务..."
cd "$(dirname "$0")/server"
python3 main.py &
BACKEND_PID=$!

cd "$(dirname "$0")"
echo "🚀 启动前端服务..."
npm run dev &

# 捕获退出信号
trap "kill $BACKEND_PID 2>/dev/null; exit 0" INT TERM

echo ""
echo "✅ 服务已启动:"
echo "   前端: http://localhost:3000"
echo "   后端: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务"

wait
