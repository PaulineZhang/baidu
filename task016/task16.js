/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value.trim();
	var quality=document.getElementById("aqi-value-input").value.trim();
	if (!/^[A-Za-z\u4E00-\u9FA5]+$/.test(city)) {
		alert("请输入中英文");
		return;
	}
	var int=new RegExp("^-?\\d+$");
	if (quality.match(int)==null) {
		alert("请输入数字");
		return;
	}
	aqiData[city]=quality;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table");
	table.innerHTML="";
	for (var city in aqiData) {
		if (table.rows.length==0) {
			var table_title=document.createElement("tr");
			table_title.innerHTML="<td>城市</td><td>空气质量</td><td>操作</td>";
			table.appendChild(table_title);
		}
		var table_intent=document.createElement("tr");
		table_intent.innerHTML="<td>"+city+"</td><td>"+aqiData[city]+"</td><td><button>删除</button></td>";
		table.appendChild(table_intent);		
	}		
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  	var table=document.getElementById("aqi-table");
  	var table_button=table.getElementsByTagName("button");	
   	for(var i=0;i<table_button.length;i++)
 	{
 		var table_tr=table_button[i].parentNode.parentNode;
  		var table_city=table_tr.getElementsByTagName("td")[0].innerHTML;
  		table_button[i].addEventListener("click",function(){delBtnHandle(table_city);});
  	}
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
  	renderAqiList();


}
/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
  // do sth.
  console.log("del "+city);
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var buttonAdd=document.getElementById("add-btn");
  	buttonAdd.addEventListener("click",function(){addBtnHandle();});
  
}
init();