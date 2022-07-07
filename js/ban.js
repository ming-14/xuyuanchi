/*
 *    Ban 掉文字选中，复制，右键，F12，Ctrl，Shift，Alt，调试，iframe。
 */

function ban_( event )
{
    // 控制键都不要了吧
    if ( event.ctrlKey )
    {
        console.log( "ban ctrlKey" );
        return false;
    }
    if ( event.altKey )
    {
        console.log( "ban altKey" );
        return false;
    }
    if ( event.shiftKey )
    {
        console.log( "ban shiftKey" );
        return false;
    }
    // ctrl + S
    if ( ( event.ctrlKey ) && ( event.keyCode == 83 ) )
    {
        console.log( "ban ctrlKey+s" );
        return false;
    }
    // F12
    if ( event.keyCode == 123 )
    {
        console.log( "ban F12" );
        return false;
    }

    console.log( "ok key" );
    return true;
}
document.onkeydown = ban_;

// 右击鼠标
function ban_oncontextmenu_()
{
    console.log( "ban oncontextmenu" );
    return false;
}
document.oncontextmenu = ban_oncontextmenu_;

// 对象被开始选中
function ban_onselectstart_( e )
{
    console.log( "ban onselectstart" );
    return false
};
document.onselectstart = ban_onselectstart_;

// 拷贝，不可能！！
function ban_oncopy_()
{
    console.log( "ban oncopy" );
    return false;
}
document.oncopy = ban_oncopy_;

function nonono()
{
    console.log( "? ? ? ? ?" );
    window.location = "http://127.0.0.1:520";
}
setInterval( () =>
{
    if ( document.oncopy != ban_oncopy_ )
    {
        nonono();
        document.oncopy = ban_oncopy_;
    }
    if ( document.onselectstart != ban_onselectstart_ )
    {
        nonono();
        document.onselectstart = ban_onselectstart_;
    }
    if ( document.oncontextmenu != ban_oncontextmenu_ )
    {
        nonono();
        document.oncontextmenu = ban_oncontextmenu_;
    }
    if ( document.oncontextmenu != ban_oncontextmenu_ )
    {
        nonono();
        document.onkeydown = ban_;
    }
}, 500 );

// 禁用控制台调试
! function ()
{
    var b;
    var c = 50;
    var d = false;
    setInterval( function ()
    {
        var a = new Date();
        debugger;
        if ( new Date() - a > c )
        {
            d = true;
            window.stop()
        }
        else d = false;
    }, 500 )
}()

// iframe
if ( window.top != window.self )
{
    window.top.location = window.self.location;
    // 好家伙，被拦截了

    window.location = "about:blank";
    // emm...

    window.stop();
}
