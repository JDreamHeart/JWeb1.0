$(function(){
	/*焦点图--开始*/
	var focPic={
		count:0,
		show:function(){
			$(".focInfo").find("img").fadeOut("fast",function(){
				for(var i=0;i<$("#FCPUl").find("li").length;i++)
				{
					var $li=$("#FCPUl").find("li:eq("+i+")");
					if($li.hasClass("current"))
					{
						var src=$li.find("img").attr("src");
						var title=$li.find("img").attr("title");
						$(".focInfo").find("h2").text(title);
						$(".focInfo").find("img").attr("src",src);
					}
				}
			});
			$(".focInfo").find("img").fadeIn("slow")
		},
		play:function(){
			var play_i=0;
			var play_l=$("#FCPUl").find("li").length-1;
			if($("#FCPUl").find("li:eq("+play_l+")").hasClass("current"))
			{
				play_i=0;
			}
			for(var i=0;i<play_l;i++)
			{
				if($("#FCPUl").find("li:eq("+i+")").hasClass("current"))
				{
					play_i=i+1;
				}
			}
			focControl.tomove(play_i*72);
			$("#FCPUl").find("li:eq("+play_i+")").addClass("current").siblings().removeClass("current");
			focPic.show();
		},
		init:function(){
			focPic.show();
			var pic_loop=setInterval(focPic.play,4000);
			$(".focusPic").hover(function(){
				clearInterval(pic_loop);
			},function(){
				pic_loop=setInterval(focPic.play,4000);
			});
			$("#FCPUl").find("li").bind("click",function(){
				$(this).addClass("current").siblings().removeClass("current");
				focPic.show();
			});
		}
	};
	/*焦点图--结束*/
	
	/*焦点图控制区--开始*/
	var focControl={
		count: 0,
		toShow:function(){
			$(".focControl").show();
		},
		toHide:function(){
			$(".focControl").hide();
		},
		tomove:function(n){
			var num=this.isBorder(n);
			$("#FCPUl").css("top",num);
		},
		move:function(moveT1){
			var setT,moveT0=parseInt($("#FCPUl").css("top").replace("px","")),loop=function(m,moveT,flag){
				$("#FCPUl").css("top",m);
				if(flag)
				{
					m=m-10;
					if(m<moveT)
					{
						clearTimeout(setT);
					}
					else
					{
						setT=setTimeout(function(){loop(m,moveT,flag);},20);
					}
				}
				else
				{
					m+=10;
					if(m>moveT)
					{
						clearTimeout(setT);
					}
					else
					{
						setT=setTimeout(function(){loop(m,moveT,flag);},20);
					}
				}
			};
			loop(moveT0,moveT1,moveT0>moveT1);
		},
		isBorder:function(num){
			var focC_len=$("#FCPUl li").length,focCU=focC_len*72-308;
			if(num<=0)
			{
				num=0;
				$(".focArrow").find(".up").css("visibility","hidden");
				$(".focArrow").find(".down").css("visibility","visible");
			}
			else if(num>=focCU)
			{
				num=-focCU;
				$(".focArrow").find(".up").css("visibility","visible");
				$(".focArrow").find(".down").css("visibility","hidden");
			}
			else
			{
				num=-num;
				$(".focArrow").find(".up").css("visibility","visible");
				$(".focArrow").find(".down").css("visibility","visible");
			}
			return num;
		},
		fcpul:function(flag){
			if(flag)
			{
				this.count++;
			}
			else
			{
				this.count--;
			}
			var moveT=this.count*280;
			var moveT=this.isBorder(moveT);
			this.move(moveT);
		}
	};
	(function(){
		focPic.init();
		$(".focArrow span").bind("click",function(){
			if($(this).index()==0)
			{
				focControl.fcpul(false);
			}
			else
			{
				focControl.fcpul(true);
			}
		});
		$(".focInfo img").hover(focControl.toShow,focControl.toHide);
		$(".focControl").hover(focControl.toShow,focControl.toHide);
	}());
	/*焦点图控制区--结束*/
	
	/*indexAjax--start*/
	var indexAjax={
		xmlhttp:"",
		xmlDoc:{
			focPoint:"",
			recentPart:"",
			comments:""
		},
		xmlTagNum:{
			focPoint:0,
			recentPart:0,
			comments:0
		},
		xmlPageIdx:0,
		loadXMLDoc:function(url,fn){
			if(window.XMLHttpRequest)
			{
				this.xmlhttp=new XMLHttpRequest();
			}
			else
			{
				this.xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			this.xmlhttp.onreadystatechange=fn;
			this.xmlhttp.open("GET",url,true);
			this.xmlhttp.send();
		},
		getFocXML:function(url){
			this.loadXMLDoc(url,function(){
				if(indexAjax.xmlhttp.readyState==4&&indexAjax.xmlhttp.status==200)
				{
					var maxNum=16;
					indexAjax.xmlDoc.focPoint=indexAjax.xmlhttp.responseXML;
					indexAjax.xmlTagNum.focPoint=indexAjax.xmlDoc.focPoint.getElementsByTagName("focPic").length;
					if(indexAjax.xmlTagNum.focPoint<maxNum)
					{
						maxNum=indexAjax.xmlTagNum.focPoint;
					}
					for(var i=0;i<maxNum;i++)
					{
						var foc_context="";
						var imgSrc=indexAjax.xmlDoc.focPoint.getElementsByTagName("imgSrc")[i].firstChild.nodeValue;
						var imgTitle=indexAjax.xmlDoc.focPoint.getElementsByTagName("imgTitle")[i].firstChild.nodeValue;
						var imgAlt=indexAjax.xmlDoc.focPoint.getElementsByTagName("imgAlt")[i].firstChild.nodeValue;
						foc_context="<li><img src='"+imgSrc+"' title='"+imgTitle+"' alt='"+imgAlt+"' /></li>";
						$("#FCPUl").append(foc_context);
					}
				}
			});
		},
		/*getRecXML:function(url){
			this.loadXMLDoc(url,function(){
				if(indexAjax.xmlhttp.readyState==4&&indexAjax.xmlhttp.status==200)
				{
					var maxNum=7;
					indexAjax.xmlDoc.recentPart=indexAjax.xmlhttp.responseXML;
					indexAjax.xmlTagNum.recentPart=indexAjax.xmlDoc.recentPart.getElementsByTagName("recentness").length;
					if(indexAjax.xmlTagNum.recentPart<maxNum)
					{
						maxNum=indexAjax.xmlTagNum.recentPart;
					}
					for(var i=0;i<maxNum;i++)
					{
						var foc_context="";
						var imgSrc=indexAjax.xmlDoc.recentPart.getElementsByTagName("imgSrc")[i].firstChild.nodeValue;
						var imgTitle=indexAjax.xmlDoc.recentPart.getElementsByTagName("imgTitle")[i].firstChild.nodeValue;
						var imgAlt=indexAjax.xmlDoc.recentPart.getElementsByTagName("imgAlt")[i].firstChild.nodeValue;
						foc_context="<li><img src='"+imgSrc+"' title='"+imgTitle+"' alt='"+imgAlt+"' /></li>";
						$("#FCPUl").append(foc_context);
					}
				}
			});
		},*/
		getCommXML:function(url){
			if(!this.xmlDoc.comments)
			{
				this.loadXMLDoc(url,function(){
					if(indexAjax.xmlhttp.readyState==4&&indexAjax.xmlhttp.status==200)
					{
						var maxNum=9;
						indexAjax.xmlDoc.comments=indexAjax.xmlhttp.responseXML;
						indexAjax.xmlTagNum.comments=indexAjax.xmlDoc.comments.getElementsByTagName("comment").length;
						if(indexAjax.xmlTagNum.comments<maxNum)
						{
							maxNum=indexAjax.xmlTagNum.comments;
							$("#comment").find("#commentMore").css("visibility","hidden");
						}
						for(var i=0;i<maxNum;i++)
						{
							var comm_context="";
							var userHref=indexAjax.xmlDoc.comments.getElementsByTagName("userHref")[i].firstChild.nodeValue;
							var userImg=indexAjax.xmlDoc.comments.getElementsByTagName("userImg")[i].firstChild.nodeValue;
							var userName=indexAjax.xmlDoc.comments.getElementsByTagName("userName")[i].firstChild.nodeValue;
							var time=indexAjax.xmlDoc.comments.getElementsByTagName("time")[i].firstChild.nodeValue;
							var userContent=indexAjax.xmlDoc.comments.getElementsByTagName("userContent")[i].firstChild.nodeValue;
							comm_context="<li><section><a href='"+userHref+"'><img src='"+userImg+"' alt=''><span class='name'>"+userName+"</span></a><span class='time'>"+time+"</span></section><article>"+userContent+"</article></li>";
							$("#comment").find(".commentArea").append(comm_context);
						}
						indexAjax.xmlPageIdx++;
					}
				});
			}else{
				var xmlPageIdx_start=this.xmlPageIdx*9,xmlPageIdx_end=xmlPageIdx_start+9;
				if(xmlPageIdx_end>=this.xmlTagNum.comments)
				{
					xmlPageIdx_end=this.xmlTagNum.comments;
					$("#comment").find("#commentMore").css("visibility","hidden");
				}
				for(var i=xmlPageIdx_start;i<xmlPageIdx_end;i++)
				{
					var comm_context="";
					var userHref=this.xmlDoc.comments.getElementsByTagName("userHref")[i].firstChild.nodeValue;
					var userImg=this.xmlDoc.comments.getElementsByTagName("userImg")[i].firstChild.nodeValue;
					var userName=this.xmlDoc.comments.getElementsByTagName("userName")[i].firstChild.nodeValue;
					var time=this.xmlDoc.comments.getElementsByTagName("time")[i].firstChild.nodeValue;
					var userContent=this.xmlDoc.comments.getElementsByTagName("userContent")[i].firstChild.nodeValue;
					comm_context="<li><section><a href='"+userHref+"'><img src='"+userImg+"' alt=''><span class='name'>"+userName+"</span></a><span class='time'>"+time+"</span></section><article>"+userContent+"</article></li>";
					$("#comment").find(".commentArea").append(comm_context);
				}
				this.xmlPageIdx++;	
			}
		}
			
	};
	(function(){
		indexAjax.getFocXML("xml/index/focPointPic.xml");
		indexAjax.getCommXML("xml/index/comments.xml");
		$("#comment").find("#commentMore").click(function(){
			indexAjax.getCommXML("xml/index/comments.xml");
		});
	}());
	/*indexAjax--end*/
	
	/*联系Jim——开始*/
	(function(){
		$("body").append("<div class='contactJim'></div>");
		$("#contactJim").bind("click",function(){
			var contactJim_text="<div class='contactJim_bg'></div><div class='contact_context'><span class='close'>×</span><a href='index.html' title='Jim个人网站'></a><ul class='contact_maintext'><li><div class='tel'></div><span>Tel:15602291936</span></li><li><div class='qq'></div><span>QQ:1471526051</span></li><li><div class='wechat'></div><span>WeChat:1471526051</span></li><li><div class='email'></div><span>Email:15602291936@163.com</span></li></ul></div>";
			$(".contactJim").html(contactJim_text);
			$(".contact_context").find(".close").bind("click",function(){
				$(".contactJim").html("");
			});
		});
	}());
	/*联系Jim——结束*/
});