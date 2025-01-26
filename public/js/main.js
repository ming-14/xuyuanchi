"use strict";

var wishes = ["Rikka 版权所有"];
var api_url = 'https://xuanyuanchi.glitch.me'; // 上传数据的url
function isOnline() { return (typeof api_url == "undefined" || api_url == "" || api_url == "null" || api_url == null) ? false : true; }

var container = document.querySelector(".container");
var zindex = 1;

//将Cookie储存的数据放出
function addCookieData() {
    if (getCookieLength() === 0) { return; }
    //没有数据  

    //拆分 cookie 字符串
    var cookieArr = document.cookie.split(";");

    //循环遍历数组元素
    for (var i = 0; i < cookieArr.length; ++i) {
        var cookiePair = cookieArr[i].split("=");
        if (cookiePair[0][0] === ' ')
            cookiePair[0] = cookiePair[0].slice(1);

        // 跳过不是以data开头的Cookie
        if (!cookiePair[0].startsWith("data")) continue;

        // 剔除重复数据
        const wishContent = decodeURIComponent(cookiePair[1]);
        if (!wishes.some(wish => wish === wishContent)) {
            creatWish(wishContent); // 不重复再加入
        }
    }
}

// 创建一个愿望
function creatWish(words) {
    var div = document.createElement("div");
    // 设置文字
    div.innerHTML = htmlEscape(words); // 转义下，防止xss
    div.className = "item";
    // 点击事件，让下层的盒子成为第一层的盒子
    div.onclick = function () {
        div.style.zIndex = zindex;
        ++zindex;
    };
    // 关闭按钮
    var span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "X";
    div.appendChild(span);
    // 颜色随机
    div.style.background = `rgb(${getRandom(150, 256)},${getRandom(150, 256)},${getRandom(150, 256)})`;
    // 位置随机
    var max_X = window.innerWidth - div.offsetWidth - 40; // 修改: 减少40像素边距
    var max_Y = window.innerHeight - div.offsetHeight - 40; // 修改: 减少40像素边距
    div.style.left = `${getRandom(0, max_X)}px`;
    div.style.top = `${getRandom(0, max_Y)}px`;
    // 关闭事件
    span.onclick = function () {
        var r = confirm("确定删除这个标签？");
        if (r === true) {
            console.log('删除了一个数据');
            container.removeChild(div);
        }
    };
    container.appendChild(div);

    // 拖动功能
    interact(div)
        .draggable({
            listeners: {
                move: function (event) {
                    var target = event.target;
                    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);

                    div.style.zIndex = zindex;
                    ++zindex;
                }
            }
        });

    console.log("数据 \"", words, "\" 添加成功");
}

// 提交数据到服务器
function submitData(words) {
    if (!isOnline()) return;

    // 发送数据到服务器
    $.ajax({
        url: api_url + "/api/post",
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ data: words }),
        contentType: 'application/json',
        success: function (data) {
            console.log(words + ' 提交成功');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('提交数据失败————Error:', textStatus, errorThrown);
        }
    });
}

// 从服务器获取数据
function getBoxsFromServer(Callback) {
    if (!isOnline()) { Callback(); return; }

    $.ajax(
        {
            url: api_url + "/api/getBoxs",
            type: "GET",
            success: function (data, req) {
                wishes = [];
                for (let i = data.length - 1; i >= 0; --i) {
                    wishes.push(data[i].content);
                }
                Callback();
            },
            error: function (err) {
                console.error("无法从服务器获取Box，err：" + err.statusText)
                Callback();
            },
            dataType: "json"
        });
}

// 生成愿望
function init(Callback = () => { }) {
    // 更新数据
    getBoxsFromServer(() => {
        // 添加Boxs
        wishes.forEach(wish => creatWish(wish));
        addCookieData();
        Callback();
    })
}

// 删除Cookie处理函数
function handleClearCookies() {
    var cookieLength = getCookieLength();
    clearAllCookie();
    if (document.cookie === '')
        alert('Ok，' + '删除了' + cookieLength.toString() + '个Cookie');
    else
        alert('Error：无法完全删除Cookie，可能是因为其中有些是第三方Cookie');
}

// 添加音乐播放器处理函数————星茶会
// 失效
function addMusicPlayer() {
    var body = document.getElementsByTagName('body')[0];
    var div = document.createElement('div');
    div.innerHTML = '<iframe frameborder=\'no\' border=\'0\' marginwidth=\'0\' marginheight=\'0\' width=330 height=86 src=\'https://music.163.com/outchain/player?type=2&id=492390949&auto=1&height=66\'></iframe>';
    body.appendChild(div);
    window.setInterval(function () { document.getElementById('addMusic').style.display = 'none'; }, 350);
}

// 刷新界面
var BoxLock = false;
function reloadBox() {
    if (BoxLock) return;
    BoxLock = true;

    // 删除document.querySelector(".container")里面的所有内容
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    // 重新加载数据
    init(() => { BoxLock = false; });
}