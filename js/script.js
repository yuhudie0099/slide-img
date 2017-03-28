//封装一个代替getElementById的方法
function byId(id) {
	return typeof(id) === "string" ? document.getElementById(id) : id;

}
var index = 0,
	timer = null,
	pics = byId("banner").getElementsByTagName("div"),
	len = pics.length,
	dots = byId("dots").getElementsByTagName("span"),
	prev = byId("prev"),
	next = byId("next"),
	menu = byId("menu-content"),
	menuItems = menu.getElementsByClassName("menu-item"),
	subMenu = byId("sub-menu"),
	innerBox = subMenu.getElementsByClassName("inner-box");

function slideImg() {
	//鼠标滑过时清除定时器 离开继续
	main.onmouseover = function() {
		clearInterval(timer);
	}
	//鼠标离开时  
	main.onmouseout = function() {
		timer = setInterval(function() {
			console.log(index);
			index++;
			if(index >= len) {
				index = 0;
			}
			changeImg();
		}, 1000);
	}
	main.onmouseout();

	//点击原点切换图片
	for(var i = 0; i < len; i++) {
		dots[i].id = i;
		dots[i].onclick = function() {
			index = this.id;

			changeImg();
		}
	}
	//下一张
	next.onclick = function() {
		index++;
		if(index >= len) {
			index = 0;
		}
		changeImg();
	}
	//上一张
	prev.onclick = function() {
		index--;
		if(index < 0) {
			index = len - 1;
		}
		changeImg();

	}
	//导航菜单
	//遍历主菜单，且绑定事件
	for(var m = 0; m < menuItems.length; m++) {
		//给每一个menu-item定义一个data-index的属性，作为索引
		menuItems[m].setAttribute("data-index", m);
		//innerBox.style.display = "none";
		menuItems[m].onmouseover = function() {
			var idx = this.getAttribute("data-index");
			for (j=0;j<innerBox.length;j++) {
				innerBox[j].style.display="none";
				menuItems[j].style.background="none"
			}
			subMenu.style.display = "block";
			innerBox[idx].style.display = "block";
			menuItems[idx].style.background="rgba(0,0,0,0.1)"
		}
menu.onmouseout=function () {
			var idx=this.getAttribute("data-index");
			subMenu.style.display="none";
			innerBox[idx].style.display="none";
		}
subMenu.onmouseover=function  () {
	this.style.display="block";
}
subMenu.onmouseout=function  () {
	this.style.display="none";
}
	}
}
//封装切换图片的函数
function changeImg() {
	for(var i = 0; i < len; i++) {
		pics[i].style.display = "none";
		dots[i].className = ""
	}
	pics[index].style.display = "block";
	dots[index].className = "active";

}
slideImg();