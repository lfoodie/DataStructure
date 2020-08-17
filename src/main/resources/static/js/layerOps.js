/**
 * Created by Radish on 2017/11/10.
 */


$(function () {
    $("#cancel").click(function () {
        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
        parent.layer.close(index); //再执行关闭
    });
});

function del_diag() {
    layer.confirm('是否删除？', {icon: 3, title:'提示'}, function(index){
        //do something
        layer.close(index);
    });
}

/**
 *
 * @param title
 * @param url
 * @param id 这里的id表示父页面传入来的数据
 * @param func 这里的func是回调函数，layer打开成功后调用。
 * @param w
 * @param h
 */
function layer_show(title, url, id, func, w, h) {
    if (title == null || title == '') {
        title=false;
    };
    if (w == null || w == '') {
        w=800;
    };
    if (h == null || h == '') {
        h=($(window).height() - 100);
    };
    layer.open({
        type: 2,
        area: [w+'px', h +'px'],
        fix: false, //不固定
        maxmin: true,
        shade:0.4,
        title: title,
        content: url,
        success: function (layero, index) {
            if(id != null && func != null) {
                console.log(id);
                console.log(func);
               func(id);
            }
            // var $id = layer.getChildFrame('#id', index);
            // $id.val(id);
            // var $code = layer.getChildFrame('#code', index);
            // //这里的id指的是code,比如coursecode
            // $code.val(id);
            // layer.getChildFrame('#loadStudentData', index).click();
        }
    });

}
