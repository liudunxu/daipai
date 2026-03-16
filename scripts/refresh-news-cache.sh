#!/bin/bash

# 刷新主页资讯缓存脚本

echo "正在刷新资讯缓存..."

# 调用刷新 API
response=$(curl -s -X POST "https://www.zkwatcher.top/api/news")

# 打印返回结果
echo "返回结果:"
echo "$response" | jq '.'

# 检查是否成功
success=$(echo "$response" | jq -r '.success')
if [ "$success" = "true" ]; then
  count=$(echo "$response" | jq -r '.count')
  message=$(echo "$response" | jq -r '.message')
  echo ""
  echo "✓ 缓存刷新成功！获取到 $count 条资讯"
else
  error=$(echo "$response" | jq -r '.error')
  echo ""
  echo "✗ 缓存刷新失败: $error"
fi
