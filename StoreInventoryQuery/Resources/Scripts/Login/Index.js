$(function () {
    $("#loginbtn").click(function () {
        var name = $("#name").val();
        var pwd = $("#pwd").val();
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
            name:name,
            pwd:pwd
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
            }
            
            var data = sessionStorage.getItem('storeid');
            console.log(data);
            if (data == null || data == undefined) {
                sessionStorage.setItem('storeid', result.data);
            } else {
                sessionStorage.removeItem('storeid');
                sessionStorage.setItem('storeid', result.data);
            }

            var data2 = sessionStorage.getItem('storeid');
            console.log(data2);



        });






    });




























})