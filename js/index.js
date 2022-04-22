var post_url = 'https://51eea0fc.cpolar.cn';	//上传数据的url

var container = document.querySelector(".container");
var zindex = 1;

// 创建一个愿望
function creatWish(words, ty) {

    //将数据发送至服务器
    if(ty == 1)
    {
        var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
        //这里的url要修改
        httpRequest.open('POST', post_url + '/post', true); //第二步：打开连接
        httpRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.send('ta=' + words);//发送请求 将情头体写在send中
       
        /**
         * 获取数据后的处理程序
         */
        //请求后的回调接口，可将请求成功后要执行的程序写在其中
        //httpRequest.onreadystatechange = function () {};
        window.open('./data/close.html','_blank');
	return;
        alert("审核后展示");
    }

    var div = document.createElement("div");
    // 设置文字
    div.innerHTML = words;
    div.className = "item";

    // 点击事件，让下层的盒子成为第一层的盒子
    div.onclick = function() 
    {
        div.style.zIndex = zindex;
        zindex++;
    }
        // 关闭按钮
    var span = document.createElement("span");
    span.className = "close";
    span.innerHTML = "X";
    div.appendChild(span);
	
    container.onmousedown = function (e) {
            if (e.target.className === 'item') {
                let offsetX = parseInt(e.target.style.left); // 获取当前的x轴距离
                let offsetY = parseInt(e.target.style.top); // 获取当前的y轴距离
                let innerX = event.clientX - offsetX; // 获取鼠标在方块内的x轴距
                let innerY = event.clientY - offsetY; // 获取鼠标在方块内的y轴距
                let that = e.target;
             }
    }

    // 颜色随机
    div.style.background = `rgb(${getRandom(150,256)},${getRandom(150,256)},${getRandom(150,256)})`;
    // 位置随机
    var max_X = window.innerWidth+200 - div.offsetWidth;
    var max_Y = window.innerHeight+200 - div.offsetWidth;
    div.style.left = `${getRandom(0,max_X)}px`;
    div.style.top = `${getRandom(0,max_Y)}px`;
    // 关闭事件
    span.onclick = function()
    {	//就是举报， 举报 点击取消仅隐藏
    	var r=confirm("确定删除这个标签？");
        if (r==true)
        {
            //window.location.href = 'http://gov.12321.cn/';
            container.removeChild(div);
        }
    }
    container.appendChild(div);
    
}
//产生随机数
function getRandom(min, max) 
{
    var dec = max - min;
    return Math.floor(Math.random() * dec + min);
}

// 生成默认愿望
function init() 
{
        //"钱暄翰，我喜欢你。",
        //"孙枫家，我喜欢你。",
        //"周强佑，我喜欢你。",
        //"吴祜加，我喜欢你。",
        //"郑胤博，我喜欢你。",
        //"王祯康，我喜欢你。",
        
    for (let i = 0; i < wishes.length; i++) 
    {
        var wish = wishes[i];
        creatWish(wish, 0);
    }
}

//文本框的回车事件
var txt = document.querySelector(".txt");
txt.onkeydown = function(e)
{
    if (e.keyCode !== 13) { //判断是否回车
        return;
    }
    if (txt.value) {
        creatWish(txt.value, 1);
    } else {
        //init();
    }
}
