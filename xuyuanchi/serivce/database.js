// database.js
// 数据库模块
const config = require("./config");
const mysql = require("mysql");

function connectDatabase() {
    const db = mysql.createConnection({
        host: config.MySQL_Host,
        user: config.MySQL_User,
        password: config.MySQL_Password,
        database: config.database,
    });

    db.connect((err) => {
        if (err) {
            console.error("数据库连接失败，报错如下：\n" + err);
            // 尝试重新连接
            setTimeout(() => {
                console.log("尝试重新连接数据库...");
                connectDatabase();
            }, 2000); // 2秒后重试
        } else {
            console.log("数据库连接成功");
        }
    });

    // 监听错误事件
    db.on('error', (err) => {
        console.error('数据库错误：', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            // 连接丢失错误，尝试重新连接
            console.log("检测到连接丢失，尝试重新连接数据库...");
            connectDatabase();
        } else if (err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
            // 致命错误后尝试添加查询，关闭当前连接并尝试重新连接
            console.log("检测到致命错误，关闭当前连接并尝试重新连接数据库...");
            db.end();
            connectDatabase();
        } else {
            // 其他错误
            console.error("其他错误，报错如下：\n" + err);
        }
    });

    return db;
}

module.exports = { connectDatabase };
