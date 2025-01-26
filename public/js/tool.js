//传入html字符串源码，进行转码
function htmlEscape(text) { return text.replace(/[<>"&'/]/g, function (match, pos, originalText) { switch (match) { case "<": return "&lt;"; case ">": return "&gt;"; case "&": return "&amp;"; case "\"": return "&quot;"; case "'": return "&#x27;"; case "/": return "&#x2F;" } }) }

//产生随机数
function getRandom(min, max) { var dec = (max - min); return Math.floor(Math.random() * dec + min) }