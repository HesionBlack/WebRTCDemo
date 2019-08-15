<?php
  $file = "./upload/{$_POST['name']}.jpg";//文件报错路径
  $img = str_replace('data:image/jpeg;base64,', '', $_POST['data']);//将逗号签名的都匹配掉
  echo $img;
  $img = str_replace(' ', '+', $img);
  $res = file_put_contents($file,base64_decode($img));//注意base640decode()方法不要忘记写了,必须要解码才能保存
  if($res){
      die(1);
  }
?>