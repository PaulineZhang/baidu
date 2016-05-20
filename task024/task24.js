var rootNode=document.getElementsByClassName('root')[0];
var treeArr=new Array();
var brothersNode=new Array();
var clickArr=new Array();	//单击选中删除节点集合
var delNode=new Array();	//待删除节点集合

function buttonInit(){
	var depthTravel=document.getElementById('depth-travel');
	var breadthTravel=document.getElementById('breadth-travel');
	var depthSearch=document.getElementById('depth-search');
	var breadthSearch=document.getElementById('breadth-search');
	var deleteBtn=document.getElementById('delete');
	var addBtn=document.getElementById('add');

	depthTravel.onclick=function(){
		DFS(rootNode);
		Render();
	}
	breadthTravel.onclick=function(){
		BFS(rootNode);
		Render();
	}
	depthSearch.onclick=function(){
		DFS(rootNode);
		RenderText();
	}
	breadthSearch.onclick=function(){
		BFS(rootNode);
		RenderText();
	}
	deleteBtn.onclick=function(){
		DelNode(clickArr);
		clickArr=[];
	}
	addBtn.onclick=function(){
		AddNode(clickArr);
		clickArr=[];
	}

}
//子节点添加点击响应
function clickInit(){
	BFS(rootNode);
	for (var i = 0; i < treeArr.length; i++) {
		treeArr[i].addEventListener('click',ClickColor);
	}
	treeArr=[];
}

function ClickColor(e){
	if (this.style.backgroundColor==''||this.style.backgroundColor=='white') {
		this.style.backgroundColor='#669900';
		clickArr.push(this);
	}
	else{
		this.style.backgroundColor='white';
		var index=clickArr.indexOf(this);
		if (index>-1) {	//存在
			var one=clickArr.splice(index,1);
		}		
	}	
	//阻止冒泡
	var e=e||window.e;
	e.stopPropagation();
}
//删除节点函数
function DelNode(clickArr){
	delNode=[];
	for (var i = 0; i < clickArr.length; i++) {
		DFS(clickArr[i]);
	}
	for (var i = 0; i < treeArr.length; i++) {
		if (delNode.indexOf(treeArr[i])==-1) {
			delNode.push(treeArr[i]);
		}
	}
	for (var i = 0; i < delNode.length; i++) {
		delNode[delNode.length-i-1].outerHTML='';
		console.log(delNode);
	}
	treeArr=[];
}
//添加节点函数
function AddNode(clickArr){
	var addText=document.getElementById('add-text').value;
	for (var i = 0; i < clickArr.length; i++) {
		var newNode=document.createElement('div');
		newNode.innerHTML=addText;
		clickArr[i].appendChild(newNode);
		clickArr[i].style.backgroundColor='white';
	}
	clickInit();
}
function Render(){
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

function RenderText(){
	var text=document.getElementById('search').value;
	var i=0,len=treeArr.length;
	var timer=setInterval(RenderChosen,500);
	function RenderChosen(){
		if (i<len) {
			if (i>0&&treeArr[i-1].innerText.split(' ',1)[0]!=text) {
				treeArr[i-1].style.backgroundColor='white';
			}
			if (treeArr[i].innerText.split(' ',1)[0]==text) {
				treeArr[i].style.backgroundColor='#ff9999';
			}
			else{
				treeArr[i].style.backgroundColor='#99ccff';
			}
			i++; 
		}
		else{
			clearInterval(timer);
			if (treeArr[i-1].innerText.split(' ',1)[0]!=text) {
				treeArr[len-1].style.backgroundColor='white';
			}
			
			treeArr=[];
			return;
		}
	}
}

//深度优先遍历
function DFS(node) {
	if (node!=null) {
		treeArr.push(node);
		for (var i = 0; i < node.childElementCount; i++) {
			DFS(node.children[i]);
		}
	}
}

//广度优先遍历
function BFS(node){
	if (node==rootNode) {
		treeArr.push(rootNode);
		brothersNode.push(rootNode);
	}
	for (var i = 0; i < node.childElementCount; i++) {
		treeArr.push(node.children[i]);
		brothersNode.push(node.children[i]);			
	}	
	var del=brothersNode.shift();
	if (brothersNode.length) {
		BFS(brothersNode[0]);
	}	
}

//添加点击响应事件


function Init(){
	clickInit();
	buttonInit();

}
Init();