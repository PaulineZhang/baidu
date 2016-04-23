//柱状图数据
var chartData=[];
var number=document.getElementById("number");
var list=document.getElementById("chart-dis");


function numLimit(num){
	if (chartData.length>60) {
		alert("元素过多，不允许输入");
		return 0;
	}
	var reg=/^\d+$/;
	if (!reg.test(num)) {
		alert("请输入数字");
		return 0;
	}
	if (num<10||num>100) {
		alert("请输入的数字确保在10-100之间");
		return 0;
	}
	return num;
}
function leftIn()
{
	var numberIn=numLimit(number.value);
	if (numberIn==0) {return;}
	var newNode=numberIn;
	chartData.unshift(newNode);
	renderChart();
}
function rightIn(){
	var numberIn=numLimit(number.value);
	if (numberIn==0) {return;}
	var newNode=numberIn;
	chartData.push(newNode);
	renderChart();
}
function leftOut(){
	var out=chartData.shift();
	alert("左侧输出"+out);
	renderChart();
}
function rightOut(){
	var out=chartData.pop();
	alert("右侧输出"+out);
	renderChart();
}
function clickOut(){	
	var value=parseInt(this.title);
	var pos=chartData.indexOf(value);
	chartData.splice(pos,1);
	renderChart();
}

//产生50个随机数
function randomNumbers(){
	if (chartData.length>10) {
		alert("输入数据将大于60个");
		return;}
	for (var i = 0; i < 50; i++) {
		var num=Math.round(Math.random()*90+10);
		chartData.push(num);
	}
	renderChart();
}
//给按钮添加事件
function buttonInit(){
	document.getElementById("left-insert").addEventListener("click",leftIn);
	document.getElementById("right-insert").addEventListener("click",rightIn);
	document.getElementById("left-delete").addEventListener("click",leftOut);
	document.getElementById("right-delete").addEventListener("click",rightOut);
	document.getElementById("random-number").addEventListener("click",randomNumbers);
	document.getElementById("sort").addEventListener("click",bubbleSort);
}
//显示柱状图
function renderChart(){
	list.innerHTML="";
	for (var i = 0; i < chartData.length; i++) {
		var newNode=document.createElement("div");
		newNode.style.height=chartData[i]*6+'px';
		newNode.style.width='10px';
		newNode.style.left=13*i+'px';
		newNode.title=chartData[i];
		newNode.id=chartData[i];
		newNode.addEventListener("click",clickOut);
		list.appendChild(newNode);
	}
}
//冒泡排序
function bubbleSort(){
	var i=chartData.length,j=0;
	var temp;
	var timer=setInterval(sortDelay,2);
	function sortDelay(){
		if (i>0) {
			if (j<i-1) {
				if (chartData[j]>chartData[j+1]) {
					temp=chartData[j];
					chartData[j]=chartData[j+1];
					chartData[j+1]=temp;			
					renderChart();
					document.getElementById(chartData[j]).style.backgroundColor='#339999';
					document.getElementById(chartData[j+1]).style.backgroundColor='#ff9900';
				}
				j++;
			}
			else{
				i--;
				j=0;
			}
		}
		else{
			clearInterval(timer);
			renderChart();
			return;
		}
	}

}

function init()
{
	buttonInit();
	renderChart();
}
init();
