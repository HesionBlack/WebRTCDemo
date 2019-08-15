'usr strict'
//获取HTML页面中的video标签
var videoplay = document.querySelector('video#player');
var picture  = document.querySelector('canvas#picture');
var take = document.querySelector('button#take');
var rand = Math.random() *200 ;
picture.width=640;
picture.height=480;
//播放视频流
var constraints = {
    video:{
        width:1440,
        height:900,
        frameRate:15
    },
    audio:false
}

const localVideo = document.querySelector('video');


//播放视频流
function gotMediaStream(stream){
    videoplay.srcObject=stream;
}
// function gotLocalMediaStream(mediaStream){
//     localVideo.srcObject=mediaStream;
// }

function handleError(error){
   console.log('Error:  ',error);
}

take.onclick =function(){
        picture.getContext('2d').drawImage(videoplay,0,0,picture.width,picture.height);
        //获取base64数据并上传
        var base64Img = picture.toDataURL("image/jpeg");
        
        console.log(base64Img);
        //只能使用post,get会报错,数据太长
        $.post('save.php',
        {data:base64Img,name:rand},
        function(res){
            console.log(res);
        });
}



function download(url){
    var oA=document.createElement("a");
    oA.download='photo';
    oA.href=url;
    document.body.appendChild(oA);
    oA.click();
    oA.remove();
}
document.querySelector("button#save").onclick=function(){
    download(picture.toDataURL("image/jpeg"));
}

function uploadFileAuto(){
    picture.getContext('2d').drawImage(videoplay,0,0,picture.width,picture.height);
    //获取base64数据并上传
    var base64Img = picture.toDataURL("image/jpeg");
    console.log(base64Img);
    //只能使用post,get会报错,数据太长
    $.post('save.php',
    {data:base64Img,name:rand},
    function(res){
        console.log(res);
    });
}
function start() {
    
    
    if(!navigator.mediaDevices ||
       !navigator.mediaDevices.getUserMedia){

        console.log('getUserMedia is not supported!');
        return;

    }else{

        //var deviceId = videoSource.value; 
        var constraints = {
            video : {
                width: 640,	
                height: 480,
                frameRate:15,
                facingMode: 'enviroment'
		//,
                //deviceId : deviceId ? {exact:deviceId} : undefined 
            }, 
            audio : false 
        }

        navigator.mediaDevices.getUserMedia(constraints)
            .then(gotMediaStream)
            .catch(handleError);

        
    }
}
start();
setTimeout(function() {		
    // IE		
    if(document.all) {			document.getElementById("take").click();		}		
    // 其它浏览器		
    else {			
        var e = document.createEvent("MouseEvents");			
        e.initEvent("click", true, true);			
        document.getElementById("take").dispatchEvent(e);		
    }	
}, 4000);
