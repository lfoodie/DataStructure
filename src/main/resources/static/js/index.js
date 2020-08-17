/**
 * Created by Radish on 2017/11/9.
 */

$(function () {
    temp_list();
    $("#temp_add").click(function () {
        temp_add();
    });
    $("#temp_list").click(function() {
        temp_list();
    });
    $("#layout_list").click(function() {
        layout_list();
    });
    $("#sensor_add").click(function() {
        sensor_add();
    });
});


function temp_add() {
    $("#mainbody").attr("src", 'temp-add.html');
}

function temp_list() {
    $("#mainbody").attr("src", 'temp-list.html');
}

function layout_list() {
    $("#mainbody").attr("src", 'layout-list.html');
}
function sensor_add() {
    $("#mainbody").attr("src", 'sensor-add.html');
}