var upCool={
      init:function(config){
          var defaultOption={fileFilter:[],isAutoUp:true,field:{},isBreakOn:{start:0,section:1024*1024},isUpload:false};
          var settings= $.extend({},defaultOption,config);   
          var fileBtn=$('#'+settings.id+' .upFile');
          var sub=$('#'+settings.id+' .upSub');
          var iTarget=$('#'+settings.id+' .ieIframe');
          var ieForm=$('#'+settings.id+' .ieForm');
          var _this=this;

          _bindBtn();//入口

          function _bindBtn(){
              var isIe=_this.checkIe();
              _Download();
              _Delete();
              _PausePlay();

              //上传按钮提交
              if (sub.length&&!settings.isAutoUp&&!settings.isUpload) {
                sub.unbind('click').on('click',function(){
                    _funUploadFile(settings.fileFilter);
                    settings.fileFilter=[];
                });
                sub.show();
              } 

              if (fileBtn.length>0) {//文件选择控件选择
                $(fileBtn).change(function(e){
                    if(isIe){//IE8、9
                      _ieUp();
                    }else{
                      _funGetFiles(e);
                    }
                });
              };
          };

          function _ieUp(){
    			    ieForm.attr('action',settings.url);
    			    upSub.unbind('click').on('click',function(){
    				    ieForm.unbind('submit').on('submit',function(){
    				    	settings.ieStart&&settings.ieStart();
    				        upIframe.unbind('load').on('load',function(){
    				        	var html=document.getElementById(settings.id).getElementsByTagName('iframe').contentWindow.document.getElementsByTagName("body")[0].innerHTML;
    				            if(html&&html!=''){
    				                var data=JSON.parse(document.getElementById(settings.id).contentWindow.document.getElementsByTagName("body")[0].innerHTML);
    				                settings.ieEnd&&settings.ieEnd(data);
    				                html='';
    				                $(fileBtn).val("");
    				            }else{
    				            	settings.ieFailure&&settings.ieFailure();
    				            };
    				        })
    				    });
    			    });
              if(settings.isAutoUp){
                upSub.trigger('click');
              }else{
                sub.show();
              }
          };

          function _funGetFiles(e) {//获取选择文件，file控件或拖放
              //_funDragHover(e); // 取消鼠标经过样式
              var files = e.target.files || e.dataTransfer.files;// 获取文件列表对象
              var arrFiles=[];
              for(var i=0;i<files.length;i++){
                if(_this.funGetMediaType(files[i].name).mulTp==0){
                    settings.formatError&&settings.formatError();
                    return false;
                 };
                 arrFiles[i]=files[i];
              };
              _funDealFiles(arrFiles);
              return this;
          };

          function _funDealFiles(files) {//选中文件的处理与回调
              for(var i=0;i<files.length;i++){//执行选择回调
                  files[i].cd = String(files[i].lastModified)+files[i].size;//增加唯一索引值
                  settings.fileFilter[i]=files[i].cd;
                  var size = _this.funConversionUnit(files[i].size);
                  settings.onSelect&&settings.onSelect(files[i],size);
                  if(settings.isAutoUp){
                    _funSetFile(files[i],i)
                  }
              };
              return this;
          };

          function _funSetFile(file,num){//把文件切割成N份分别上传
              var breakOn=settings.isBreakOn; 
              if(breakOn.section){
                var len=Math.ceil(Number(file.size)/Number(breakOn.section));
              }else{
                breakOn.section=file.size;
                var len=1;
              }
              var arr=[];
              for(var i=0;i<len;i++){
                 var start=i*breakOn.section;
                 var obj={
                    name:file.name,
                    sFile:_this.funFileSlice(file,start,start+breakOn.section), 
                    tSize:file.size,
                    cd:file.cd,
                    index:i,
                    start:start,
                    len:len
                };
                arr.push(obj);
              }
              _funUploadFile(arr[0],arr,file);//先上传第一份
          };

          function _funUploadFile(sfile,arrFiles,file) {
                var fd = _this.setField(sfile);
                var xhr= new XMLHttpRequest();
                if (xhr.upload) {
                  xhr.upload.addEventListener("progress", function(e) {// 上传中
                    var total=Number(e.total);
                    var load=Number(e.loaded);
                    var sectionNum=(sfile.start+load)/sfile.tSize;
                    var percent=(sectionNum*100).toFixed(0);
                    percent=percent>100?100:percent;
                    settings.onProgress&&settings.onProgress(sfile, percent);
                  }, false);
                  xhr.onreadystatechange = function(e) {// 文件上传成功或是失败
                    if (xhr.readyState == 4) {
                      if (xhr.status == 200) {
                        var data=JSON.parse(xhr.responseText)[0];
                        if(arrFiles.length>data.index){
                          _funUploadFile(arrFiles[data.index],arrFiles);
                        }else{
                          settings.onSuccess&&settings.onSuccess(sfile, xhr.responseText);

                          settings.fileFilter=_this.funDeleteFile(sfile.cd,settings.fileFilter);// 上传成功 删除fileFilter数组的指定的file对象
                          if (!settings.fileFilter.length) {
                            settings.onComplete&&settings.onComplete(settings.fileFilter);//全部完毕  
                            $(fileBtn).val("");
                            settings.fileFilter=[];
                          }
                        }
                      }else{
                        settings.onFailure&&settings.onFailure(file, xhr.responseText);   
                      }
                    }
                  }; 
                };
                xhr.open("POST", settings.url);// 开始上传
                xhr.send(fd);
          };

          function _funDragHover(e) {//文件拖放
              e.stopPropagation();
              e.preventDefault();
              this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
              return this;
          };

          function _Download(){
             $('#'+settings.id).on('click','.Download',function(){
                settings.onLoad&&settings.onLoad($(this),settings.id); 
             }); 
          };

          function _Delete(){
             $('#'+settings.id).on('click','.Delete',function(){
                settings.onDelete&&settings.onDelete($(this),settings.id); 
             }); 
          };
          function _PausePlay(){
             $('#'+settings.id).on('click','.Pause',function(){
                settings.onPlay&&settings.onPlay($(this),settings.id); 
             }); 
          }
      },


      checkIe:function(){
          if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
              return 6;
          }else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
              return 7;
          }else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
              return 8;
          }else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
              return 9;
          };
          return 0;
      },
      filter:function(files){//fileFilter过滤后的文件数组
          var arrFiles = [];
          for (var i = 0, file; file = files[i]; i++) {
            arrFiles.push(file);  
/*            if (file.type.indexOf("image") == 0||1) {
              if (file.size >= 5012000) {
                alert('您这张"'+ file.name +'"图片大小过大，应小于5M');  
              } else {
                arrFiles.push(file);  
              }     
            } else {
              alert('文件"' + file.name + '"不是图片。');  
            }*/
          }
          return arrFiles;
      },
      setField:function(obj){// 遍历需传给后台的字段
          var fd = new FormData();
          for (key in obj) {
            fd.append(key, obj[key]);
          }
          return fd;
      },
      funFileSlice:function(file,startByte,endByte){//文件截取
          if(file.slice){ return file.slice(startByte,endByte);}
          if(file.webkitSlice){ return  file.webkitSlice(startByte,endByte);}// 兼容webkit
          if(file.mozSlice){ return  file.mozSlice(startByte,endByte);}// 兼容firefox
          return null;
      },
      funGetMediaType:function(str) {//获取媒体类型
          var name = str.split('.');
          var len=name.length-1;
          var ext = '';
          var obj={eType:name};
          if (name[len]) {
             ext = name[len].toLowerCase()
          };
          if (/^mp4|m4a|mmf|mmm|mov|mp2|mp2v|avi|rmvb|asf|wmv|flv|3gp|mpe?g$/.test(ext)) {
              obj.cType='视频音频';
              obj.mulTp=3;
          } else if (/^png|bmp|jpg|gif|bmp?g$/.test(ext)) {
              obj.cType='图片';
              obj.mulTp=2;
          } else if (/^docx|xlsx|doc|ppt|wps|pdf|txt|rtf?g$/.test(ext)) {
              obj.cType='文档';
              obj.mulTp=1;
          } else if (/^exe|dll|com|bat|app|cmd|html|htm|shtml|js|ini?g$/.test(ext)){
              obj.cType='非法文件';
              obj.mulTp=0;
          } else {
              obj.cType='其他';
              obj.mulTp=9;
          };
          return obj;
      },
      funConversionUnit:function(num){//转换单位
          if(num/1024>1024){
              num=parseFloat((num/1048576)).toFixed(2)+'Mb'; 
          }else {
              num=parseFloat((num/1024)).toFixed(2)+'Kb';  
          }
          return num;
      },
      funDeleteFile:function(fileDelete,fileFilter) {//删除对应已传完的文件
          var arrFile = [];
          for (var i = 0;i<fileFilter.length; i++) {
            if (fileDelete != fileFilter[i]) {
              arrFile.push(fileFilter[i]);
            } 
          };
          return arrFile;
      }
};



