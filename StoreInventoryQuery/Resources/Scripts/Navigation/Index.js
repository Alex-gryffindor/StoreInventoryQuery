$(function () {
    $("*").click(function (event) {
        event.stopPropagation();
        var targetId = $(this).attr("id");
        ////临时屏蔽除静态盘点外其他菜单
        //if (targetId.indexOf('staticTakeStock')===-1) {
        //    return false;
        //}
        console.log(targetId);
        if (targetId == "storesel" || targetId == "storesellast" || targetId == "storeselimgdiv" || targetId == "storeselimg" || targetId == "storeseltitle") {
            ToStoreSel();

        } else if (targetId == "back" || targetId == "backimg") {
            ToLogin();

        } else { };

    });


    function ToStoreSel() {
        location.assign("/Home/Index");
    }

    function ToLogin() {

        location.assign("/Login/Index");

    };










})