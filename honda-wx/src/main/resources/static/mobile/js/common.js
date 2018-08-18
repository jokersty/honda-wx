/*自制插件*/
$("#container").append(
    '<div id="loadingToast" class="weui-toast-font" style="display: none;">' +
    '<div class="weui-mask_transparent"></div>' +
    '<div class="weui-toast">' +
    '<i class="weui-loading weui-icon_toast"></i>' +
    '<p class="weui-toast__content" id="loadingText"></p>' +
    '</div>' +
    '</div>');
$("#container").append(
    '<div id="dialogs" class="weui-toast-font" >\n' +
    ' <!--BEGIN dialog1-->\n' +
    '<div class="js_dialog" id="iosDialog1" style="display: none;">\n' +
    '<div class="weui-mask"></div>\n' +
    '<div class="weui-dialog">\n' +
    '<div class="weui-dialog__hd" id="dialogHd"><strong class="weui-dialog__title" id="dialogTitle">提示</strong></div>\n' +
    '<div class="weui-dialog__bd" id="dialogBd"></div>\n' +
    '<div class="weui-dialog__ft">\n' +
    '<a href="javascript:;" style="display: none;" class="weui-dialog__btn weui-dialog__btn_default" id="weui-dialog-cancel">取消</a>\n' +
    '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" id="weui-dialog-confirm">确定</a>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div>\n' +
    '</div>');
$("#container").append('    <div id="warnToast" class="weui-toast-font" style="display: none; ">\n' +
    '        <div class="weui-mask_transparent"></div>\n' +
    '        <div class="weui-toast">\n' +
    '            <img class="weui-toast-warn" src="img/warning.png"/>\n' +
    '            <p class="weui-toast__content" id="toastContent">服务器错误</p>\n' +
    '        </div>\n' +
    '    </div>');
$.extend({
    showLoading: function showLoading(text) {
        if (!text || text == "") {
            text = "数据加载中"
        }
        ;
        $("#loadingText").text(text);
        $("#loadingToast").show();
    },
    hideLoading: function hideLoading() {
        $("#loadingToast").hide();
    },
    alert: function alert(data, cancel) {
        this.hideLoading();
        if (cancel && cancel == 1) {
            $("#weui-dialog-cancel").show();
        }
        if (data.title && data.title != "") {
            $("#dialogTitle").text(data.title);
        }
        if (data.content && data.content != "") {
            $("#dialogBd").text(data.content);
        } else {
            $("#dialogTitle").text(data);
        }
        $("#weui-dialog-confirm").click(function () {
            $("#iosDialog1").hide();
        });
        $("#weui-dialog-cancel").click(function () {
            $("#iosDialog1").hide();
        });
        $("#iosDialog1").show();
    },
    //时间选择器
    date: function date(id) {
        weui.datePicker({
            start: 2015,
            end: 2022,
            onChange: function (result) {
                console.log(result);
            },
            onConfirm: function (result) {
                result = result[0] + "-" + result[1] + "-" + result[2];
                $(id).val(result);
            }
        });
    },
    //warn
    warn: function warn(msg, time) {
        if (time == null || time == "" || !time) {
            time = 1500;
        }
        this.hideLoading();
        if (msg == null || msg == "" || !msg) {
            msg = "未知错误"
        }
        ;
        $("#toastContent").text(msg);
        var $toast = $('#warnToast');
        if ($toast.css('display') != 'none') return;
        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, time);
    },
    /*取url参数*/
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
})


