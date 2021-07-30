$(function () {

    console.log($.cookie("name"))
    if ($.cookie("name") != null || $.cookie("name") != undefined) {
        $("#name").val($.cookie("name"))
        $("#pwd").val($.cookie("pwd"))
        $(".ck").attr("checked","checked");
    }



    //$("#name").focus(function () {
    //    a = $(window).height();
        
    //    $('.imgtxt').css('background-size', a + 'px ' + a + 'px');

    //})
    //$("#pwd").focus(function () {
    //    a = $(window).height();
    //    $('.imgtxt').css('background-size', a + 'px ' + a + 'px');

    //})

    $("#loginbtn").click(function () {

        console.log($.cookie("name"))
        console.log(111111)
        var name = $("#name").val();
        var pwd = $("#pwd").val();
       

        console.log($(".ck").prop("checked"))
        if ($(".ck").prop("checked")) {
            $.cookie('name', name, { expires: 30 });
            $.cookie('pwd', pwd, { expires: 30 });
            console.log($.cookie("name"))
        } else if ($.cookie("name") != null || $.cookie("name") != undefined) {
            console.log($.cookie("name"))
            $.cookie('name', null);
            $.cookie('pwd', null);
        }


        if (name == "" || name == undefined) {
            swal({
                title: '账号不能为空',
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "OK"
            });

            return;
        }
        if (pwd == "" || pwd == undefined) {
            swal({
                title: '密码不能为空',
                text: "",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "OK"
            });
            return;
        }
        var poj = {
            name: name,
            pwd: pwd
        };
        $.post("/Login/Login", poj, function (result) {
            if (!result.code) {
                swal({
                    title: result.msg,
                    text: "",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "OK"
                });
                return;
            }

            var data = sessionStorage.getItem('storeid');
            console.log(data);
            if (data == null || data == undefined) {
                sessionStorage.setItem('storeid', result.data.code);
                sessionStorage.setItem('storename', result.data.storename);
            } else {
                sessionStorage.removeItem('storeid');
                sessionStorage.removeItem('storename');
                sessionStorage.setItem('storeid', result.data.code);
                sessionStorage.setItem('storename', result.data.storename);
            }

            location.assign("/Navigation/Index");
            //var data2 = sessionStorage.getItem('storeid');
            //console.log(data2);



        });






    });




























})