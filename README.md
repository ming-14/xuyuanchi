我还是那么爱NodeJS~~

---
效果 <https://ming-14.github.io/xuyuanchi-pages/>

---
## 项目介绍
一个simple的许愿池

## 目录结构
```
xuyuanchi
│  README.md README
│
├─public 前端界面
│  │  favicon.ico
│  │  index.html
│  │
│  ├─css CSS
│  │      main.css
│  │
│  └─js JavaScript
│      │  main.js
│      │  tool.js
│      │
│      └─library
│          │  cookie.min.js Cookie操作
│          │
│          ├─mouse-click
│          │      mouse-click-love.min.js 鼠标点击产生爱心
│          │
│          └─snow 网站下雪
│                  snowy.min.css
│                  snowy.min.js
│
└─serivce 后端API
        config.js 配置文件，包括数据库信息
        database.js 数据库连接模块
        package-lock.json 
        package.json
        serivce.js 主程序
```

## 如何使用
./serivce/config.js 填写数据库信息  
./public/js/main.js 填写变量 `api_url`，如 `var api_url = "https://example.com";`，加协议头不加末尾斜杠  
在后端运行 `npm install && node serivce.js`  
访问 `后台地址/install`  
最后把 `public/*` 放在你的服务器就OK啦

## 缺陷 And TODO
[X] 后台管理员界面  
[X] 部分API的身份验证  
所以只能是一个MySQL增删查改的基本Project啦！
