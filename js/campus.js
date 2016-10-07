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
	
	/*Ajax & xml start*/
	var page1=0,page2=0,xmlhttp,loadXMLDoc=function(url,asyn,fn){
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
	},getXML=function(ID,url){
		var AN_page,judgeID=function(ID,positive){
			if(ID=="#campus_about_activity")
			{
				if(positive)
				{
					AN_page=page1;
				}
				else
				{
					page1=AN_page;
				}
			}
			else
			{
				if(positive)
				{
					AN_page=page2;
				}
				else
				{
					page2=AN_page;
				}
			}
		};
		judgeID(ID,true);
		loadXMLDoc(url,true,function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200)
			{
				var xmlDoc=xmlhttp.responseXML,AN_len=xmlDoc.getElementsByTagName("news").length;
				var AN_page_num=Math.ceil(AN_len/9),AN_page_start=AN_page*9,AN_page_end=AN_page_start+9;
				if(AN_page==0)
				{
					AN_page_start=3;
				}
				if(AN_page_end>AN_len)
				{
					AN_page_end=AN_len;
				}
				for(var i=AN_page_start;i<AN_page_end;i++)
				{
					var campus_context="";
					var AN_a=xmlDoc.getElementsByTagName("news_a")[i].firstChild.nodeValue;
					var img_src=xmlDoc.getElementsByTagName("img_src")[i].firstChild.nodeValue;
					var img_alt=xmlDoc.getElementsByTagName("img_alt")[i].firstChild.nodeValue;
					var AN_span=xmlDoc.getElementsByTagName("news_span")[i].firstChild.nodeValue;
					var AN_time=xmlDoc.getElementsByTagName("news_time")[i].firstChild.nodeValue;
					campus_context="<li><a href="+AN_a+"><img src="+img_src+" alt="+img_alt+"><span>"+AN_span+"</span><div class='campus_AN_time'>"+AN_time+"</div></a></li>";
					$(ID).find(".campus_AN_context ul").append(campus_context);
				}
				AN_page++;
				if(AN_page==AN_page_num)
				{
					$(ID).find(".campus_AN_context #campus_AN_more").css("visibility","hidden");
				}
				else
				{
					judgeID(ID,false);
				}
				
			}
		});
	},getXML3=function(id,url){
			loadXMLDoc(url,false,function(){
			if(xmlhttp.readyState==4&&xmlhttp.status==200)
			{
				var ID="#"+id,xmlDoc=xmlhttp.responseXML,noHaveContext=function(ID){
					$(ID).find(".campus_AN_context #campus_AN_more").css("border","none");
					$(ID).find(".campus_AN_context #campus_AN_more span").text("暂未有该板块内容...");
					$(ID).find(".campus_AN_context #campus_AN_more").removeClass("getMore");
					$(ID).find(".campus_AN_context #campus_AN_more").unbind("click");
				};
				if(xmlDoc==null)
				{
					noHaveContext(ID);
				}
				else
				{
					var AN_len=xmlDoc.getElementsByTagName("news").length;
					if(AN_len==0)
					{
						noHaveContext(ID);
					}
					else
					{
						var AN_page_start=0,AN_page_end=3;
						for(var i=AN_page_start;i<AN_page_end;i++)
						{
							var campus_context="";
							var AN_a=xmlDoc.getElementsByTagName("news_a")[i].firstChild.nodeValue;
							var img_src=xmlDoc.getElementsByTagName("img_src")[i].firstChild.nodeValue;
							var img_alt=xmlDoc.getElementsByTagName("img_alt")[i].firstChild.nodeValue;
							var AN_span=xmlDoc.getElementsByTagName("news_span")[i].firstChild.nodeValue;
							var AN_time=xmlDoc.getElementsByTagName("news_time")[i].firstChild.nodeValue;
							campus_context="<li><a href="+AN_a+"><img src="+img_src+" alt="+img_alt+"><span>"+AN_span+"</span><div class='campus_AN_time'>"+AN_time+"</div></a></li>";
							$(ID).find(".campus_AN_context ul").append(campus_context);
						}
						if(AN_len==3)
						{
							$(ID).find(".campus_AN_context #campus_AN_more").css("visibility","hidden");
						}
					}
				}
			}
		});
	},clickGetMore=function(id,url){
		var ID="#"+id;
		$(ID).find(".campus_AN_context #campus_AN_more").click(function(){
			url=""+url;
			getXML(ID,url);
		});
	},initial_xmlAajax=function(){
		getXML3("campus_about_activity","xml/campus_about_activity.xml");
		getXML3("campus_about_secret","xml/campus_about_secret.xml");
		clickGetMore("campus_about_activity","xml/campus_about_activity.xml");
		clickGetMore("campus_about_secret","xml/campus_about_secret.xml");
	};
	initial_xmlAajax();
	/*Ajax & xml end*/
	
	
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
