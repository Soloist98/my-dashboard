# 项目需求书
## 项目需求
基于Cloudflare部署静态页面资源，用于展示Self-Hosted虚拟机/应用等资源地址
## 使用者
本人
## 技术栈
基于React/Nodejs，编程语言TypeScript，遵循CleanCode/SOLID等编程规范，页面样式逻辑严格分离，禁止使用script，可以使用主流热门前端组件库


## UI视觉风格
使用背景壁纸+应用风格，可以参考最新Apple的UI视觉设计元素  


# Update 1.0
## 网站清单
### Self-hosted应用
1. TrueNas http://192.168.31.165
2. OpenWrt http://192.168.31.18/cgi-bin/luci/
3. N8N http://192.168.31.185:5678/
4. HomeAssistant http://192.168.31.50:8123/
5. JellyFin http://192.168.31.165:30000/web/index.html#/home.html

### Linux-Servers
1. 192.168.31.165
2. 192.168.31.18
3. 192.168.31.185
4. 192.168.31.50

### AI网站
1. DeepSeek https://chat.deepseek.com/

### 常用网站
1. W3首页 https://w3.huawei.com/
2. V2EX https://www.v2ex.com/

# Update 2.0
1. 在AI网站中添加ChatGPT Chat网站
2. 在页面左侧偏上，类似Linux-Servers的位置，添加仪表盘，金融信息分类 
- 2.1 展示内容: 
  - 中国国内金条价格、当日涨幅，单位元
  - BTC价格，当日涨幅，单位美元
  - DOGE价格，当日涨幅，单位美元
  - V2EX价格，当日涨幅，单位美元
- 2.2 查询方式: 找一些公共网站的API调用查询
- 2.3 展示方式: 异步调用不阻塞页面展示，每30s刷新一次，添加手动刷新按钮

3. 额外要求:适配桌面和移动端展示