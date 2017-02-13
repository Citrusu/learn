// JavaScript Document
define(function(require, exports, module) {
    var layer = require('./layer.js');
  	
	/**
	 * closeAll 关闭全部
	 * @param 无
	**/
	etTools.closeAll = function(){
		layer.closeAll();
	};
	/**
	 * alert 警告消息
	 * @param content 提示内容
	 * @param callback 回调函数
	**/
	etTools.alert = function(content,callback){
		if(typeof content =='undefined'){
			content = '请定义提示内容';
		}
		layer.open({
			title: '提示',
			content: content,
			btn: ['确定'],
			yes: function(index){
				if(typeof callback !='undefined'){
					callback();
				}
				layer.close(index);
			}
		});
	}
	
	/**
	 * confirm 确认消息
	 * @param content 提示内容
	 * @param yes 确认时回调函数
	 * @param no 取消时回调函数
	**/
	etTools.confirm = function(content,yes,no){
		if(typeof content =='undefined' || typeof yes =='undefined' || typeof no =='undefined'){
			return false;
		}
		layer.open({
			title: '提示',
			content: content,
			btn: ['确定','取消'],
			yes: function(index){
				yes();
				layer.close(index);
			},
			no: function(index){
				no();
				layer.close(index);
			}
		});
	}
	
	/**
	 * prompt 提问
	 * @param content 提示内容
	 * @param yes 确定按钮回调函数
	 * @param value 文本框默认值
	**/
	etTools.prompt = function(title,yes,value,content){
		if(typeof title =='undefined'){
			title = '请在对话框中输入内容：';
		}
		if(typeof value =='undefined'){
			value = '';
		}
		if(typeof content =='undefined'){
			content = '<div class="prompt-content"><input type="text" value="'+value+'" class="prompt-content-input" id="promptContent"/></div>';
		}
		
		layer.open({
			title: title,
			content: content,
			btn: ['确定','取消'],
			yes: function(index){
				yes($('#promptContent').val());
				layer.close(index);
			},
			no: function(index){
				layer.close(index);
			}
		});
		//设置弹窗位置上面一点
		var ltop = ($(window).height()-$('.layermbox0 .layermchild').height()-200)/2;
		var lleft = ($(window).width()-$('.layermbox0 .layermchild').width())/2;
		
		$('.layermbox0 .layermchild').css({'position':'absolute','top':ltop+'px','left':lleft+'px'});
		
		$('#promptContent').focus();
	}
	
	/**
	 * tips 短暂提示
	 * @param content 提示内容
	 * @param time 提示时间，默认为3秒
	**/
	etTools.tips = function(content,time){
		if(typeof content =='undefined'){
			return false;
		}
		if(typeof time =='undefined'){
			time = 3;
		}
		layer.open({
			content: content,
			time: time
		});
	}
	
	/**
	 * loading 正在加载提示
	 * @param content 提示内容
	 * @param time 提示时间，默认为3秒
	**/
	etTools.loading = function(content,time){
		if(typeof content =='undefined'){
			return false;
		}
		if(typeof time =='undefined'){
			time = 3;
		}
		layer.open({
			type: 2,
			time: time,
			content: content
		});
	}
	
	/**
	 * loading toast提示
	 * @param type  提示类型
	 * @param text  提示文字
	 * @param shade 是否遮罩
	 * @param time  显示时间
	**/
	etTools.toast = function(param){
		if(typeof param.shade =='undefined'){
			param.shade = true;
		}
		if(typeof param.time =='undefined'){
			param.time = 3;
		}
		
		layer.open({
			type : 1,
			className: 'ui-toast',
			content: '<i class="iconfont icon-tips-'+param.type+'"></i><p class="ui-icon-content">'+param.text+'</p>',
			shade : param.shade,
			time: param.time
		});
		if(typeof param.callback !='undefined'){
			setTimeout(function(){param.callback();},param.time*1000);
		}
	};
	
	/**
	 * pophtml 自定义html
	 * @param html html内容
	 * @param shade 是否遮罩
	**/
	etTools.pophtml = function(param){
		if(typeof param.shade =='undefined'){
			param.shade = true;
		}
		layer.open({
			type : 1,
			className: 'ui-pophtml',
			content: param.content,
			shade : param.shade
		});
		if(typeof param.callback !='undefined'){
			param.callback();
		}
	}
	
	/**
	 * actionsheet 底部菜单
	 * @param title 提示内容
	 * @param btn 按钮组，必须是对象
	 * @param param 用于回调函数的参数，比如可以把要删除的文章的Id作为一个参数
	**/
	etTools.actionsheet = function(title,btn,param){
		if(typeof title =='undefined' || typeof btn =='undefined'){
			return false;
		}
		//如果菜单已经存在，则需要清除该菜单的HTML结构
		if($('#actionsheet').length>0){
			$('#actionsheet').remove();
			window.actionsheetParam = undefined;
		}
		
		
		window.actionsheetParam = param; //将参数注册到全局变量下面
		
		//组装UI代码
		var html = '';
		html += '<div class="ui-actionsheet" id="actionsheet">  ';
		html += '<div class="ui-actionsheet-cnt">';
		html += '<h4>'+title+'</h4> ';
		$.each(btn,function(i,n){
			if(typeof n['btnClass'] =='undefined'){
				n['btnClass'] = '';
			}		
			html += '<a id="actionsheet'+n['btnId']+'" class="'+n['btnClass']+'">'+n['btnText']+'</a>';
			
			//先解除绑定，再进行绑定
			$('body').off('touchend',"#actionsheet"+n['btnId']);
			$('body').on('touchend',"#actionsheet"+n['btnId'],function(){
				console.log('按钮被点击');
				n['btnCallback'](window.actionsheetParam);
				$('#actionsheet').remove();
				window.actionsheetParam = undefined;
			});
		});
		html += '<a onClick="$(\'#actionsheet\').remove();window.actionsheetParam = undefined;">取消</a>';
		html += '</div>';
		html += '</div>';
		
		$('body').append(html);
		$('#actionsheet').addClass('show');
	}
});