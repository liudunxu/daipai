/**
 * 百度 sitemap 主动推送脚本
 * 用于在构建时自动提交 sitemap 给百度搜索资源平台
 *
 * 使用方法：
 * 1. 在百度搜索资源平台获取你的推送接口地址
 * 2. 将接口地址配置到环境变量 BAIDU_PUSH_URL
 * 3. 在 package.json 的 scripts 中添加: "baidu-push": "node scripts/baidu-push.js"
 * 4. 运行 npm run baidu-push
 */

const https = require('https');
const http = require('http');

// 百度推送接口地址（需要替换为你的）
const BAIDU_PUSH_URL = process.env.BAIDU_PUSH_URL || 'https://www.zkwatcher.top/sitemap.xml';

async function pushToBaidu() {
  const sitemapUrl = 'https://www.zkwatcher.top/sitemap.xml';

  console.log('开始推送 sitemap 到百度搜索资源平台...');
  console.log(`Sitemap URL: ${sitemapUrl}`);

  // 如果配置了百度推送接口地址，则进行推送
  if (BAIDU_PUSH_URL && BAIDU_PUSH_URL.startsWith('http')) {
    try {
      const response = await fetch(BAIDU_PUSH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: sitemapUrl,
      });

      const result = await response.text();
      console.log('百度推送结果:', result);
    } catch (error) {
      console.error('百度推送失败:', error.message);
    }
  } else {
    console.log('未配置百度推送接口，跳过自动推送');
    console.log('如需启用推送，请在环境变量中设置 BAIDU_PUSH_URL');
  }

  // 同时输出手动推送的说明
  console.log('\n========== 手动推送说明 ==========');
  console.log('1. 登录百度搜索资源平台: https://ziyuan.baidu.com');
  console.log('2. 进入「链接提交」->「自动提交」->「sitemap」');
  console.log('3. 提交你的 sitemap 地址:', sitemapUrl);
  console.log('==================================\n');
}

pushToBaidu();
