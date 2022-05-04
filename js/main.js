"use strict";

var TempData = document.cookie;
var post_url = 'https://18f28039.cpolar.cn'; //上传数据的url

var container = document.querySelector( ".container" );
var zindex = 1;

//传入html字符串源码，进行转码
function htmlEscape( text ) {
    return text.replace( /[<>"&'/]/g, function ( match, pos, originalText ) {
        switch ( match ) {
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "&":
                return "&amp;";
            case "\"":
                return "&quot;";
            case "'":
                return "&#x27;";
            case "/":
                return "&#x2F;";
        }
    } );
}

//将临时储存的数据放出
function addCookieData() {
    if ( getCookieLength() === 0 )
        //没有数据
        return;

    //准备好私钥
    //使用私钥解密
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey( '-----BEGIN RSA PRIVATE KEY-----' + PRIVATE_KEY + '-----END RSA PRIVATE KEY-----' );

    //拆分 cookie 字符串
    var cookieArr = document.cookie.split( ";" );

    //循环遍历数组元素
    for ( var i = 0; i < cookieArr.length; ++i ) {
        var cookiePair = cookieArr[ i ].split( "=" );

        //是否有重复数据
        let IsR = false;
        for ( let i = 0; i < wishes.length; ++i ) {
            if ( decodeURIComponent( cookiePair[ 1 ] ) === wishes[ i ] ) {
                IsR = true;
                break;
            }
        }
        if ( !IsR ) {
            var uncrypted = decrypt.decrypt( cookiePair[ 1 ] );
            if ( uncrypted !== null ) {
                console.log( cookiePair[ 1 ], '已解密，数据：', uncrypted );
                creatWish( decodeURIComponent( uncrypted ), 0 );
            } else {
                console.log( '数据', cookiePair[ 1 ], '解密失败' );
            }
        }


    }
}

//创建一个愿望
function creatWish( words, ty ) {
    //删掉输入框原有内容
    document.getElementById( "wish" )
        .value = "";

    //将数据发送至服务器
    if ( ty == 1 ) {

        //加密数据
        //使用公钥加密
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey( '-----BEGIN PUBLIC KEY-----' + PUBLIC_KEY + '-----END PUBLIC KEY-----' );
        var encrypted = encrypt.encrypt( words );
        console.log( words, '已加密，数据：', encrypted );

        document.cookie = "data" + getCookieLength()
            .toString() + "=" + encrypted;


        //发服务器
        var httpRequest = new XMLHttpRequest(); //第一步：创建需要的对象
        //这里的url要修改
        httpRequest.open( 'POST', post_url + '/post', true ); //第二步：打开连接
        httpRequest.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" ); //设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
        httpRequest.send( 'ta=' + words ); //发送请求 将情头体写在send中

        //return;
        alert( "审核后展示" );
    }

    var div = document.createElement( "div" );
    //设置文字
    div.innerHTML = htmlEscape( words ); //转义下，防止xss
    div.className = "item";

    //点击事件，让下层的盒子成为第一层的盒子
    div.onclick = function () {
        div.style.zIndex = zindex;
        ++zindex;
    }
    //关闭按钮
    var span = document.createElement( "span" );
    span.className = "close";
    span.innerHTML = "X";
    div.appendChild( span );

    container.onmousedown = function ( e ) {
        if ( e.target.className === 'item' ) {
            let offsetX = parseInt( e.target.style.left ); //获取当前的x轴距离
            let offsetY = parseInt( e.target.style.top ); //获取当前的y轴距离
            let innerX = event.clientX - offsetX; //获取鼠标在方块内的x轴距
            let innerY = event.clientY - offsetY; //获取鼠标在方块内的y轴距
            let that = e.target;
        }
    }

    //颜色随机
    div.style.background = `rgb(${getRandom(150,256)},${getRandom(150,256)},${getRandom(150,256)})`;
    //位置随机
    var max_X = window.innerWidth + 200 - div.offsetWidth;
    var max_Y = window.innerHeight + 200 - div.offsetWidth;
    div.style.left = `${getRandom(0,max_X)}px`;
    div.style.top = `${getRandom(0,max_Y)}px`;
    //关闭事件
    span.onclick = function () {
        var r = confirm( "确定删除这个标签？" );
        if ( r === true ) {
            console.log( '删除了一个数据' );
            container.removeChild( div );
        }
    }
    container.appendChild( div );

    console.log( "数据 \"", words, "\" 添加成功，该数据type为：", ty );

    //if ( ty == 1 )
        //window.open( './data/close.html', '_blank' ); //临时关闭
}
//产生随机数
function getRandom( min, max ) {
    var dec = max - min;
    return Math.floor( Math.random() * dec + min );
}

// 生成默认愿望
function init() {
    //"钱暄翰，我喜欢你。",
    //"孙枫家，我喜欢你。",
    //"周强佑，我喜欢你。",
    //"吴祜加，我喜欢你。",
    //"郑胤博，我喜欢你。",
    //"王祯康，我喜欢你。",

    // 变量wishes由外部引入
    for ( let i = 0; i < wishes.length; ++i ) {
        var wish = wishes[ i ];
        creatWish( wish, 0 );
    }
}

//文本框的回车事件
var txt = document.querySelector( ".txt" );
txt.onkeydown = function ( e ) {
    if ( e.keyCode !== 13 ) { //判断是否回车
        return;
    } else
    if ( txt.value ) {
        creatWish( txt.value, 1 );
    }
}
