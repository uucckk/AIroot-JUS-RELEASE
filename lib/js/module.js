/**
 * @author sunxy
 * @email	uucckk@163.com
 * @version 0.9.1
 * http://www.airoot.cn/
 * @modify date '2018-12-18';
 */

"use strict";


String.prototype.trim=function(){
	return this.replace(/(^\s*)|(\s*$)/g, "");
}

Date.prototype._METHOD_ = {
	_label:"Date 方法说明",
	"format" : {value:"设置日期显示格式.例如 format('yyyy-MM-dd') 其显示内容为：2015-09-07"},
	"offsetDate" : {value:"设置日偏移量.例如 offsetDate(+1) 表示显示当天日期的下一天"},
	"offsetMonth" : {value:"设置日期显示格式.例如 format('yyyy-MM-dd') 其显示内容为：2015-09-07"},
	"offsetDay" : {value:"设置日期显示格式.例如 format('yyyy-MM-dd') 其显示内容为：2015-09-07"},
};
Date.prototype.format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
Date.prototype.offsetDate = function(offset){
	this.setDate(this.getDate() + offset);
	return this;
}

Date.prototype.offsetYear = function(offset){
	this.setYear(this.getFullYear() + offset);
	return this;
}

Date.prototype.offsetMonth = function(offset){
	this.setMonth(this.getMonth() + offset);
	return this;
}

Date.prototype.offsetDay = function(offset){
	this.setDay(this.getDay() + offset);
	return this;
}


Date.prototype.Date = function(date){
	this.setDate(date);
	return this;
}



function trace(){
	var value = "";
	var arr = null;
	for(var i = 0;i<arguments.length;i++){
		value += "[" + i + "]";
		if(typeof(arguments[i]) == 'array'){
			arr = arguments[i];
			for(var j = 0;j<arr.length;j++){
				value += arr[j] + ',';
			}
			value = value.subtring(0,value.length - 1);
			continue;
		}
		value += arguments[i] + " ";
	}
	alert(value);
}

/**
 * asjs API 封装包
 */
