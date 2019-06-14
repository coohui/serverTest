$(function(){
    var fileData=[
	    {
	    	cd:165161,
	    	name:'示例.jpg',
	    	tm:'2017-07-14',
	    	tSize:'3Mb',
	    	loaded:15,
	    	upProgress:100
	    },
	    {
	    	cd:165161,
	    	name:'示例2.jpg',
	    	tm:'2017-07-16',
	    	tSize:'3.6Mb',
	    	loaded:15,
	    	upProgress:100
	    } 
    ];
    //localStorage.setItem('fileData',JSON.stringify(fileData));
    fileData=JSON.parse(localStorage.getItem('fileData'))||[];

    function init(id){
    	var html='';
    	console.log(fileData);
    	for(var i=0;i<fileData.length;i++){
    		var file=fileData[i];
		    html+='<ul class="clomun" data-id="'+file.cd+'">'+
                        '<li class="c1 col" title="'+file.name+'">'+file.name+'</li>'+
                        '<li class="c2 col">' + file.tSize + '</li>'+
                        '<li class="c3 col">'+file.tm+'</li>'+
                        '<li class="c4 col upLasttime">--</li>'+
                        '<li class="c5 col upProgress">'+file.upProgress+'%</li>'+
                        '<li class="c6 col"><span class="Pause" data-id="'+file.cd+'">暂停</span><span class="Delete" data-id="'+file.cd+'">删除</span><span class="Download" data-id="'+file.cd+'">下载</span></li>'+
                     '</ul>';
    	}
        $(id +' .init').append(html);   
    };

    init('#upCool');

    var params={
			url:'http://10.100.9.63:8090/upCool/upload.php',
			onSelect:function(file,size){
                if(localStorage.getItem(file.cd)){this.isBreakOn=JSON.parse(localStorage.getItem(file.cd))};//有上传过
				var html='<ul class="clomun" data-id="'+file.cd+'">'+
	                        '<li class="c1 col" title="'+file.name+'">'+file.name+'</li>'+
	                        '<li class="c2 col">' + size + '</li>'+
	                        '<li class="c3 col">'+_timeFormat('yyyy-MM-dd')+'</li>'+
	                        '<li class="c4 col upLasttime">--</li>'+
	                        '<li class="c5 col upProgress" id="fileId_'+file.cd+'">--</li>'+
	                        '<li class="c6 col"><span class="Pause" data-id="'+file.cd+'">暂停</span><span class="Delete" data-id="'+file.cd+'">删除</span><span class="Download" data-id="'+file.index+'">下载</span></li>'+
	                     '</ul>';
				$("#"+this.id+' .upPreview').append(html);
	            function _timeFormat(format){
	                var date=new Date();
	                var o = {
	                    "M+": date.getMonth() + 1, // month
	                    "d+": date.getDate(), // day
	                    "h+": date.getHours(), // hour
	                    "m+": date.getMinutes(), // minute
	                    "s+": date.getSeconds(), // second
	                    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
	                    "S": date.getMilliseconds()
	                };
	                if (/(y+)/.test(format))
	                    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	                for (var k in o)
	                    if (new RegExp("(" + k + ")").test(format))
	                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	                return format;
	            };
			},
			formatError:function(){
                alert('您上传的文件格式不正确！'); 
			},
			onProgress : function(file,percent) {
				$('#fileId_'+file.cd).html(percent + '%');
			},
			onSuccess : function(file, response) {
			    var data = JSON.parse(response)[0];
			    $('#fileId_'+file.cd).html('100%');
			    data&&fileData.push(data);
			    localStorage.removeItem(file.cd);
			    localStorage.setItem('fileData',JSON.stringify(fileData));
				console.log(data);
			},
			onFailure:function(file,data) {
				alert('上传失败！');
			},
			onComplete:function(fileFilter) {
				alert('文件已上传，请保存！');
			},
			onLoad:function(_this){},
			onDelete:function(_this){
               _this.parents('.clomun').remove();
               this.funDeleteArr(fileData,_this.attr('data-id'));
               localStorage.removeItem(_this.attr('data-id'));
               localStorage.setItem('fileData',JSON.stringify(fileData));
               var html='<ul class="clomun">'+
                          '<li class="noData">暂无数据</li>'+
                        '</ul>';
			   if(!$('#'+this.id+' .clomun').length>0){
			   	   $('#'+this.id+' .init').append(html);
			   }
			},
			onPlay:function(_this){},
		    funDeleteArr(arr,elem){//删除数组中的某个元素
	          for(var i=0;i<arr.length;i++){
	            if(arr[i].cd==elem){
	               arr.splice(i,1);
	               break;
	            }
	          }
		    },
			ieStart:function(){
				//alert('开始IE上传！');
			},
			ieEnd:function(data){
				alert('成功');
			},
			ieFailure:function(){
				alert('失败');
			}
	};
	params.id='upCool';
	upCool.init(params);

	//params.id='upCool2';
	//params.isAutoUp=false;
	//upCool.init(params);
})