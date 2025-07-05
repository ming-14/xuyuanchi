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