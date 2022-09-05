function resolveData(data) {
    var arr = []
    for (var k in data) {
        var str = k + '=' + data[k]
        arr.push(str)
    }
    return arr.join('&')
}

// var res = resolveData({
//     name: 'zs',
//     age: 20
// })
// console.log(res);


function itheima(options) {
    var xhr = new XMLHttpRequest()
        //把外界传来的参数对象转化为查询字符串
    var qs = resolveData(options.data)
        //判断请求类型，当使用toUpperCase()将其转化为大写后，判断是否符合等于GET，是的话则发起GET请求
    if (options.method.toUpperCase() === 'GET') {
        xhr.open(options.method, options.url + '?' + qs)
        xhr.send()
            //判断请求类型，当使用toUpperCase()将其转化为大写后，判断是否符合等于POST，是的话则发起POST请求
    } else if (options.method.toUpperCase() === "POST") {
        xhr.open(options.method, options.url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.send(qs)
    }


    //监听请求状态改变的事件
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}