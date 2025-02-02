const database = require("./database");
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// 连接数据库
const db = database.connectDatabase();

app.all("*", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization"
    );
    res.setHeader("Content-Type", "application/json");
    next();
});

// +-+-+-+-+-+-+-+-
// 初始化数据库
// 表：id, content, date
// +-+-+-+-+-+-+-+-
app.get('/install', (req, res) => {
    let boxsSQL = `
    CREATE TABLE IF NOT EXISTS boxs (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content text NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`;
    db.query(boxsSQL, (err, result) => {
        if (err) throw err;
        else console.log('boxs表插入成功');
    });

    res.json({ code: 200 });
});

// +-+-+-+-+-+-+-+-
// 获取所有box
// 返回
//[
//    {
//        "id": 1,
//          "content": "t",
//          "date": "2025-01-21T12:37:02.000Z"
//      }
//]
// +-+-+-+-+-+-+-+-
app.get('/api/getBoxs', (req, res) => {
    let sql = "SELECT * FROM boxs";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ code: -1 });
        } else res.json(result);
    });
});

// +-+-+-+-+-+-+-+-
// 获取一条box
// /api/getABox/:id
// +-+-+-+-+-+-+-+-
app.get('/api/getABox/:id', (req, res) => {
    let sql = `SELECT * FROM boxs WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ code: -1 });
        } else res.json(result);
    });
});

// +-+-+-+-+-+-+-+-
// 删除一条box
// /api/deleteABox/:id
// +-+-+-+-+-+-+-+-
app.post('/api/deleteABox/:id', (req, res) => {
    let sql = `DELETE FROM boxs WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.json({ code: -1 });
        } else res.json({ code: 200 });
    });
});

// +-+-+-+-+-+-+-+-
// 接受POST请求
// req：
// {
//   data: "数据"
// }
// +-+-+-+-+-+-+-+-
app.post('/api/post', (req, res) => {
    let sql = `INSERT INTO boxs (content) VALUES (?)`;
    db.query(sql, [req.body.data], (err, result) => {
        if (err) {
            console.error(err);
            res.json({ code: -1 });
        } else {
            console.log('数据：', req.body.data, " 成功写入数据库");
            res.json({ code: 200 });
        }
    });
});

app.listen(port, () => {
    console.log(`服务器已打开, 可以运行 http://127.0.0.1:${port}`);
});