var asjs = new function(){
	var __handle__ = [];
	
	/**
	 * 获取域名表示
	 * @param name 编译后的元素id字符串名字
	 */
	this.getDomain = function(name){
		var len = name.length;
		var tmp = null;
		for(var i = len - 1;i>=1;i--){
			tmp = name.substring(0,i);
			if(window[tmp]){
				return tmp;
			}
		}
		return name;
	}
	
	/**
	 * 获取name的原始名字
	 */
	this.getMName = function(name){
		var len = name.length;
		var tmp = null;
		for(var i = len - 1;i>=1;i--){
			tmp = name.substring(0,i);
			//if(window[tmp]){
				//alert(window[tmp] + "");
			//}
			if(window[tmp] && typeof(window[tmp]) == 'object' && (window[tmp] + '').indexOf('[object HTML') == -1){
				return name.substring(i); 
			}
		}
		return name;
	}
	
	this.decodeScript = function(codeValue){
    	var code = '';
        jsdecoder = new JsDecoder();
        jscolorizer = new JsColorizer();

        jsdecoder.s = codeValue;

        code = jsdecoder.decode();
        
		
		code = code.replace(/&/g, "&amp;");
        code = code.replace(/</g, "&lt;");
        code = code.replace(/>/g, "&gt;");
        jscolorizer.s = code;
        try {
            code = jscolorizer.colorize();
        } catch (e) {
            $('msg').innerHTML += 'error<br><br>'+new String(e).replace(/\n/g, '<br>');
            return;
        }
       
        code = new String(code);
        code = code.replace(/(\r\n|\r|\n)/g, "<br>\n");
        code = code.replace(/<font\s+/gi, '<font@@@@@');
        code = code.replace(/( |\t)/g, '&nbsp;');
        code = code.replace(/<font@@@@@/gi, '<font ');

        code = code.replace(/\n$/, '');

        var count = 0;
        var pos = code.indexOf("\n");
        while (pos != -1) {
           count++;
           pos = code.indexOf("\n", pos+1);
        }
        count++;

        pad = new String(count).length;
        var lines = '';

        for (var i = 0; i < count; i++) {
            var p = pad - new String(i+1).length;
            var no = new String(i+1);
            for (k = 0; k < p; k++) { no = '&nbsp;'+no; }
            no += '&nbsp;';
            lines += '<div style="background: ' + '#333333' + '; color: #f0f0f0;margin-right:5px;">'+no+'</div>';
        }


        return "<table><tr><td>" + lines + "</td><td>" + code + "</td></tr></table>"; 
      
	}
	/**
 	 *	看看存不存在此对象
 	 * @param name		判断标示
 	 * @param obj		判断对象
 	 * @return			如果存在返回true,否则返回false;
 	 */
	this.HAVE = function (name,obj){
		if(name != null && document.getElementById(name) != undefined){
			alert("The Id [" + name + "] is exist.");
			return false;
		}
		try{
			obj = typeof(eval(obj))
			if(obj == "undefined"){
				return false;
			}
			alert("The Object " + name + "[" + obj + "] is exist.");
			return true;
		}catch(e){
			return false;
		}
	};
	
	
	/**
	 * 继承操作函数代码
	 */
	this.extendCode = function(father){
		var code = father.constructor.toString();
		var start = code.indexOf('{') + 1;
		var end = code.lastIndexOf('}');
		return code.substring(start,end);
	}//extendCode
	
	/**
	 * 继承父类的属性
	 */
	this.extend = function (dest,src){
		for (var p in src) { 
	        dest[p] = src[p]; 
	    } 
	    return dest;
	};
	
	//Pull out only certain bits from a very large integer, used to get the time
	//code information for the first part of a UUID. Will return zero's if there
	//aren't enough bits to shift where it needs to.
	var getIntegerBits = function(val,start,end){
	 var base16 = returnBase(val,16);
	 var quadArray = new Array();
	 var quadString = '';
	 var i = 0;
	 for(i=0;i<base16.length;i++){
	     quadArray.push(base16.substring(i,i+1));   
	 }
	 for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
	     if(!quadArray[i] || quadArray[i] == '') quadString += '0';
	     else quadString += quadArray[i];
	 }
	 return quadString;
	};
	
	//Replaced from the original function to leverage the built in methods in
	//JavaScript. Thanks to Robert Kieffer for pointing this one out
	var returnBase = function(number, base){
	 return (number).toString(base).toUpperCase();
	};
	
	 
	
	//pick a random number within a range of numbers
	//int b rand(int a); where 0 <= b <= a
	var rand = function(max){
	 return Math.floor(Math.random() * (max + 1));
	};
	
	/**
	 * uuid 
	 */
	this.uuid = function(len, radix) { 
		//
	    // Loose interpretation of the specification DCE 1.1: Remote Procedure Call
	    // since JavaScript doesn't allow access to internal systems, the last 48 bits
	    // of the node section is made up using a series of random numbers (6 octets long).
	    // 
	    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
	    var dc = new Date();
	    var t = dc.getTime() - dg.getTime();
	    var tl = getIntegerBits(t,0,31);
	    var tm = getIntegerBits(t,32,47);
	    var thv = getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
	    var csar = getIntegerBits(rand(4095),0,7);
	    var csl = getIntegerBits(rand(4095),0,7);
	
	    // since detection of anything about the machine/browser is far to buggy,
	    // include some more random numbers here
	    // if NIC or an IP can be obtained reliably, that should be put in
	    // here instead.
	    var n = getIntegerBits(rand(8191),0,7) +
	            getIntegerBits(rand(8191),8,15) +
	            getIntegerBits(rand(8191),0,7) +
	            getIntegerBits(rand(8191),8,15) +
	            getIntegerBits(rand(8191),0,15); // this last number is two octets long
	    return tl + tm  + thv  + csar + csl + n;
	};
	

	
	
	
	/**
	 * 将元素节点复制一份
	 */
	this.copy = function(obj){
		return obj.cloneNode(true);
	}
	
	
	/**
	 * 加载函数
	 */
	this.load = function(url,compEvt,data,dataType){
		compEvt = compEvt ? compEvt :function(e){};
		data = data ? data : null;
		var ul = new URLLoader();
		var req = new URLRequest(url);
		req.method = URLRequestMethod.POST;
		req.data= data;
		req.dataType = dataType;//json,text,or null
		ul.addEventListener(Event.COMPLETE,compEvt);
		ul.load(req);
		if(data){data.url = url};
		return data;
	};
	
	/**
	 * 加载函数
	 */
	this.get = function(url,compEvt,data){
		compEvt = compEvt ? compEvt :function(e){};
		data = data ? data : null;
		var ul = new URLLoader();
		var req = new URLRequest(url);
		req.method = URLRequestMethod.GET;
		req.data= data;
		ul.addEventListener(Event.COMPLETE,compEvt);
		ul.load(req);
		if(data){data.url = url};
		return data;
	};
	
	/**
	 * 返回URLLoader
	 */
	this.url = function(url,compEvt,data){
		compEvt = compEvt ? compEvt :function(e){};
		data = data ? data : null;
		var ul = new URLLoader();
		var req = new URLRequest(url);
		req.method = URLRequestMethod.GET;
		req.data= data;
		ul.addEventListener(Event.COMPLETE,compEvt);
		ul.load(req);
		return ul;
	};
	
	
	/**
	 * @param 	domain
	 * @url		域名
	 * @compEvt	回调函数
	 * @data	数据
	 */
	this.handle = function(domain,url,compEvt,data){
		compEvt = compEvt ? compEvt :function(e){};
		data = data ? data : null;
		var ul = new URLLoader(domain);
		var req = new URLRequest(url);
		req.method = URLRequestMethod.GET;
		req.data= data;
		ul.addEventListener(Event.COMPLETE,compEvt);
		ul.load(req);
		__handle__.push({domain:domain,ul:ul});
		return ul;
	};
	
	/**
	 * 关闭所有域名下的链接
	 */
	this.closeHandle = function(domain){
		var p = null;
		for(var i = __handle__.length - 1;i>=0;i--){
			p = __handle__[i];
			if(!domain || p.domain == domain){
				p.ul.close();
				__handle__.splice(i,1);
			}
		}
	}
	
	this.send = this.load;
	this.post = this.load;
	
	

}();












var URLRequestMethod = {GET:"get",POST:"post"};
var Event = {COMPLETE:"complete"};
var IOErrorEvent = {IO_Error:"ioError"};
/**
 *
 */
function URLRequest(url){
	//url
	this.URL = url;
	//执行方法，例如使用post方法还是用get方法
	this.method = URLRequestMethod.GET;
	//需要传递的数据，如果method == get ，此方法不生效。
	this.data = null;
}

/**
 * URLLoader 加载数据的请求
 */
