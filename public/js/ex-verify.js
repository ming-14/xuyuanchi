var answerWeb = "**";
var checkApi = "**";

(function () {
    // authentication_answer 是问题的答案，来自盆表
    let VerifyData = getCookie("authentication_answer") ? getCookie("authentication_answer") : "{}";
    if (VerifyData == "{}") { // 没有数据就是无权限
        document.getElementById("wish").placeholder = "上传语录（需要验证权限）";
        return;
    }
    $.ajax({
        url: checkApi,
        data: unescape(VerifyData),
        type: "POST",
        contentType: "application/json",
        success: function (response, status) {
            if (response.code === 200) {
                removeloading();
                if (!response.data) {
                    document.getElementById("wish").placeholder = "上传语录（需要验证权限）";
                } else {
                    document.getElementById("wish").placeholder = "当前可以上传语录";
                }
            }
        },
        error: function (err) {
            document.getElementById("wish").placeholder = "上传语录（需要验证权限）";
            removeloading();
        }
    });
})();

// 上传数据，检测权限
updateWords = (words) => {
    // 因为要跳转，所以有makeloading
    makeloading();
    let VerifyData = getCookie("authentication_answer") ? getCookie("authentication_answer") : "{}";
    if (VerifyData == "{}") {
        window.location = answerWeb
        return;
    }
    $.ajax({
        url: checkApi,
        data: unescape(VerifyData),
        type: "POST",
        contentType: "application/json",
        success: function (response, status) {
            if (response.code === 200) {
                removeloading();
                if (!response.data) {
                    window.location = answerWeb;
                } else {
                    // 删掉输入框原有内容
                    document.getElementById("wish").value = "";
                    creatWish(words);
                    submitData(words);
                }
            }
        },
        error: function (err) {
            removeloading();
        }
    });
}