var contextIn=document.getElementById("context");
var searchIn=document.getElementById("search-context");
var list=document.getElementById("chart-dis");
for (var i = 0; i < list.childNodes.length; i++) {
 	list.childNodes[i].addEventListener ("click",clickOut);
 } 

//存放textarea有效组合
var tags=new Array();
function textHandle(contextValue){
	tags=[];
	var reg=/^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
	var start=0,end=0;
	for (var i = 0; i < contextValue.length; i++) {
		if(!reg.test(contextValue[i])){
			end=i;
			tags.push(contextValue.substring(start,end));
			start=i+1;
		}
	}
	tags.push(contextValue.substring(start,contextValue.length));
}
function searchMatch(){

	var searchValue=searchIn.value;
	for (var i = 0; i < list.childElementCount; i++) {
		list.children[i].style.backgroundColor='#339999';
		if (list.children[i].innerHTML.search(searchValue)>=0) {
			list.children[i].style.backgroundColor='#ff9900';
		}
	}
}

function leftIn()
{
	textHandle(contextIn.value );
	for (var i = 0; i < tags.length; i++) {
		var newNode=document.createElement("div");
		newNode.innerHTML=tags[i];
		newNode.addEventListener("click",clickOut);
		list.insertBefore(newNode,list.firstChild);
	}
}
function rightIn(){
	textHandle(contextIn.value );
	for (var i = 0; i < tags.length; i++) {
		var newNode=document.createElement("div");
		newNode.innerHTML=tags[i];
		newNode.addEventListener("click",clickOut);
		list.appendChild(newNode,list.firstChild);
	}
}
function leftOut(){
	alert("左侧输出"+list.firstElementChild.innerHTML);
	list.removeChild(list.firstChild);
}
function rightOut(){
	alert("右侧输出"+list.lastChild.innerHTML);
	list.removeChild(list.lastElementChild);
}
function clickOut(){
	this.outerHTML="";
	console.log(list);
}
document.getElementById("left-insert").addEventListener("click",leftIn);
document.getElementById("right-insert").addEventListener("click",rightIn);
document.getElementById("left-delete").addEventListener("click",leftOut);
document.getElementById("right-delete").addEventListener("click",rightOut);
document.getElementById("search").addEventListener("click",searchMatch);
