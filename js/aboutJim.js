$(function(){
	var aside_idF=function(){
		$("#aside_ids").find("li").bind("click",function(){
			$("#aside_ids").find("li").removeClass("current");
			$(this).addClass("current");
		});
	},mousewheel_ev=function(){
		var windowT=0;
		var len=$(".aboutJim").find("section").length;
		$(window).bind("mousewheel",function(){
			var dir=windowT-$(window).scrollTop();
			if(dir!=0)
			{
				windowT=$(window).scrollTop();
				for(var i=len-1;i>=0;i--)
				{
					var abs_posT=$(".aboutJim").find("section:eq("+i+")").offset().top;
					var H_judge=windowT+$(window).height()/2;
					if(H_judge>abs_posT)
					{
						$("#aside_ids").find("li").removeClass("current");
						$("#aside_ids").find("li:eq("+i+")").addClass("current");
						return false;
					}
				}
			}
			var moveTop=129-windowT/10;
			if(moveTop>30)
			{
				$(".aside_ids").css("top",moveTop+"px");
			}
			else
			{
				$(".aside_ids").css("top","30px");
			}
			$(".skill_det").hide();
		});
	};
	aside_idF();
	mousewheel_ev();
	
	var loadXMLDoc=function(url,asyn,fn){
		if(window.XMLHttpRequest)
		{
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=fn;
		xmlhttp.open("GET",url,asyn);
		xmlhttp.send();
	},getDetail=function(url,name){
		loadXMLDoc(url,true,function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200)
			{
				var xmlDoc=xmlhttp.responseXML,skillNum=xmlDoc.getElementsByTagName("skill").length;
				for(var i=0;i<skillNum;i++)
				{
					var skillName=xmlDoc.getElementsByTagName("skill")[i].getAttribute("name");
					if(skillName==name)
					{
						var introduceP=xmlDoc.getElementsByTagName("introduce")[i].getElementsByTagName("p");
						$(".skill_det").find(".context").html("");
						for(var j=0;j<introduceP.length;j++)
						{
							var introduceP_toHtml="<p>"+introduceP[j].firstChild.nodeValue+"</p>";
							$(".skill_det").find(".context").append(introduceP_toHtml);
						}
					}
				}
			}
		});
	},getTheDetail=function(){
		$(".skills table td").find("a").bind("mouseover",function(){
			var sName=$(this).attr("title"),sIndex=$(".skills table td a").index($(this)[0]),sTop=400+sIndex*50;
			$(".skill_det").css("top",sTop+"px");
			getDetail("xml/skills_detail.xml",sName);
			$(".skill_det").show();
		});
	};
	getTheDetail();
	
	
	
	/*联系Jim——开始*/
	$("body").append("<div class='contactJim'></div>");
	$("#contactJim").bind("click",function(){
		var contactJim_text="<div class='contactJim_bg'></div><div class='contact_context'><span class='close'>×</span><a href='index.html' title='Jim个人网站'></a><ul class='contact_maintext'><li><div class='tel'></div><span>Tel:15602291936</span></li><li><div class='qq'></div><span>QQ:1471526051</span></li><li><div class='wechat'></div><span>WeChat:1471526051</span></li><li><div class='email'></div><span>Email:15602291936@163.com</span></li></ul></div>";
		$(".contactJim").html(contactJim_text);
		$(".contact_context").find(".close").bind("click",function(){
			$(".contactJim").html("");
		});
	});
	/*联系Jim——结束*/
	
})
