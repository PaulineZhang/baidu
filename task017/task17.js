/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}
var formGraTime=document.getElementById("form-gra-time");
var citySelect=document.getElementById("city-select");
var aqiCharWrap=document.getElementById("aqi-chart-wrap");
/**
 * 渲染图表
 */
var charWidth={day: 91, week: 13, month: 3};
function renderChart() {
  var context="";
  var color;
  var i=0;
  var width=aqiCharWrap.clientWidth/(charWidth[pageState.nowGraTime]);
  for (var data in chartData) {
    color="rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
    context+="<div style='height:"+chartData[data]+"px;"+"background-color:"+color+";left:"+width*i+"px;width:"+(width*0.8)+"px;' title='"+data+" 空气质量: "+chartData[data]+"'></div>";
    i++;
  }
  aqiCharWrap.innerHTML=context;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (this.value!=pageState.nowGraTime) {
    pageState.nowGraTime=this.value;
  }
  initAqiChartData();
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (this.value!=pageState.nowSelectCity) {
    pageState.nowSelectCity=this.value;
  }
  // 设置对应数据
  initAqiChartData();
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var timeChosen=formGraTime.getElementsByTagName("input");
  for (var i = 0; i <timeChosen.length; i++) {
    timeChosen[i].addEventListener("click",graTimeChange);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var cityMember="";
  for (var city in aqiSourceData) {
    cityMember+="<option>"+city+"</option>";
  }
  citySelect.innerHTML=cityMember;
  citySelect.addEventListener("change",citySelectChange); 
}

/**
 * 初始化图表需要的数据格式
 */
 var monthChar=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function initAqiChartData() {
  var data=aqiSourceData[pageState.nowSelectCity];
  var dataDis={};
  switch(pageState.nowGraTime){
    case "day": 
      dataDis=data;break;
    case "week": 
      var sum=0,i=0,weekConut=1;
      for (var item in data) {
        i++;
        sum+=data[item];
        if (i==7) {
          dataDis["第"+weekConut+"周"]=parseInt(sum/7);
          weekConut++;
          i=0;
          sum=0;
        }
      }
      if (i!=0) {
        dataDis["第"+(weekConut+1)+"周"]=parseInt(sum/i);
      }
      break;
    case "month":
      var sum=0,i=0,month=0;
      for (var item in data) {   
        var time=new Date(item);    
        if (time.getMonth()!=month) {
          dataDis[monthChar[month]]=parseInt(sum/i);
          sum=0;
          i=0;
          month++;
        }
        sum+=data[item];
        i++;
      }
      if (i!=0) {
        dataDis[monthChar[month+1]]=parseInt(sum/i);
      }
      break;
      default:return;    
  } 
  // 处理好的数据存到 chartData 中
  chartData=dataDis;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();