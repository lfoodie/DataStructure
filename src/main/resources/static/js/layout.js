/**
 * Created by Radish on 2017/11/17.
 */
/**
 * Created by Radish on 2017/11/17.
 */
$(function () {
    $("#sensor-add-form").Validform({
        tiptype:2,
        beforeSubmit:function(form){
            sensor_add(form);
            return false;
        }
    });

    $("#sensor-search-form").Validform({
        beforeSubmit:function(form){
            sensorTableHandler("#sensor-list-table", sensor_getall_url);
            return false;
        }
    });

});


function sensor_add(form) {

    function sensor_add_success (responseData){
        if(responseData.success){
            swal({
                title: "Good Job!",
                text: responseData.message,
                timer: 1200,
                type: "success"
            }, function () {
                $("#cancel").click();
            });
            $(window.parent.document).find('#btn-refresh')[0].click();
        } else {
            swal({
                title: "Sorry!",
                text: responseData.message,
                timer: 2000,
                type: "error"
            });
        }
    }
    // 如果校验通过了才发起请求
    if(!$("#code").hasClass("code_existed")) {
        common_ajax(form, sensor_add_url, sensor_add_success);
    }
}

function sensor_update(form) {

    function sensor_add_success (responseData){
        if(responseData.success){
            swal({
                title: "Good Job!",
                text: responseData.message,
                timer: 1200,
                type: "success"
            }, function () {
                $("#cancel").click();
            });
            $(window.parent.document).find('#btn-refresh')[0].click();
        } else {
            swal({
                title: "Sorry!",
                text: responseData.message,
                timer: 2000,
                type: "error"
            });
        }
    }
    // 如果校验通过了才发起请求
    if(!$("#code").hasClass("code_existed")) {
        common_ajax(form, sensor_update_url, sensor_add_success);
    }
}

function sensor_del(code) {
    console.log(code);
    function sensor_del_success (responseData){
        if(responseData.success){
            swal({
                title: "Good Job!",
                text: responseData.message,
                timer: 1200,
                type: "success"
            });
            $("#btn-refresh").click();
        } else {
            swal({
                title: "Sorry!",
                text: responseData.message,
                timer: 2000,
                type: "error"
            });
        }
    }
    var data = {
        "code" : code
    };

    function do_del() {
        setTimeout(function () {
            common_ajax(null, sensor_del_url, sensor_del_success, data);
        }, 1200)
    }

    del_diag(code, do_del);
}


function sensorTableHandler(form, url) {
    $(form).prop("width", "100%");
    var colmuns =
        [
            {
                orderable: false,
                data: "id",
                render: function (data, type, row, meta) {
                    return "<span class='label label-default radius orderNum'>" + data + "</span>";
                }
            },
            {
                data: "name",
                render: function (data, type, row, meta) {
                    return "<span >" + data + "</span>";
                }
            },
            {
                data: "hight",
                render: function (data, type, row, meta) {
                    return "<span >" + data + "</span>";
                }
            },
            {
                data: "level",
                render: function (data, type, row, meta) {
                    return "<span >" + data + "</span>";
                }
            },
            {
                data: "order",
                render: function (data, type, row, meta) {
                    return "<span >" + data + "</span>";
                }
            },
            {
                data: "southnorthorwesteast",
                render: function (data, type, row, meta) {
                    if (data == 1) {
                        return "中心走向";
                    }
                    if (data == 2) {
                        return "南北走向";
                    }
                    if (data == 3) {
                        return "东西走向";
                    }
                }
            }];

    var columnDefs =
        [{
            // targets: [-2, -1],
            // "createdCell": function (td, cellData, rowData, row, col) {
            //
            // }
        }];

    var table = $(form).dataTable({
        order: [], //默认没有排序的,在后面指定具体排序的类
        stateSave: true, //允许浏览器缓存Datatables，以便下次恢复之前的状态
        processing: true, //是否显示处理状态
        serverSide: true, //开启服务器模式
        searching: true, //开启搜索功能
        paging: true, //允许表格分页
        lengthChange: true, //允许改变每页显示的数据条数
        autoWidth: true,
        columnDefs: columnDefs,
        destroy: true,
        ajax: {
            type: "post",
            url: domain + url,
            dataType: "json",
            data:{
                "level": $("#level").val(),
                "orientation": $("#orientation").val()
            },
            dataSrc: function (result) {
                if (result.success) {
                    $("#totalRecoreds").text(result.recordsFiltered);
                    return result.data;
                } else {
                    swal({
                        title: "Sorry!",
                        text: result.message,
                        timer: 2000,
                        type: "error"
                    });
                    return false;
                }
            },
            timeout: 10000,
            error: function () {
                swal({
                    title: "Sorry!",
                    text: "网络忙,请稍后再试",
                    timer: 2000,
                    type: "error"
                });
            }
        },
        columns: colmuns,
        "preDrawCallback": function () {
            $(".dataTables_filter").hide();
        },
        "initComplete": function (settings, json) {
        },
        "createdRow": function (row, data, index) {
            $(row).find(".orderNum").text((index+1));
            $(row).addClass("text-c");
            $(row).on("click", function () {
                swal({
                        title: "修改",
                        text: "修改为：",
                        type: "input",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        animation: "slide-from-top"
                    },
                    function(inputValue){
                        if (inputValue === false) return false;

                        if (inputValue === "") {
                            swal.showInputError("输入内容不能为空！");
                            return false
                        }

                        swal("好样的！", "更新成功","success");
                    });
            });
        }
    });
    return table;
}