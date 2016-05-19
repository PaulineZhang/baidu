var depthTravel=document.getElementById('depth-travel');
var breadthTravel=document.getElementById('breadth-travel');
var depthSearch=document.getElementById('depth-search');
var breadthSearch=document.getElementById('breadth-search');


var rootNode=document.getElementsByClassName('root')[0];
var treeArr=new Array();
var brothersNode=new Array();

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