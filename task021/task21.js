window.onload=function(){
	var tag=new TagControler('tag-content','tag-display');
	tag.Init();
	var interest=new TextControler('interest','interest-display','sure');
	interest.Init();
}

function DeletableNode(content){
	if(content.length==0)
		return null;
	var newNode=document.createElement("div");
	newNode.innerHTML=content;
	newNode.addEventListener("mouseover",mouseOver);
	newNode.addEventListener ("mouseout",mouseOut);
	newNode.addEventListener ("click",clickOut);
	return newNode;

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
}
//封装成类
function TagControler(tagID,disID){
	var me=this;
	me.textID=tagID;
	me.disID=disID;
	me.tagArr=new Array();
	me.TagObj=null;
	me.Init=function(){
		me.TagObj=document.getElementById(me.textID);
		me.DisObj=document.getElementById(me.disID);
		me.TagObj.addEventListener("keyup",me.RenderTag);
		console.log('TagController inited.');
	}

	//显示tag内容,判断, 空格 回车
	me.RenderTag=function(e){
		var keyValue;	//编码
		if (window.event) {keyValue=e.keyCode;}	//IE
		else if (e.which) {keyValue=e.which;}	//chrome
		var reg=/[, ]+/;
		if(reg.test(this.value)||keyValue==13){	//13回车	
			me.tagArr=this.value.trim().split(','||' ',1);
			var newNode=DeletableNode(me.tagArr[0]);
			me.AppendNode(newNode);
			me.TagObj.value="";
		}
	}
	me.AppendNode=function(node){
		if (node!=null&&tagRepeat(node.innerHTML)){
			if (me.DisObj.childElementCount>=10) {
				me.DisObj.removeChild(me.DisObj.firstChild);
			}
			me.DisObj.appendChild(node);
			return true;
		}	
		return false;
	}

	//判断tag内容是否重复
	function tagRepeat(tagValue){
		for (var i = 0; i < me.DisObj.childElementCount; i++) {
			if (me.DisObj.children[i].innerHTML==tagValue) {
				return 0;	//找到重复
			}
		}
		return 1;
	}

}

function TextControler(textID,disID,buttonID){
	var me=this;
	me.textID=textID;
	me.disID=disID;
	me.buttonID=buttonID;
	me.textArr=new Array();
	me.Init=function(){
		me.TextObj=document.getElementById(me.textID);
		me.DisObj=document.getElementById(me.disID);
		me.ButtonObj=document.getElementById(me.buttonID);
		me.ButtonObj.addEventListener("click",me.TextIn);

	}

	//文本输出
	me.TextIn=function(){
		var reg=/^[0-9a-zA-Z\u4e00-\u9fa5]+$/;
		var start=0;
		for (var i = 0; i < me.TextObj.value.length; i++) {
			if(!reg.test(me.TextObj.value[i])){
				var temp=me.TextObj.value.substring(start,i);
				if (temp!="") {
					me.textArr.push(temp);
				}
				start=i+1;
			}
		}
		me.textArr.push(me.TextObj.value.substring(start,me.TextObj.value.length));
		me.RenderText();
	}

	//显示本文，通过逗号、空格、回车分割
	me.RenderText=function(){
		for (var i = 0; i < me.textArr.length; i++) {	
			var newNode=DeletableNode(me.textArr[i]);
			me.AppendNode(newNode);		
		}
		me.TextObj.value="";
		me.textArr=[];
	}

	me.RepeatText=function(textValue){
		for (var i = 0; i < me.DisObj.childElementCount; i++) {
			if (me.DisObj.children[i].innerHTML==textValue) {
				return 0;	//找到重复
			}
		}
		return 1;
	}

	me.AppendNode=function(node){
		if (node!=null&&me.RepeatText(node.innerHTML)){
			if (me.DisObj.childElementCount>=10) {
				me.DisObj.removeChild(me.DisObj.firstChild);
			}
			me.DisObj.appendChild(node);
			return true;
		}	
		return false;
	}
}