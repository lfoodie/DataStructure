/**
 * Created by Radish on 2017/11/17.
 */

var url = document.URL;//获取当前页面的URL
var domain = url.match(/http[s]?:\/\/(.*?)([:\/]|$)/);//匹配指定URL的domain

function getDomain() {
    return domain[0] + "8080/tempMonitor/";
}

var domain = getDomain();

var sensor_add_url = 'sensor/addBatch';
var sensor_update_url = 'sensor/update';
var sensor_del_url = 'sensor/del';
var sensor_getall_url = 'sensor/all';

var temp_add_url = 'temp/add';
var temp_update_url = 'temp/update';
var temp_getall_url = 'temp/all';
var temp_undo_url = 'temp/undo';


function common_ajax(form, url, successFunction, data, ansy) {
    console.log(domain + url);
    if(ansy == null || ansy == undefined) {
        ansy = true;
    }
    var formdata;
    if (data == null && form != null) {
        formdata = form.serialize();
    } else {
        formdata = data;
    }
    $.ajax({
        type:"post",
        url: domain + url,
        timeout: 15000,
        data: formdata,
        // xhrFields:{
        //     withCredentials:true
        // },
        ansy: ansy,
        success:successFunction,
        error:function(){
            swal({
                title: "Sorry!",
                text: "服务器繁忙, 请稍后再试",
                timer: 2000,
                type: "error"
            });
        }
    });
}
function del_diag(data, func) {
    swal({
            title: "删除 " + data + " 记录?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
        function(isConfirm){
            if (isConfirm) {
                func();
            }
        });
}


var cookie = {
    set:function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time*24*3600*1000;  //将date设置为n天以后的时间
        date.setTime(date.getTime()+expiresDays); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    setms:function(key,val,time){//设置cookie方法
        var date=new Date(); //获取当前时间
        var expiresDays=time;  //将date设置为ms
        date.setTime(date.getTime()+expiresDays); //格式化为cookie识别的时间
        document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
    },
    get:function(key) {//获取cookie方法
        /*获取cookie参数*/
        var getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
        var arrCookie = getCookie.split(";");  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
        for (var i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
            var arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
            var result;
            if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
                result = arr[1];   //将cookie的值赋给变量tips
                break;   //终止for循环遍历
            }
        }
        return result;
    },
    delete:function(key){ //删除cookie方法
        var date = new Date(); //获取当前时间
        date.setTime(date.getTime()-10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" +date.toGMTString();//设置cookie
    }
};