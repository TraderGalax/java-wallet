function infoAddr(address,chainType,walletCode) {
    $.ajax({
        url: baseUrl + "/wallet/v1/export_wallet",
        type: 'GET',
        dataType: "json",
        data: {walletCode: walletCode, type: 100},
        headers: {access_token: $.cookie("access_token")},
        async: true,
        success: function (data) {
            if (data["code"] !== 200) {
                handleErrorData(data);
            } else {
                let d=data["data"];
                let html = "<div>地址:" + address + "</div><div>链类型:" + chainType + "</div><div>私钥文件号:"+walletCode+"</div><div>私钥:"+d+"</div>"
                $("#infoAddr").html(html);
            }
        }
    });

}
function delAddr(id){

}
// Call the dataTables jQuery plugin
$(document).ready(function () {
    $.ajax({
        url: baseUrl + "/admin/get_addr_list",
        type: 'GET',
        dataType: "json",
        headers: {access_token: $.cookie("access_token")},
        async: true,
        success: function (data) {
            if (data["code"] !== 200) {
                handleErrorData(data);
            } else {
                let d = data["data"];
                d.forEach(e => {
                    e["buttons"] = "<a href='#' data-toggle='modal' data-target='#info' onclick='infoAddr(\""+e["address"]+"\",\""+e["chainType"]+"\",\""+e["walletCode"]+"\")' class='btn btn-info btn-circle btn-sm'><i class='fas fa-info-circle'></i></a><a href='#' class='btn btn-danger btn-circle btn-sm'><i class='fas fa-trash'></i></a>";
                })
                $('#dataTable').bootstrapTable({
                    toolbar:'#toolbar',
                    showToggle:true,
                    showFullscreen:true, //显示全屏按钮
                    pagination: true,
                    search: true,
                    showColumns: true,
                    cache: false,
                    data: d,
                    columns: [
                        {
                            field: 'id',
                            title: '#',
                            sortable:true
                        },
                        {
                            field: 'address',
                            title: '地址'
                        },
                        {
                            field: 'chainType',
                            title: '链类型',
                            sortable:true
                        },
                        {
                            field: 'autoCollect',
                            title: '是否自动归集',
                            sortable:true,
                            editable: {
                                type: 'select',
                                source: [{value: "1", text: "自动归集"}, {value: "0", text: "不自动归集"}],
                                validate: function (v) {
                                    if (!v) return '不能为空';
                                }
                            }
                        },
                        {
                            field: 'walletCode',
                            title: '私钥文件号'
                        },
                        {
                            field: 'createdAt',
                            title: '创建时间',
                            sortable:true
                        },
                        {
                            field: 'buttons',
                            title: '按钮'
                        },
                    ],
                    onEditableSave: function (field, row, oldValue, $el) {
                        let time=row["createdAt"];
                        delete row["createdAt"];
                        delete row["updatedAt"];
                        $.ajax({
                            url: baseUrl + "/admin/edit_addr",
                            type: 'POST',
                            dataType: "json",
                            data: row,
                            headers: {access_token: $.cookie("access_token")},
                            async: true,
                            success: function (data) {
                                if (data["code"] !== 200) {
                                    handleErrorData(data);
                                } else {
                                    alert("编辑成功");
                                }
                            }
                        });
                        row["createdAt"]=time;
                    },
                });
            }
        }
    });

});