function URLLoader(id){
	var req = null;
	var COMP_FUN = null;
	var IOERROR_FUN = null;
	//常量参数
	var READY_STATE_UNINITIALIZED = 0;
	var READY_STATE_LOADING = 1;
	var READY_STATE_LOADED = 2;
	var READY_STATE_INTERACTIVE = 3;
	var READY_STATE_COMPLETE = 4;
	var target = this;
	//最终获得的数据
	this.data = null;
	//加载函数
	this.load = function(urlRequest){
		if(urlRequest instanceof URLRequest){
			req = getRequest();
			if(req){
				req.onreadystatechange = onReadyState;
				var tmp = "";
				if(urlRequest.data != null && urlRequest.dataType != "json" && urlRequest.dataType != "text"){//既不是json，也不是text
					if(typeof(urlRequest.data) == 'string'){
						tmp = urlRequest.data;
						
					}else if(typeof(urlRequest.data) == 'object'){
						for(var p in urlRequest.data){
							var lst = urlRequest.data[p];
							if(lst instanceof Array){
								for(var t = 0;t<lst.length;t++){
									tmp += (p + '=' + encodeURIComponent(lst[t]) + '&');
								}
								continue;
							}
							tmp += (p + '=' + encodeURIComponent(lst) + '&');
						}
					}
				}
				if(urlRequest.method == URLRequestMethod.POST){
					req.open("POST",urlRequest.URL,true);
					req.withCredentials = true;
					//req.setRequestHeader("Content-Length",tmp.length);	
					if(urlRequest.dataType == "json"){
						req.setRequestHeader("Content-Type","application/json;charset=UTF-8");
						tmp = JSON.stringify(urlRequest.data);
					}else if(urlRequest.dataType == "text"){
						req.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
					}else{
						req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
					}
					
					req.send(tmp);
				}
				else if(urlRequest.method == URLRequestMethod.GET){
					var urlTmp = urlRequest.URL;
					if(urlTmp.indexOf('?') != -1){
						urlTmp += '&' + tmp;
					}else{
						urlTmp += '?' + tmp;
					}
					req.open(urlRequest.method,urlTmp,true);
					req.withCredentials = true;
					req.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
					req.send();
				}
				
			}
		}else{
			throw "URLLoader::load(): The Value isn't URLRequest";
		}
	}
	//时间侦听器 
	this.addEventListener = function(type,listener,useCapture){
		switch(type){
			case Event.COMPLETE :
				COMP_FUN = listener;
			break;
			case IOErrorEvent.IO_Error :
				IOERROR_FUN = listener;
			break;
			default :
				throw "URLLoader::addEventListner(): no this type";
		}
	};//addEventListener
	
	this.close = function(){
		if(req){
			if(req.readyState != READY_STATE_COMPLETE){
				req.abort();
			}
			req = null;
			//console.log("...................close");
		}

	};
	
	/**
	 * 获取连接异常
	 */
	function getRequest(){
		var xRequest = null;
		if(window.XMLHttpRequest){
			xRequest = new XMLHttpRequest();
		}else if(window.ActiveXObject){
			xRequest = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xRequest;
	}
	
	function onReadyState(){
		var ready = req.readyState;
		if(ready == READY_STATE_COMPLETE){
			if(req.status == "200"){
				target.data = req.responseText;
				if(COMP_FUN != null){
					req = null;
					COMP_FUN({type:Event.COMPLETE,target:target,id:id});
				}
			}else{
				if(IOERROR_FUN != null){
					req = null;
					IOERROR_FUN({type:IOErrorEvent.IO_Error,target:target,id:id});
				}
			}
			
		}
	}
}//URLLoader
(function(){
	//浏览器版本检测
	var __NAVI__ = navigator.appName;
	var __VERS__ = navigator.appVersion;

	//初始实例化
	var __POS_VALUE__ = null;
	var __WINDOW__ = {};//全局静态函数总和

	var __MODULE_LIST__ = {};
	var __MODULE_COMMAND_LIST__ = {};//模块命令列表
	var __MODULE_INIT__ = {};
	var __MODULE_METHOD__ = {};//模块方法
	var __MODULE_EXTEND__ = {};//模块扩展方法
	var __MODULE_RUNLIST__ = {};//模块初始化项目
	//styleSheets
	var __MODULE_STYLE__ = {};//MODULE 统一样式
	//
	var _MODULE_CONTENT_LIST_ = {};
	var _MODULE_CONTENT_LIST_ATTR_ = {};
	var _MODULE_INNER_ = {};
	var _INSTANCE_COUNT_ = 0;//被实例化的数量
	var _MODULE_CONTENT_TEMP_ = null;
	//以下是双向绑定内容
	var __ARRAY__ = 0;//数组标识
	var __ARRAY_OBJECT__ = 0;//数组Element唯一标识
	//加载外部包
	var __PACKAGE_LIST__ = [];
	var __PACKAGE_COUNT__ = 0; 
	//错误列表
	var ____ERROR_POS____ = 0;
	var ____ERROR_COUNT____ = 0;
	var ____ERROR____ = function(value){
		console.log("JUS ERROR: " + value);
		var label = document.createElement("div");
		label.style = 'position:absolute;color:#fefefe;background-color:#f05500;margin:5px 5px 0px 5px;border-radius:5px;padding:2px 10px 2px 10px;font-size:14px;font-weight:bold;';
		label.text = ____ERROR_COUNT____ ++ + ". " + value;
		document.body.appendChild(label);
		label.style.top = ____ERROR_POS____;
		____ERROR_POS____ += 26;
	}


	//事件监听
	var ____EVENT____ = {};
	function FrameEvent(domain,type,func){
		if(!____EVENT____[type]){
			____EVENT____[type] = [];
		}
		var arr = null;
		if(!func){
			arr = ____EVENT____[type];
			var nArr = [];
			var p = null;
			for(var i = 0;i<arr.length;i++){
				p = arr[i];
				if(p.domain != domain){
					nArr.push(p);
				}
			}
			arr.length = 0;
			____EVENT____[type] = nArr;
			return;
		}
		
		//判断是否存在
		arr = ____EVENT____[type];
		var p = null;
		for(var i = 0;i<arr.length;i++){
			p = arr[i];
			if(p.domain == domain && p.func == func){
				return;
			}
		}
		arr.push({domain:domain,func:func});
		p = null;
	}

	function Event(type,value){
		var arr = ____EVENT____[type];
		if(!arr){
			return;
		}
		var p = null;
		for(var i = 0;i<arr.length;i++){
			p = arr[i];
			try{
				if(document.getElementById(p.domain)){
					p.func(value);
				}else{
					arr.splice(i,1);
					i--;
				}
				
			}catch(e){
				console.log("Event",e);
				p.isError = true;
			}
		}
		p = null;
	}



	//唯一性句柄集合
	var __MODULE_HANDLE__ = {};
	//添加句柄
	function AddHandle(objName,listener){
		if(!listener){
			alert("AddHandle: " + "please tell me handle listener");
			return;
		}
		if(__MODULE_HANDLE__[objName] == true){
			return;
		}
		
		if(__MODULE_HANDLE__[objName] && __MODULE_HANDLE__[objName].dom.parent().length != 0){
			if(listener){
				listener({target:__MODULE_HANDLE__[objName]});
			}
		}else{
			if(listener){
				var t = listener({target:null})
				if(t.listener){
					__MODULE_HANDLE__[objName] = true;
					t.listener(function(e){
						__MODULE_HANDLE__[objName] = e;
					});
				}else{
					__MODULE_HANDLE__[objName] = t;
				}
				
			}
		}
	}
	//弹出框管理
	var PopManager = new function(){
		var __ZINDEX_CONTENT__ = [];
		//添加弹出框
		this.addPopUp = function(child,content){//弹出类，弹出容器
			if(!content){
				content = $("body");
			}
			if(child.dom){
				$(child.dom).bind("mousedown",function(){
					PopManager.bringToFront(child);
				});
				content.addChild(child);
				list = getList(content);
				if(list.length>0){
					list = list.child;
					
					for(var i in list){
						if(list[i] == child){
							return;
						}
					}
					list.push(child);
				}else{
					__ZINDEX_CONTENT__.push({content:content,child:child,index:999});
				}
				this.bringToFront(child);
			}
			
		}
		this.bringToFront = function(child){//显示在最前
			//找到自己所在对象
			var c = getChildData(child);
			//找到所有同级元素
			if(c){
				var pta = getList(c.content);
				//查看有没有999级别的
				var p = null;
				var f = false;
				for(var i in __ZINDEX_CONTENT__){
					p = __ZINDEX_CONTENT__[i];
					if(p != c && p.index == 999){
						f = true;
						break;
					}
				}
				if(f){
					//如果有999则降低所有级别
					for(var i in __ZINDEX_CONTENT__){
						__ZINDEX_CONTENT__[i].index --;
					}
				}
				c.index = 999;
				render();
			}
			
		}
		
		this.removePopUp = function(child){//删除窗口
			var p = null;
			for(var i in __ZINDEX_CONTENT__){
				p = __ZINDEX_CONTENT__[i];
				if(p.child == child && p.child.dom){
					__ZINDEX_CONTENT__.splice(i,1);
					var qt = p.child.dom;
					if(qt.attr("onRemove")){
						var clearFunc = "";
						qt.find("div[onRemove]").each(function(){
							clearFunc += this.getAttribute("onRemove") + ";\r\n";
						});
						if(clearFunc != ""){
							(new Function(clearFunc))();
						}
					}
					p.child.dom.remove();
					break;
				}
			}
		}
		
		function getList(content){//获取容器列表
			var list = [];
			for(var i in __ZINDEX_CONTENT__){
				if(__ZINDEX_CONTENT__[i].content == content){
					list.push(__ZINDEX_CONTENT__[i]);
				}
			}
			return list;	
		}
		function getChildData(child){
			var p = null;
			for(var i in __ZINDEX_CONTENT__){
				p = __ZINDEX_CONTENT__[i];
				if(p.child == child){
					return p;
				}
			}
			return null;
		}
		function render(){//渲染图层
			var p = null;
			var arr = [];
			for(var i in __ZINDEX_CONTENT__){
				p = __ZINDEX_CONTENT__[i];
				if(p.child.dom){
					if($(p.child.dom).parent().length != 0){
						$(p.child.dom).css({"position":"absolute","z-index":p.index});
						arr.push(p);
					}else{
						$(p.child.dom).unbind();
					}
					
				}else{
					p.child.css({"position":"absolute","z-index":p.index});
				}
			}
			__ZINDEX_CONTENT__.length = 0;
			__ZINDEX_CONTENT__ = arr;
		}
		
	}



	/**
	 * 添加静态函数
	 * @param className
	 * @param attrName
	 * @param attrValue
	 * @param domain		application domain 程序作用域 默认为空（local）
	 * @return
	 */
	function __ADD_STATIC_METHOD__(className,attrName,attrValue,domain){
		var pos = null;
		if(!domain){
			domain = 'local';
		}
		
		pos = __WINDOW__[domain];
		if(!pos){
			__WINDOW__[domain] = {};
		}
		
		if(!(pos = __WINDOW__[domain][className])){
			pos = __WINDOW__[domain][className] = {};
		}
		
		if(!pos[attrName]){
			pos[attrName] = attrValue;
			//如果是静态默认执行代码，则执行一次
			if(attrName == "__STATIC__"){
				attrValue();
			}
		}
	}

	function __EXTEND__(d,b){
		for (var p in b){
			if (!b.hasOwnProperty(p)){
				continue;
			}
			var g = b.__lookupGetter__(p), s = b.__lookupSetter__(p); 
			if ( g || s ) {
				if ( g )
					d.__defineGetter__(p, g);
				if ( s )
					d.__defineSetter__(p, s);
			} else {
				d[p] = b[p];
			}
		}
	}


	function FormatRun(value){
		var type = value.charAt(0);
		value = value.substr(1);
		var f = value.indexOf(" ");
		var h = value.substring(0,f).split("%");
		var v = value.substring(f + 1);
		var key_p = parseInt(h[0]);
		var value_p = parseInt(h[1]);
		var name = v.substring(0,key_p);
		var value = v.substr(key_p + 1,value_p);
		return {type:type,name:name,value:value,index:2 + f + key_p + value_p + 2 + 2};
	}
	/**
	 * 加载外部包
	 */
	function __LOAD_PACKAGE__(func){
		if(__PACKAGE_LIST__.length>0){
			var f = true;
			var p = null;
			for(var i = 0;i<__PACKAGE_LIST__.length;i++){
				p = __PACKAGE_LIST__[i];
				p.index = i;
				if(!p.status){
					f = false;
					__PACKAGE__(p,func);
				}
			}
			if(f){func();}
		}else{
			func();
		}
		
	}
	/**
	 * 装载内容
	 */
	function __INIT_PACKAGE__(){
		var p = null;
		for(var i = 0;i<__PACKAGE_LIST__.length;i++){
			p = __PACKAGE_LIST__[i];
			if(p.status == 1){
				var spt = document.createElement("script");
				spt.setAttribute("package",p.url);
				spt.text = p.value;
				document.head.appendChild(spt);
				p.status = 2;//表示渲染完毕
			}
			
		}
	}
	/**
	 * 加载外部JS类包或互联网的类包
	 */
	function __PACKAGE__(pkg,func){
		var value = pkg.url;
		var ul = new URLLoader();
		var req = new URLRequest(value);
		req.method = URLRequestMethod.POST;
		
		ul.addEventListener("complete",function(e){
			__PACKAGE_COUNT__ --;
			pkg.value = e.target.data;
			pkg.status = 1;//表示加载成功
			if(__PACKAGE_COUNT__ == 0){
				__INIT_PACKAGE__();
				func();
			}
		});
		ul.addEventListener("ioError",function(e){
			__PACKAGE_COUNT__ --;
			console.error("JUS_LOAD_PACKAGE_ERROR:",value);
			if(__PACKAGE_COUNT__ == 0){
				__INIT_PACKAGE__();
				func();
			}
		});
		__PACKAGE_COUNT__ ++;
		ul.load(req);
	}

	/**
	 * 将数据分析
	 * @return 返回模块数据列表
	 */
	var __FORMAT__ = function(__DATA__,__APPDOMAIN__,module){
		if(!_MODULE_CONTENT_LIST_[__APPDOMAIN__]){
			_MODULE_CONTENT_LIST_[__APPDOMAIN__] = {};
		}
		var list = [];
		var p = __DATA__;
		var t = null;
		var v = null;
		var html = null;
		var style = "";
		var runLst = [];
		while(p.length>0){
			t = p.charAt(0)
			if(t == "R"){
				v = FormatRun(p.substring(1));
				runLst.push(v);
				p = p.substr(v.index);
			}else{
				v = __READ_DATA__(p.substring(1));
				//console.log(t,v,v.value.length);
				switch(t){
					case 'A' ://外部CSS
						if(!__MODULE_STYLE__[__APPDOMAIN__]){
							__MODULE_STYLE__[__APPDOMAIN__] = {};
						}
						if(!__MODULE_STYLE__[__APPDOMAIN__][v.module]){
							__MODULE_STYLE__[__APPDOMAIN__][v.module] = true;
							document.head.appendChild(__InitCSS__(v.module,v.value.replace(/\\r/g,'\r').replace(/\\n/g,'\n')));
						}	
					break;
					case 'B' ://内部CSS
						style = v.value + "\r\n" + style;
					break;
					case 'H' ://HTML
						html = v.value;
					break;
					case 'I' ://import
						if(v.value.charAt(0) == "S"){
							_MODULE_CONTENT_LIST_[__APPDOMAIN__][v.module] = eval("(" + v.value.substr(1) + ")");
							__FORMAT__(v.value.substr(1),__APPDOMAIN__,module);
						}else if(v.value.charAt(0) == "P"){//Package 引入外部包
							console.log({url:v.value.substr(1)});
							var isImport = false;
							var importStr = v.value.substr(1);
							for(var n = 0;n<__PACKAGE_LIST__.length;n++){
								if(__PACKAGE_LIST__[n].url == importStr){
									isImport = true;
									break;
								}
							}
							if(!isImport){
								__PACKAGE_LIST__.push({url:importStr});
							}
						}else{
							_MODULE_CONTENT_LIST_[__APPDOMAIN__][v.module] = v.value.substr(1);
							__FORMAT__(v.value.substr(1),__APPDOMAIN__,module);
						}
					break;
					case 'M' ://主Script 模块
						if(!__MODULE_METHOD__[__APPDOMAIN__]){
							__MODULE_METHOD__[__APPDOMAIN__] = {};
						}
						if(!__MODULE_METHOD__[__APPDOMAIN__][v.module]){
							__MODULE_METHOD__[__APPDOMAIN__][v.module] = {};
						}
						__MODULE_METHOD__[__APPDOMAIN__][v.module] = eval(v.value);
					break;
					case "E"://扩展类
						if(!__MODULE_EXTEND__[__APPDOMAIN__]){
							__MODULE_EXTEND__[__APPDOMAIN__] = {};
						}
						if(!__MODULE_EXTEND__[__APPDOMAIN__][v.uuid]){
							__MODULE_EXTEND__[__APPDOMAIN__][v.uuid] = {};
						}
						__MODULE_EXTEND__[__APPDOMAIN__][v.uuid] = {count:1,method:eval(v.value)};
					break;
					case "S" ://静态类
						var d = __FORMAT_VALUE__(v.value);
						(function(){
							"use strict"
							eval(d.value);
							__ADD_STATIC_METHOD__(v.module,d.name,__POS_VALUE__,__APPDOMAIN__);
						})();
					break;
					case "O" ://Error
						____ERROR____(v.value);
					break;
						
				}
				if(isNaN(v.index)){
					break;
				}
				p = p.substr(v.index);
			}
			
		}
		__ADD_MOUDLE__(__APPDOMAIN__,module,{html:html,style:style,runLst:runLst});
	}
	/**
	 * 转化为对象
	 */
	var __FORMAT_VALUE__ = function(value){
		var p = value.indexOf(' ');
		return {name:value.substring(0,p),value:value.substring(p+1)};
	}

	/**
	 * 读取数据
	 */
	var __READ_DATA__ = function(value){
		var f = value.indexOf(" ");
		var h = value.substring(0,f).split("%");
		var v = value.substring(f + 1);
		var key_p = parseInt(h[0]);
		var value_p = parseInt(h[1]);
		var module = v.substring(0,key_p);
		var uuid = v.substr(key_p + 1,32);
		var value = v.substr(key_p + 34,value_p);
		return {uuid:uuid,module:module,value:value,index:1 + f + key_p + 34 + value_p + 2 + 1};
		
	}


	/**
	 * 将字符串改为CSS
	 */
	function __InitCSS__(name,value,uuid){
		var s = document.createElement("style");
		if(name){
			s.setAttribute("class_id",name);
		}
		
		if(uuid){
			s.setAttribute("id","stl_" + uuid);
			value = value.replace(/[\b]/g,uuid);
		}
		s.innerHTML = value;
		return s;
	}


	function __InitHTML__(uuid,html){
		return html.replace(/[\b]/g,uuid);
	}
	var __C__ = document.createElement("div");
	function __InitBody__(__APPDOMAIN__,uuid,html,style,target,append){
		if(!html){
			return;
		}
		var data = __InitHTML__(uuid,html);
		__C__.innerHTML = data;	
		var tmp = __C__.firstChild;
		if(style){
			document.head.appendChild(__InitCSS__(null,style,uuid));
		}
		if(target.toString().toLowerCase() != "[object window]"){
			target = target.length ? target[0] :target;
			if(!append){
				//清除自对象
				var clearFunc = "";
				var qtLst = target.querySelectorAll("div[onRemove]");
				for(var i = 0;i<qtLst.length;i++){
					clearFunc += qtLst[i].getAttribute("onRemove") + ";\r\n";
				}
				if(clearFunc != ""){
					(new Function(clearFunc))();
				}
				
				//TODO 这里需要清楚所有事件监听
				
				//这里要清楚所有dom
				target.innerHTML = "";
			}
			
			target.appendChild(tmp);
		}else{
			if(!_MODULE_CONTENT_TEMP_ || _MODULE_CONTENT_TEMP_.parentNode == null){
				_MODULE_CONTENT_TEMP_ = document.createElement("div");
				_MODULE_CONTENT_TEMP_.style = "position:fixed;left:10000px;top:10000px;";
				document.body.appendChild(_MODULE_CONTENT_TEMP_);
			}
			_MODULE_CONTENT_TEMP_.appendChild(tmp);
		}
		
	}

	/**
	 * 添加模块初始化项目
	 */
	function __ADD_MOUDLE__(__APPDOMAIN__,moduleName,modObj){
		if(!__MODULE_RUNLIST__[__APPDOMAIN__]){
			__MODULE_RUNLIST__[__APPDOMAIN__] = {};
		}
		if(!__MODULE_RUNLIST__[__APPDOMAIN__][moduleName]){
			__MODULE_RUNLIST__[__APPDOMAIN__][moduleName] = {};
		}
		__MODULE_RUNLIST__[__APPDOMAIN__][moduleName] = modObj;
		
	}
	
	function __HAV_MODULE__(module,__APPDOMAIN__){
		var app = __MODULE_RUNLIST__[__APPDOMAIN__];
		if(app){
			if(app[module]){
				return true;
			}
		}
		return false;
	}
	
	
	/**
	 * 增加命令到空间
	 */
	function AddC2C(uuid,data,__APPDOMAIN__){
		var param = data.value.split("\x01");
		var cls = param[0];
		var module = param[1];
		var tgt = window[param[2].replace(/[\b]/g,uuid)];
		var value = param.length>3 ? param[3] : null;
		__PUSH_COMMAND__(uuid,data.name.replace(/[\b]/g,uuid),cls,getModule(module,__APPDOMAIN__)(tgt,value));
		
	}

	/**
	 * 初始化模块列表
	 */
	function __InitModule__(__APPDOMAIN__,moduleName,uuid,value,target,append){
		__MODULE_INIT__[uuid] = [];
		var app = __MODULE_RUNLIST__[__APPDOMAIN__];
		var method = __MODULE_METHOD__[__APPDOMAIN__];
		var extend = __MODULE_EXTEND__[__APPDOMAIN__];
		if(app){
			var param = [];
			var m = app[moduleName];
			if(m){
				__InitBody__(__APPDOMAIN__,uuid,m.html,m.style,target,append);
				var lst = m.runLst;
				var p = null;
				for(var i = 0;i<lst.length;i++){
					p = lst[i];
					switch(p.type){
						case "P":
							//_MODULE_CONTENT_LIST_ATTR_[p.name.replace(/[\b]/g,uuid)] = eval(p.value.replace(/[\b]/g,uuid));
							param.push(p.name.replace(/[\b]/g,uuid),p.value.replace(/[\b]/g,uuid));
						break;
						case "S"://执行基本函数
							if(method[p.value]){
								method[p.value](p.name.replace(/[\b]/g,uuid),uuid,__APPDOMAIN__);
							}else{
								trace(p.name,p.value);
							}
							
						break;
						case "E"://执行扩展函数
							extend[p.value].method(p.name.replace(/[\b]/g,uuid),uuid,__APPDOMAIN__);
						break;
						case "C"://执行命令函数
							AddC2C(uuid,p,__APPDOMAIN__)//AddCommandToCompoent
							//__PUSH_COMMAND__(uuid,__NAME__,'-lang',getModule('.Lang',__APPDOMAIN__)({target:window[uuid + 'a1'],data:'lang/index-lang.json'}));
							//__PUSH_COMMAND__(uuid,p.name.replace(/[\b]/g,uuid),'-lang',getModule('.Lang',__APPDOMAIN__)({target:window[uuid + 'a1'],data:'lang/index-lang.json'}));
						break;
						case "T"://执行外连接函数
							if(!_MODULE_INNER_[uuid]){
								_MODULE_INNER_[uuid] = [];
							}
							_MODULE_INNER_[uuid].push(window[p.name.replace(/[\b]/g,uuid)]);
						break;
						case "L"://执行外连接函数
							if(!_MODULE_INNER_[uuid]){
								_MODULE_INNER_[uuid] = [];
							}
							_MODULE_INNER_[uuid].push(eval(p.value)());
						break;
					}
				}
				for(var i = 0;i<param.length;i+=2){
					_MODULE_CONTENT_LIST_ATTR_[param[i]] = eval(param[i+1]);
				}
				if(value != undefined){
					
					_MODULE_CONTENT_LIST_ATTR_[uuid] = value;
				}
				//初始化列表
				__initLst__(uuid);
				return window[uuid];
			}
		}
		return nil;
	}
	
	function __UUID__(){
		return "J" + (new Date().getTime()) + (_INSTANCE_COUNT_ ++);
	}
	
	

	//设置HTMLElement
	var ____D = HTMLElement.prototype.appendChild;
	//var ____I = HTMLElement.prototype.innerHTML;
	HTMLElement.prototype.append = HTMLElement.prototype.appendChild = function(obj){
		if(obj instanceof Node){
			return ____D.call(this,obj);
		}else if(obj.dom){
			return ____D.call(this,obj.dom);
		}
	};
	
	//设置DocumentFragment
	var ____DG = DocumentFragment.prototype.appendChild;
	DocumentFragment.prototype.append = DocumentFragment.prototype.appendChild = function(obj){
		if(obj instanceof Node){
			return ____DG.call(this,obj);
		}else if(obj.dom){
			return ____DG.call(this,obj.dom);
		}
	};
	
	
	var JUS = {};
	//加载模块
	HTMLElement.prototype.loadModule = function(){//module,value,listener,appDomain
		var p = [this];
		for(var i = 0;i<arguments.length;i++){
			p.push(arguments[i]);
		}
		return JUS.loadModule.apply(JUS,p);
	};
	
	
	//添加模块
	HTMLElement.prototype.addModule = function(){//module,value,listener,appDomain
		var p = [this];
		for(var i = 0;i<arguments.length;i++){
			p.push(arguments[i]);
		}
		return JUS.addModule.apply(JUS,p);
	};
	
	/*
	Object.defineProperty(HTMLElement.prototype,"innerHTML",{
		set:function(value){
			____I.call(this,value);
		},
		get:function(){
			return _value;
		}
	,enumerable:true});
	*/
	
	JUS.loadClass = function(className,listener,appDomain){
		var value,listener,appDomain;
		var p = null;
		for(var i = 2;i<arguments.length;i++){
			p = arguments[i];
			if(p instanceof String){
				appDomain = p;
			}else if(p instanceof Function){
				listener = p;
			}else if(p instanceof Array){
				value = p;
			}else{
				throw new Error("parameters type error.");
				return;
			}
		}
		var url = "juis/" + className.replace(/\./g,'/') + ".html";
		var load = window.location.toString().indexOf("http:") == 0 ? asjs.post : asjs.get;
		var _CF_ = null;
		load(url,function(e){
			appDomain = appDomain || "local";
			var data = e.target.data;
			__FORMAT__(data,appDomain,className);
			__LOAD_PACKAGE__(function(){
				//执行函数
				if(listener){
					listener();
				}
			});
			
		});
	}
	
	JUS.getClass = function(className,appDomain){
		appDomain = appDomain || "local";
		return _MODULE_CONTENT_LIST_[appDomain][className];
	}
	
	
	JUS.loadModule = function(target,module){
		var value,listener,appDomain;
		var p = null;
		for(var i = 2;i<arguments.length;i++){
			p = arguments[i];
			if(p instanceof String){
				appDomain = p;
			}else if(p instanceof Function){
				listener = p;
			}else if(p instanceof Array){
				value = p;
			}else{
				throw new Error("parameters type error.");
				return;
			}
		}
		var url = "juis/" + module.replace(/\./g,'/') + ".html";
		var load = window.location.toString().indexOf("http:") == 0 ? asjs.post : asjs.get;
		var _CF_ = null;
		load(url,function(e){
			appDomain = appDomain || "local";
			var data = e.target.data;
			var uuid = __UUID__();
			__FORMAT__(data,appDomain,module);
			__LOAD_PACKAGE__(function(){
				//执行函数
				var w =  __InitModule__(appDomain,module,uuid,value,target);
				if(listener){	
					listener(w);
				}
				if(_CF_){
					_CF_(w);
				}
			});
			
		});
		return {listener:function(value){
			_CF_ = value;
		}};
	}

	JUS.addModule = function(target,module){
		var value,listener,appDomain;
		var p = null;
		for(var i = 2;i<arguments.length;i++){
			p = arguments[i];
			if(p instanceof String){
				appDomain = p;
			}else if(p instanceof Function){
				listener = p;
			}else if(p instanceof Array){
				value = p;
			}else{
				throw new Error("parameters type error.");
				return;
			}
		}
		url = "juis/" + module.replace(/\./g,'/') + ".html";
		var load = window.location.toString().indexOf("http:") == 0 ? asjs.post : asjs.get;
		var _CF_ = null;
		load(url,function(e){
			appDomain = appDomain || "local";
			var data = e.target.data;
			var uuid = __UUID__();
			__FORMAT__(data,appDomain,module);
			__LOAD_PACKAGE__(function(){
				//执行函数
				var w =  __InitModule__(appDomain,module,uuid,value,target,true);
				if(listener){	
					listener(w);
				}
				if(_CF_){
					_CF_(w);
				}
			});
			
		});
		return {listener:function(value){
			_CF_ = value;
		}};
	}

	


	/**
	 * 获取已经存储的Module
	 * @param url		类路径地址
	 * @param value 	不确定长度隐形参数
	 */
	var getModule = JUS.getModule = function(module,__APPDOMAIN__){
		__APPDOMAIN__ = __APPDOMAIN__ || "local";
		var mod = _MODULE_CONTENT_LIST_[__APPDOMAIN__][module];
		if(mod){
			var type = typeof mod;
			if(type == "string"){
				if(!__HAV_MODULE__(module,__APPDOMAIN__)){
					__FORMAT__(mod,__APPDOMAIN__,module);
				}
				return function(){
					return __InitModule__(__APPDOMAIN__,module,__UUID__(),arguments,window,true);
				}
				
			}else if(type == "function"){
				return function(){
					return new mod(arguments);
				};
			}
			
		}
		alert("getModule[" + module + "] is not exist.");
		return null;
	}






	/**
	 * 加载类
	 * 本项功能预留
	 */
	function loadClass(url){
		var load = window.location.toString().indexOf("http:") == 0 ? asjs.post : asjs.get;
		load(url,function(e){
			//TODO
		});
	}






	var __initLst__ = function(uuid){
		var p = null;
		var initLst = __MODULE_INIT__[uuid];
		if(initLst){
			while(initLst.length>0){
				p = initLst.shift();
				if(p.name){
					p.name.apply(p.domain,_MODULE_CONTENT_LIST_ATTR_[p.value] || []);
				}
				if(p.append){
					p.append();
				}
			}
			delete __MODULE_INIT__[uuid] 
		}
		
	}
	var _CCC_ = 0;
	window.tplMap = new Map();
	//单项保定更新数据界面
	window.update = function update(obj,name,value){		
		var a = tplMap.get(obj);
		if(a){
			var t = null;
			for(var i = 0;i<a.length;i++){
				t = a[i].target;
				for(var k in t){
					t[k] = obj[k];
				}
			}
		}
		
		for(var o in obj){
			t = obj[o];
			if(t instanceof Object){
				update(t);
			}
		}
	}
	
	//添加新元素
	function __TPL_MAP_PUSH__(value,obj){
		var q = tplMap.get(value);
		if(!q){
			tplMap.set(value,q = []);
		}
		q.push(obj);
	}
	

	/**
	 * 类导入函数
	 * REMOVE
	 */
	function importFunc(url,data){
		_MODULE_CONTENT_LIST_[url] = escape(data);
	}


	/**
	 * 添加命令缓存
	 */
	var __PUSH_COMMAND__ = function(domain,name,cmd,obj){
		if(!__MODULE_COMMAND_LIST__[domain]){
			__MODULE_COMMAND_LIST__[domain] = [];
		}
		window[name][cmd] = obj;
		__MODULE_COMMAND_LIST__[domain].push(obj);
	}

	/**
	 * 注册属性，当垃圾回收器回收的是会主动回收此类对象
	 */
	var __DEFER_LIST_START_ = null;
	var __DEFER_LIST_END_ = null;
	var defer = function(dom,obj){
		if(obj && obj.destroy){
			if(__DEFER_LIST_END_ == null){
				__DEFER_LIST_START_ = __DEFER_LIST_END_ = {dom:dom,lst:[obj],next:null};
			}else{
				__DEFER_LIST_END_.next = {dom:dom,lst:[obj],next:null};
				__DEFER_LIST_END_ = __DEFER_LIST_END_.next;
			}
		}else{
			console.error("defer error.");
		}
	};
	var gcDefer = function(){
		var c = __DEFER_LIST_START_;
		var p = __DEFER_LIST_START_;
		var l = null;
		var n = null;
		while(p){
			//console.log(p);
			n = p.next;
			if(!p.dom.parentNode){
				
				p.dom = null;
				p.lst = null;
				p.next = null;
				delete p.dom;
				delete p.lst;
				delete p.next;
				if(p == __DEFER_LIST_START_){
					__DEFER_LIST_START_ = n;
				}else{
					c.next = n;
				}
			}else{						
				c = p;
			}
			p = n;
		}
		p = null;
		l = null;
	}
	
	/**
	 * 垃圾回收
	 */
	var cl = null;
	var cp = null;
	function gcEvt(){
		for(var name in __MODULE_LIST__){
			if(!document.getElementById(name)){
				var obj = window[name];
				if(obj._DELAY_TIME_ && (new Date().getTime() - obj._DELAY_TIME_ >3000)){
					try{
						if(obj.finalize){
							obj.finalize();
						}
					}catch(e){
						alert("run [" + name + "] finalize isn't success!");
					}
					try{
						delete window[name];
					}catch(e){
						window[name] = null;
					}
					delete __MODULE_LIST__[name];
					cl = __MODULE_COMMAND_LIST__[name];
					if(cl){
						for(var c = 0;c<cl.length;c++){
							cp = cl[c];
							if(cp.finalize){
								cp.finalize();
							}
						}
					}
					
					delete __MODULE_COMMAND_LIST__[name];
					delete _MODULE_CONTENT_LIST_ATTR_[name];
					document.head.removeChild(document.getElementById("stl_" + name));
					if(window.__DEBUG__ && console){
						console.log("remove model id:" + name);
					}
					continue;
				}
				obj._DELAY_TIME_ = new Date().getTime();
				
			}
		}
		gcDefer();
		clearTimeout(__CLEAR_ID__);
		__CLEAR_ID__ = setTimeout(__CLEAR_FUNC__,5000);
	}
	var __CLEAR_ID__ = -1;
	var __CLEAR_FUNC__ = function(e){
		if(window.requestAnimationFrame){
			window.requestAnimationFrame(gcEvt);
		}else{
			gcEvt();
		}
		
	}
	__CLEAR_ID__ = setTimeout(__CLEAR_FUNC__,5000);
	window.Eval = function(value){
		console.log(eval(value));
	}
	window.JUS = JUS;
})();