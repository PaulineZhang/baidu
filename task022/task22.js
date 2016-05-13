//遍历方式按钮
var front=document.getElementById("front");
var middle=document.getElementById("middle");
var back=document.getElementById("back");
var treeArr=new Array();	//存放遍历结果
var rootNode=document.getElementsByClassName('root')[0];	//根节点

front.onclick=function(){
	preOrder(rootNode);
	Render();
}
middle.onclick=function(){
	inOrder(rootNode);
	Render();
}
back.onclick=function(){
	postOrder(rootNode);
	Render();
}

function Render() {
	var i=0,len=treeArr.length;
	var timer=setInterval(RenderOne,500);
	
	function RenderOne(){
		if (i<len) {
			if (i>0) {
				treeArr[i-1].style.backgroundColor='white';
			}
			treeArr[i].style.backgroundColor='#99ccff';
			i++; 
		}
		else{
			clearInterval(timer);
			treeArr[len-1].style.backgroundColor='white';
			treeArr=[];
			return;
		}
	}
}

function preOrder(node){
	if (node!=null) {
		treeArr.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}	
}
function inOrder(node){
	if (node!=null) {
		inOrder(node.firstElementChild);
		treeArr.push(node);
		inOrder(node.lastElementChild);
	}
}
function postOrder(node){
	if (node!=null) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		treeArr.push(node);
	}
}