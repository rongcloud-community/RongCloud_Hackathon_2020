<?php
require_once 'common.php';
$RongSDK = new RongCloud\RongCloud(APPKEY, APPSECRET);

$userId = $_POST['user_id'];
$roomId = $_POST['room_id'];
$chatroom = [
    'id' => $roomId,//聊天室 id
    'members' => [
        ['id' => $userId]//人员id
    ]
];
$result = $RongSDK->getChatroom()->isExist($chatroom);
$members = $result['members'];
$isInChrm = false;

if ($members[0]['isInchrm']) $isInChrm = true;

if (!$isInChrm){
    //如果用户不在聊天室中，则自动加入
    $result = $RongSDK->getUser()->isExist($chatroom);


}


echo json_encode($result);

?>
