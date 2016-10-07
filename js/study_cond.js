$(function(){
	var link_len=$("#focus_info").find("li").length;
	var pic_show=function(){
			for(var i=0;i<link_len;i++)
			{
				if($("#focus_info").find("li:eq("+i+")").hasClass("current"))
				{
					$("#focus_pic").find("li:eq("+i+")").fadeIn("slow");
				}
				else
				{
					$("#focus_pic").find("li:eq("+i+")").fadeOut("slow");
				}
			}
		},pic_play=function(){
			var pic_play_i=0;
			var pic_play_l=link_len-1;
			if($("#focus_info").find("li:eq("+pic_play_l+")").hasClass("current"))
			{
				pic_play_i=0;
			}
			else
			{
				for(var i=0;i<pic_play_l;i++)
				{
					if($("#focus_info").find("li:eq("+i+")").hasClass("current"))
					{
						pic_play_i=i+1;
					}
				}
			}
			$("#focus_info").find("li:eq("+pic_play_i+")").addClass("current").siblings().removeClass("current");
			pic_show();
		};
		pic_show();
		var pic_loop=setInterval(pic_play,3000);
		$("#recom_focus").hover(function(){
			clearInterval(pic_loop);
		},function(){
			pic_loop=setInterval(pic_play,3000);
		});
		$("#focus_info").find("li").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			pic_show();
		});
		/*Tab转换 Start*/
		var study_cond_show=function(id){
			var len=$(id).find("h2").length;
			for(var i=0;i<len;i++)
			{
				if($(id).find("h2:eq("+i+")").hasClass("up"))
				{
					$(id+" #study_cond_sub1").find("ul:eq("+i+")").show();
				}
				else
				{
					$(id+" #study_cond_sub1").find("ul:eq("+i+")").hide();
				}
			}
		};
		$("#myDesign").find("h2").click(function(){
			$(this).addClass("up").siblings().removeClass("up");
			study_cond_show("#myDesign");
		});
		$("#techOfWeb").find("h2").click(function(){
			$(this).addClass("up").siblings().removeClass("up");
			study_cond_show("#techOfWeb");
		});
		$("#logicAndInf").find("h2").click(function(){
			$(this).addClass("up").siblings().removeClass("up");
			study_cond_show("#logicAndInf");
		});
		$("#myBooks").find("h2").click(function(){
			$(this).addClass("up").siblings().removeClass("up");
			study_cond_show("#myBooks");
		});
		/*Tab转换 End*/
		
		/*myDesign  Start*/
		var toHash=function(){
			var localHash=window.location.hash;
			var context_index=localHash.replace("#","");
			$("#main_context_title").find("h1:eq("+context_index+")").addClass("current").siblings().removeClass("current");
			main_context_show();
		},main_context_show=function(){
			var len=$("#main_context_title").find("h1").length;
			for(var i=0;i<len;i++)
			{
				if($("#main_context_title").find("h1:eq("+i+")").hasClass("current"))
				{
					$("#mian_context_sub").find("ul:eq("+i+")").show();
				}
				else
				{
					$("#mian_context_sub").find("ul:eq("+i+")").hide();
				}
			}
		};
		toHash();
		$("#main_context_title").find("h1").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			main_context_show();
		});
		$(".menu .parent .parent").find("li.current").click(function(){
			var context_index=$(this).index();
			$("#main_context_title").find("h1:eq("+context_index+")").addClass("current").siblings().removeClass("current");
			main_context_show();
		});
		/*myDesign  End*/
		
		
			
	/*联系Jim——开始*/
	$("body").append("<div class='contactJim'></div>");
	$("#contactJim").bind("click",function(){
		var pathname=location.pathname.split("/");
		var contactJim_text;
		if(pathname[pathname.length-1]=="study_cond.html")
		{
			contactJim_text="<div class='contactJim_bg'></div><div class='contact_context'><span class='close'>×</span><a href='index.html' title='Jim个人网站'></a><ul class='contact_maintext'><li><div class='tel'></div><span>Tel:15602291936</span></li><li><div class='qq'></div><span>QQ:1471526051</span></li><li><div class='wechat'></div><span>WeChat:1471526051</span></li><li><div class='email'></div><span>Email:15602291936@163.com</span></li></ul></div>";
		}
		else
		{
			contactJim_text="<div class='contactJim_bg'></div><div class='contact_context'><span class='close'>×</span><a href='../index.html' title='Jim个人网站'></a><ul class='contact_maintext'><li><div class='tel'></div><span>Tel:15602291936</span></li><li><div class='qq'></div><span>QQ:1471526051</span></li><li><div class='wechat'></div><span>WeChat:1471526051</span></li><li><div class='email'></div><span>Email:15602291936@163.com</span></li></ul></div>";
		}
		$(".contactJim").html(contactJim_text);
		$(".contact_context").find(".close").bind("click",function(){
			$(".contactJim").html("");
		});
	});
	/*联系Jim——结束*/
	
});
