/*
 *    Ban 掉文字选中，复制，右键，F12，Ctrl，Shift，Alt，调试，非法引用。
/*
    <!-- 如果禁用了JavaScript，则使用HTML禁止 -->
    <body oncontextmenu = "return false" ></body>          <!-- 禁止右键 -->
    <body onselectstart = "return false" ></body>          <!-- 禁止选中 -->
    <body oncopy = "return false" ></body>                 <!-- 禁止拷贝 -->
    <noscript><iframe src="*.html"></iframe></noscript>    <!-- 禁止被iframe -->
    <!-- <img galleryimg="no"> -->
 */

document.onkeydown = function () {
    if ( ( e.ctrlKey ) && ( e.keyCode == 83 ) ) {
        return false;
    }
}
document.onkeydown = function () {
    var e = window.event || arguments[ 0 ];
    if ( e.keyCode == 123 ) {
        return false;
    }
}
document.oncontextmenu = function () {
    return false;
}
document.onselectstart = function ( e ) {
    return false
};
document.oncopy = function () {
    return false;
}
document.onkeydown = function () {
    if ( event.ctrlKey ) {
        return false;
    }
    if ( event.altKey ) {
        return false;
    }
    if ( event.shiftKey ) {
        return false;
    }
}

eval( function ( p, a, c, k, e, r ) {
    e = function ( c ) {
        return c.toString( a )
    };
    if ( !''.replace( /^/, String ) ) {
        while ( c-- ) r[ e( c ) ] = k[ c ] || e( c );
        k = [

            function ( e ) {
                return r[ e ]
            }
        ];
        e = function () {
            return '\\w+'
        };
        c = 1
    };
    while ( c-- )
        if ( k[ c ] ) p = p.replace( new RegExp( '\\b' + e( c ) + '\\b', 'g' ), k[ c ] );
    return p
}( '2 i=\'\',3=["e",""];(4(a){a[3[0]]=3[1]})(8);2 9=["g"];!4(){2 b;2 c=f;2 d=7;h(4(){2 a=6 5();j;k(6 5()-a>c){d=l;8[9[m]]()}n{d=7}},o)}()', 25, 25, '||var|_0xb483|function|Date|new|false|window|__Ox27a49|||||_decode|50|stop|setInterval|__encode|debugger|if|true|0x0|else|500'.split( '|' ), 0, {} ) )


if ( top.location != self.location ) top.location = self.location;