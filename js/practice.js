$(function(){
	/*焦点图 ——开始*/
	var cam_len=$(".focus_control").find("a").length,pic_show=function(){
		for(var i=0;i<cam_len;i++)
		{
			if($(".focus_control").find("a:eq("+i+")").hasClass("current"))
			{
				var focus_bot=$(".focus_pic").find("a:eq("+i+") img").attr("alt");
				$(".focus_bottom").html(focus_bot);
				$(".focus_pic").find("a:eq("+i+")").show();
			}
			else
			{
				$(".focus_pic").find("a:eq("+i+")").hide();
			}
		}
	},focus_autoplay=function(){
		var foc_con_i=0;
		var foc_con_l=cam_len-1;
		if($(".focus_control").find("a:first").hasClass("current"))
		{
			foc_con_i=foc_con_l;
		}
		for(var i=foc_con_l;i>0;i--)
		{
			if($(".focus_control").find("a:eq("+i+")").hasClass("current"))
			{
				foc_con_i=i-1;
			}
		}
		$(".focus_control").find("a:eq("+foc_con_i+")").addClass("current").siblings().removeClass("current");
		pic_show();
	},pic_loop=setInterval(focus_autoplay,3000),initial_recomAfocus=function(){
		pic_show();
		$(".recom_left").hover(function(){
			clearInterval(pic_loop);
		},function(){
			pic_loop=setInterval(focus_autoplay,2000);
		});
		$(".focus_control").find("a").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			pic_show();
		});
	};
	initial_recomAfocus();
	/*焦点图 ——结束*/
	
	/*main_context----start*/
	var toPractice=function(){
		var id=location.href.split("?")[1].split("#")[0].split("=")[1];
		var idx=id+1;
		var nav_context=$(".recom_right .sub_nav").find("a:eq("+id+") span").text();
		nav_context=nav_context.replace(">","");
		$("#select b").text(nav_context);
		$(".triangle-up").show();
		$(".sub_context").show();
		$(".context_title").find("span:eq("+idx+")").addClass("current").siblings().removeClass("current");
	};
	$(".context_title span").bind("click",function(){
		var select_context=$(this).find("a big").text();
		$(this).addClass("current").siblings().removeClass("current");
		$(".context_title span").css("display","none");
		$(".context_title #select").css("display","block");
		if(select_context)
		{
			$("#select b").text(select_context);
			$(".triangle-up").show();
			$(".sub_context").show();
		}
	});
	$(".context_title span").hover(function(){
		$(".context_title span").css("display","block");
	},function(){
		$(".context_title span").css("display","none");
		$(".context_title #select").css("display","block");
	});
	$(".recom_right .sub_nav a").bind("click",function(){
		var idx=$(this).index()+1;
		var nav_context=$(this).find("span").text();
		nav_context=nav_context.replace(">","");
		$("#select b").text(nav_context);
		$(".triangle-up").show();
		$(".sub_context").show();
		$(".context_title").find("span:eq("+idx+")").addClass("current").siblings().removeClass("current");
	});
	/*AJAX*/
	var xmlhttp,loadXMLDoc=function(url,asyn,fn){
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
	},getXML=function(judge,url){
		loadXMLDoc(url,true,function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200)
			{
				var jdID,xmlDoc=xmlhttp.responseXML,prac_len=xmlDoc.getElementsByTagName("practice").length;
				if(judge=="实习经历")
				{
					jdID="internship";
				}
				else
				{
					jdID="partTimeJob";
				}
				for(var i=0;i<prac_len;i++)
				{
					if(xmlDoc.getElementsByTagName("practice")[i].getAttribute(jdID))
					{
						var prac_context="";
						var prac_title=xmlDoc.getElementsByTagName("title")[i].firstChild.nodeValue;
						var prac_time=xmlDoc.getElementsByTagName("time")[i].firstChild.nodeValue;
						var prac_duty=xmlDoc.getElementsByTagName("duty")[i].firstChild.nodeValue;
						var prac_context=xmlDoc.getElementsByTagName("context")[i].firstChild.nodeValue;
						var prac_image=xmlDoc.getElementsByTagName("image")[i].firstChild.nodeValue;
						prac_context="<div class='context'><h2>"+prac_title+"<small class='duty'>-"+prac_duty+"-</small></h2><span class='time'>"+prac_time+"</span><span>"+prac_context+"</span><img src="+prac_image+" alt='' /></div>";
						$(".main_context").find(".sub_context").append(prac_context);
					}
						
				}
				
			}
		});
	};
	/*main_context----end*/
	
	
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
	
	/*main_context的第一个函数，放到前面会出现bug*/
	toPractice();
});
