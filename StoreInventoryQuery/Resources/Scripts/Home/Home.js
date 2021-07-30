$(function () {
    var _SKUSS = "";
    $("#sku").focus();
    $(".storename").html("本店库存（" + sessionStorage.getItem('storename') + "）");

    $("#sku").keyup(function (eu) {
        var keyUpCode = eu.keyCode || eu.which;
        console.log(keyUpCode);
        if (keyUpCode !== 13) {
            _onlykeup = 0;
            return;
        }
        goodsfc();
    });

    $("#sel").click(function () {
        goodsfc();
    })
    $(".inputclose").click(function () {
        console.log(1111);
        $("#sku").focus()
        $("#sku").val("")
        $("#sku2").val("");
        $("#skulabel").show()
        $(".seldivno").hide();

    })


    var goodsfc = function () {
        console.log(window.navigator.onLine);
        if (window.navigator.onLine) {//在线
            //这里写你自己执行的请求方法

            var sku = $("#sku").val();
            if (sku == "" || sku == undefined) {
                swal({
                    title: '请输入货号',
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "OK"
                });
                return;
            } else {

                var skuss = _SKUSS;
                console.log(skuss);
                if (skuss == sku.substring(0, 9) || skuss == undefined || skuss == "") {
                    console.log(111);
                    sku = sku.replace(skuss, "").substring(0, 9);
                    _SKUSS = sku

                } else {
                    sku = sku.substring(0, 9);
                }
                $("#sku").val(sku);

                var data2 = sessionStorage.getItem('storeid');
                var poj = {
                    sku: sku,
                    code: data2
                }
                $.post("/Home/SelSku", poj, function (result) {
                    if (!result.code) {
                        swal({
                            title: '错误SKU',
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "OK"
                        });
                        return;
                    }
                    var html = "";
                    $(result.data).each(function (i, n) {



                        $(".goodsname").html(n.name);
                        $(".storename").html("" + n.storename + "");

                        html += " <table> <tbody> <tr>   <td rowspan='3'>  <img src='" + n.img + "' />  </td>  <td> <label>" + n.name + "</label>   </td> <td>实际库存：" + n.qty + "</td> </tr>"
                        html += "  <tr>  <td>" + n.colorcode + "-" + n.color + "/" + n.size + "</td>  <td>可用库存：" + n.vqty + "</td>  </tr>";
                        html += " <tr> <td>" + n.storename + "</td>  <td>占用库存：" + n.yqty + "</td> </tr> </tbody>  </table>";
                        //html += "<tr><td>" + n.color + "</td>";
                        //html += "<td>" + n.size + "</td>";
                        //html += "<td>" + n.qty + "</td>";
                        //html += "<td>" + n.vqty + "</td>";
                        //html += "<td>" + n.yqty + "</td></tr>";

                    });
                    $(".storeinfo").html(html);



                    //$("#sku2").val(" " + sku);
                    //$("#skulabel").hide()
                    //$(".seldivno").show();
                    $('.goodsinfo').show();


                });



            }

        } else {
            swal({
                title: '网络不给力，请检查网络设置',
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "OK"
            });
        }
    }


    $(".back").click(function () {
        var display = $('.goodsinfo').css('display');
        if (display == 'none') {
            location.assign("/Navigation/Index"); $(function () {
                var _SKUSS = "";
                $("#sku").focus();
                $(".storename").html("本店库存（" + sessionStorage.getItem('storename') + "）");

                $("#sku").keyup(function (eu) {
                    var keyUpCode = eu.keyCode || eu.which;
                    console.log(keyUpCode);
                    if (keyUpCode !== 13) {
                        _onlykeup = 0;
                        return;
                    }
                    goodsfc();
                });

                $("#sel").click(function () {
                    goodsfc();
                })
                $(".inputclose").click(function () {
                    console.log(1111);
                    $("#sku").focus()
                    $("#sku").val("")
                    $("#sku2").val("");
                    $("#skulabel").show()
                    $(".seldivno").hide();

                })


                var goodsfc = function () {
                    console.log(window.navigator.onLine);
                    if (navigator.onLine) {//在线
                        //这里写你自己执行的请求方法

                        $.ajax({
                            url: 'http://kccx.gloria.com.cn:8082/Home/get',
                            success: function (result) {

                            },
                            error: function (result) {
                                swal({
                                    title: '网络不给力，请检查网络设置',
                                    text: "",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: "OK"
                                });
                            }
                        });

                        var sku = $("#sku").val();
                        if (sku == "" || sku == undefined) {
                            swal({
                                title: '请输入货号',
                                text: "",
                                type: "warning",
                                showCancelButton: true,
                                cancelButtonText: "OK"
                            });
                            return;
                        } else {

                            var skuss = _SKUSS;
                            console.log(skuss);
                            if (skuss == sku.substring(0, 9) || skuss == undefined || skuss == "") {
                                console.log(111);
                                sku = sku.replace(skuss, "").substring(0, 9);
                                _SKUSS = sku

                            } else {
                                sku = sku.substring(0, 9);
                            }
                            $("#sku").val(sku);

                            var data2 = sessionStorage.getItem('storeid');
                            var poj = {
                                sku: sku,
                                code: data2
                            }
                            $.post("/Home/SelSku", poj, function (result) {
                                if (!result.code) {
                                    swal({
                                        title: '错误SKU',
                                        text: "",
                                        type: "warning",
                                        showCancelButton: true,
                                        cancelButtonText: "OK"
                                    });
                                    return;
                                }
                                var html = "";
                                $(result.data).each(function (i, n) {



                                    $(".goodsname").html(n.name);
                                    $(".storename").html("" + n.storename + "");

                                    html += " <table> <tbody> <tr>   <td rowspan='3'>  <img src='" + n.img + "' />  </td>  <td> <label>" + n.name + "</label>   </td> <td>实际库存：" + n.qty + "</td> </tr>"
                                    html += "  <tr>  <td>" + n.colorcode + "-" + n.color + "/" + n.size + "</td>  <td>可用库存：" + n.vqty + "</td>  </tr>";
                                    html += " <tr> <td>" + n.storename + "</td>  <td>占用库存：" + n.yqty + "</td> </tr> </tbody>  </table>";
                                    //html += "<tr><td>" + n.color + "</td>";
                                    //html += "<td>" + n.size + "</td>";
                                    //html += "<td>" + n.qty + "</td>";
                                    //html += "<td>" + n.vqty + "</td>";
                                    //html += "<td>" + n.yqty + "</td></tr>";

                                });
                                $(".storeinfo").html(html);



                                //$("#sku2").val(" " + sku);
                                //$("#skulabel").hide()
                                //$(".seldivno").show();
                                $('.goodsinfo').show();


                            }).fail(function () {
                                swal({
                                    title: '网络不给力，请检查网络设置',
                                    text: "",
                                    type: "warning",
                                    showCancelButton: true,
                                    cancelButtonText: "OK"
                                });
                            });



                        }

                    } else {
                        swal({
                            title: '网络不给力，请检查网络设置',
                            text: "",
                            type: "warning",
                            showCancelButton: true,
                            cancelButtonText: "OK"
                        });
                    }
                }


                $(".back").click(function () {
                    var display = $('.goodsinfo').css('display');
                    if (display == 'none') {
                        location.assign("/Navigation/Index");
                    } else {
                        location.assign("/Home/Index");
                    }
                })



            });
        } else {
            location.assign("/Home/Index");
        }
    })



});