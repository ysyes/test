/*
 * 封装ajax
 * method: 请求方式 GET/POST
 * url: 请求路径
 * data: 参数
 * successCallBackFn: 响应成功回调函数
 * failCallBackFn: 响应失败回调函数
 */
function ajaxFn (method, url, data, successCallBackFn, failCallBackFn) {
	var xhr;
	//创建请求对象
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		var versions = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		for (var i = 0; i < versions.length; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			} catch (e) {
				console.log(e);
			}
		}
	} else {
		//创建一个错误对象
		//throw 是主动抛出一个异常错误
		throw new Error("浏览器不支持AJAX");
	}
	
	//打开链接 和 发送请求
	if (method == "GET" || method == "get") {
		//利用ajax GET请求会有缓存，为了避免每次访问的路径不一样。我们可以在
		//url后面加上 Math.random()来解决。
		xhr.open(method, url + "?" + data + Math.random(), true);
		xhr.send(null);
	} else if (method == "POST" || method == "post") {
		xhr.open(method, url, true);
		//post请求需要设置请求头
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);
	} else {
		console.log("请求方式不对！");
	}
	
	//请求响应结果
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 ) {
			if (xhr.status == 200) {
				//回调成功的函数
				successCallBackFn(xhr.responseText);
			} else {
				//失败
				failCallBackFn("失败！");
			}	
		}
	}
	
	return xhr;
}
