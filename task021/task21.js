(function(){
	//tag参数获取
	var tag=document.getElementById("tag-content");
	//监测逗号，空格，回车
	tag.addEventListener("keyup",renderTag);
	var listTag=document.getElementById("tag-display");
	 
	//interest参数获取
	var interest=document.getElementById("interest");
	var listInterest=document.getElementById("interest-display");
	var sure=document.getElementById("sure");
	//按键添加事件
	sure.addEventListener("click",interestIn);

	//显示tag内容,判断, 空格 回车
	function renderTag(e){
		var keyValue;	//编码
		if (window.event) {keyValue=e.keyCode;}	//IE
		else if (e.which) {keyValue=e.which;}	//chrome
		var reg=/[, ]+/;
		if(reg.test(this.value)||keyValue==13){	//13回车
			var newNode=document.createElement("div");
			newNode.innerHTML=this.value.split(','||' ',1);
			if (tagRepeat(newNode.innerHTML)&&newNode.innerHTML!=null&&newNode.innerHTML.trim().length>0) {
				if (listTag.childElementCount>=10) {
					listTag.removeChild(listTag.firstChild);
				}
				newNode.addEventListener("mouseover",mouseOver);
				newNode.addEventListener ("mouseout",mouseOut);
				newNode.addEventListener ("click",clickOut);
				listTag.appendChild(newNode);
			}	
			tag.value="";
		}
	}
	//判断tag内容是否重复
	function tagRepeat(tagValue){
		for (var i = 0; i < listTag.childElementCount; i++) {
			if (listTag.children[i].innerHTML==tagValue) {
				return 0;	//找到重复
			}
		}
		return 1;
	}

	var interestArr=new Array();
	function interestIn(){
		var reg=/^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
		var start=0;
		for (var i = 0; i < interest.value.length; i++) {
			if(!reg.test(interest.value[i])){
				var temp=interest.value.substring(start,i);
				if (temp!="") {
					interestArr.push(temp);
				}
				start=i+1;
			}
		}
		interestArr.push(interest.value.substring(start,interest.value.length));
		interestRender();

	}

	function interestRender(){
		for (var i = 0; i < interestArr.length; i++) {	
			if(interestRepeat(interestArr[i])){
				if (listInterest.childElementCount>=10) {
					listInterest.removeChild(listInterest.firstChild);
				}
				var newNode=document.createElement("div");
				newNode.innerHTML=interestArr[i];
				newNode.addEventListener("mouseover",mouseOver);
				newNode.addEventListener ("mouseout",mouseOut);
				newNode.addEventListener("click",clickOut);
				listInterest.appendChild(newNode);
			}			
		}
		interest.value="";
		interestArr=[];
	}

	function interestRepeat(interestValue){
		for (var i = 0; i < listInterest.childElementCount; i++) {
			if (listInterest.children[i].innerHTML==interestValue) {
				return 0;	//找到重复
			}
		}
		return 1;
	}

	function mouseOver(){
		this.innerHTML="点击删除 "+this.innerHTML;
		this.style.backgroundColor= 'red';
	}
	function mouseOut(){
		this.innerHTML=this.innerHTML.substring(4,this.innerHTML.length);
		this.style.backgroundColor='rgb(139,199,249)';
	}
	//点击删除
	function clickOut(){
		this.outerHTML="";
	}
})();
