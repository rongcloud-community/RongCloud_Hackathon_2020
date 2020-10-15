<?php
require_once 'common.php';
$RongSDK = new RongCloud\RongCloud(APPKEY, APPSECRET);

$userId = $_POST['user_id'];

$rooms = [
    'yxrs',
    'gbjd',
    'hmjmf'
];
$response = [];
foreach ($rooms as $item) {
    $chatroom = [
        'id' => $item,//聊天室 id
            'name' => $item//聊天室 name
    ];
    $result = $RongSDK->getChatroom()->get($chatroom);
    $response[$item] = count($result['users']);
}

echo  json_encode($response);

?>
