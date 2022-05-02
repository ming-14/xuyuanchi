var http = require( 'http' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require( 'url' );

var routes = {
    '/post': function ( req, res ) {
        var obj = {};
        req.msg.split( '&' )
            .forEach( function ( item, i ) {
                obj[ item.split( '=' )[ 0 ] ] = item.split( '=' )[ 1 ];
            } );
        res.setHeader( "Content-Type", "text/plain; charset=utf-8" );
        console.log( 'info: ', obj.ta, '\n' );
    }
}

var server = http.createServer( function ( req, res ) {

    var pathObj = url.parse( req.url, true );

    //新添处理路由的代码
    var handleFn = routes[ pathObj.pathname ];
    if ( handleFn ) {
        var msg = '';
        req.on( 'data', function ( chunk ) { //req的监听方法data
                msg += chunk; //拼接获取到数据
            } )
            .on( 'end', function () { //数据接收完触发
                req.msg = msg;
                handleFn( req, res );
            } );
    } else {
        var staticPath = path.join( __dirname, 'act' );
        var filePath = path.join( staticPath, pathObj.pathname );
        fs.readFile( filePath, 'binary', function ( err, fileContent ) {
            if ( err ) {
                res.writeHead( 404, "Not Found" );
                res.end( '<h1>404 Not Found!</h1>' )
            } else {
                res.writeHead( 200, 'OK' );
                res.write( fileContent, 'binary' );
                res.end( '<h1>200 OK</h1>' );
            }
        } );
    }
} );

server.listen( 81 );
console.log( '服务器已打开, 可以运行' );
