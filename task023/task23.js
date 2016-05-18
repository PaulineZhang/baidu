var depthTravel=document.getElementById('depth-travel');
var breadthTravel=document.getElementById('breadth-travel');
var depthSearch=document.getElementById('depth-search');
var breadthSearch=document.getElementById('breadth-search');

var rootNode=document.getElementsByClassName('root')[0];

var treeArr=new Array();

depthTravel.onclick=function(){
	DFS(rootNode);
	Render();
}
breadthTravel.onclick=function(){
	BFS(rootNode);
	Render();
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
	if (node!=null) {
		treeArr.push(node);
		console.log(node.innerText.split(' ',1));
		if (node!=rootNode) {
			BFS(node.nextElementSibling);
			for (var i = 0; i < node.parentNode.childElementCount; i++) {
				BFS(node.parentNode.nextElementSibling.firstElementChild);
			}
		}
		else{
			BFS(node.firstElementChild);
		}
		
	}
}