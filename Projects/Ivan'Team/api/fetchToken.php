<?php
require_once 'common.php';
$RongSDK = new RongCloud\RongCloud(APPKEY, APPSECRET);

$userId = $_POST['user_id'];

$user = [
    'id' => $userId,
    'name' => 'Ivan',//用户名称
    'portrait' => 'http://7xogjk.com1.z0.glb.clouddn.com/IuDkFprSQ1493563384017406982' //用户头像
];
$result = $RongSDK->getUser()->register($user);

echo  json_encode($result);

?>
