$(function() {
    //每次刷新页面都会重新加载本地数据
    load();

    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                //先读取原来本地数据
                var local = getDate();
                // 把local数组进行更新数据，把最新的数据追加给local数组
                local.push({ title: $(this).val(), done: false });
                //把这个数组local存储给本地存储
                saveDate(local);
                //本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });

    // 删除操作
    $("ol, ul").on("click", "a", function() {
        //先获取本地存储
        var data = getDate();
        // 修改数据
        var index = $(this).attr("id");
        //先删除数据使用splice（从哪里开始，删除几个）；
        data.splice(index, 1);
        //保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    //
    $("ol, ul").on("click", "input", function() {
        //先获取本地存储数据
        var data = getDate();
        //修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        //保存到本地存储
        saveDate(data);
        //重新渲染一下页面
        load();
    });

    //读取本地存储数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            //本地字符里面数据是字符串格式的，但是我们需要的是对象格式的数据
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    //渲染加载数据
    function load() {
        // 读取本地存储数据
        var data = getDate();
        // 遍历之前需要清空ol,ul里面的元素内s容
        $("ol, ul").empty();
        var todoCount = 0; //正在进行的个数
        var doneCount = 0; //已经完成的个数
        //遍历这个数据
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked = 'checked'> <p>" + n.title + "</p> <a href='javascript:;' id = " + i + "></a> </li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id = " + i + "></a> </li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})