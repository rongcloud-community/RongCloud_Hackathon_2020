<?php
// 引入融云SDK
require_once './RongCloud/RongCloud.php';
// 设置融云APPKEY和APPSECRET
define("APPKEY", '8luwapkv84utl');
define('APPSECRET', 'fn5BfMEidPfp');

use RongCloud\RongCloud;
// 设置编码
header("Content-Type: application/json;charset=utf-8");
// 获取数据库查询语句
$sql = strtoupper($_POST['sql']) == null ? strtoupper($_GET['sql']) : strtoupper($_POST['sql']);

// 接收参数
$arr_get = count($_POST) == 0 ? $_GET : $_POST;

// 数据库连接
function getMysqli($server = "127.0.0.1", $uid = "rong", $pwd = "rong2020.", $db = "rong", $port = '3306')
{
    $mysqli = mysqli_connect($server, $uid, $pwd, $db, $port);
    if (!$mysqli) {
        return array(10000, "数据库连接失败:" . mysqli_connect_error());
    } else {
        // 设置数据库编码
        $mysqli->set_charset("utf8");
        // echo json_encode(array(10001, "数据库连接成功:" . mysqli_connect_error()), JSON_UNESCAPED_UNICODE);
        return $mysqli;
    }
}

// 通过手机号获取用户id
function getId($tel)
{
    $mysqli = getMysqli();
    $resultId = mysqli_query($mysqli, 'SELECT a_id FROM info WHERE tel=\'' . $tel . '\'');
    if (mysqli_num_rows($resultId) > 0) {
        mysqli_close($mysqli);
        return mysqli_fetch_assoc($resultId)['a_id'];
    }
}

// 判断需要进行的功能
switch ($arr_get["m"]) {
    case "1001": // 用户注册
        if ($arr_get["tel"] && $arr_get['pwd'] && $arr_get['name'] && $arr_get['identity']) {
            // 连接数据库
            $mysqli = getMysqli();
            // 判断手机号码是否被注册
            $resultTel = mysqli_query($mysqli, 'SELECT tel  FROM info WHERE tel=\'' . $arr_get['tel'] . '\'');
            if (mysqli_num_rows($resultTel) == null) {
                // 判断是否设置头像
                $portrait = $arr_get["portrait"] == "" ? "http://hbimg.b0.upaiyun.com/9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658" : $arr_get["portrait"];
                // 判断是否有设置昵称
                $fullname = $arr_get["fullname"] == "" ? "a_" . $arr_get['name'] : $arr_get["fullname"];
                // MYSQL语句 数据库注册
                $sql = 'INSERT INTO info(tel,pwd,name,fullname,portrait,identity,rong_token) VALUES (\'' . $arr_get['tel'] . '\',\'' . $arr_get['pwd'] . '\',\'' . $fullname . '\',\'' . $arr_get['name'] . '\',\'' . $portrait . '\',\'' . $arr_get['identity'] . '\',\'' . $r['token'] . '\')';
                // 执行MYSQL语句
                if (mysqli_query($mysqli, $sql)) {
                    $resultId = mysqli_query($mysqli, 'SELECT a_id  FROM info WHERE tel=' . $arr_get['tel']);
                    if (mysqli_num_rows($resultId) > 0) {
                        $a_id = mysqli_fetch_assoc($resultId)['a_id'];
                        // 融云用户注册
                        $r = register($a_id, $arr_get["name"], $portrait);
                        // 返回200 成功
                        if ($r["code"] == 200) {
                            // MYSQL语句 数据库注册
                            $sql = 'UPDATE info SET rong_token=\'' . $r['token'] . '\' WHERE a_id=\'' . $r['userId'] . '\'';
                            if (mysqli_query($mysqli, $sql)) {
                                $result = array((object)([
                                    'code' => 200,
                                    'id' => $a_id,
                                    'tel' => $arr_get['tel'],
                                    'fullname' => $fullname,
                                    'name' => $arr_get['name'],
                                    'portrait' => $portrait,
                                    'identity' => $arr_get['identity'],
                                    'rong_result' => $r
                                ]));
                                // 输出结果
                                echo json_encode($result, JSON_UNESCAPED_UNICODE);
                            }
                        } else {
                            $result = array((object)([
                                'code' => 200,
                                'msg' => "用户注册成功，融云注册失败",
                                'id' => $a_id,
                                'tel' => $arr_get["tel"],
                                'fullname' => $fullname,
                                'name' => $arr_get['name'],
                                'portrait' => $portrait,
                                'identity' => $arr_get['identity']
                            ]));
                            // 输出结果
                            echo json_encode($result, JSON_UNESCAPED_UNICODE);
                        }
                    } else {
                        echo json_encode(array((object)([
                            'code' => 400,
                            'msg' => "数据库错误"
                        ])), JSON_UNESCAPED_UNICODE);
                    }
                } else {
                    echo json_encode(array((object)([
                        'code' => 400,
                        'msg' => "数据库错误"
                    ])), JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode(array((object)([
                    'code' => 400,
                    'msg' => "该手机号码已被注册"
                ])), JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '1002': // 用户信息更新(修改)
        Aupdate($arr_get);
        break;
    case '1003': // 获取用户信息
        $arr_get['id'] = $arr_get['id'] == "" && $arr_get['tel'] != "" ? getId($arr_get['tel']) : $arr_get['id'];
        if ($arr_get['id']) {
            // 融云获取用户信息
            $r = getinit($arr_get['id']);
            // 返回200 成功
            if ($r["code"] == 200) {
                // 连接数据库
                $mysqli = getMysqli();
                // MYSQL语句
                $sql = 'SELECT a_id,tel,name,fullname,portrait,identity,rong_token,onetime,status FROM info WHERE a_id=\'' . $arr_get["id"] . '\'';
                // 执行MYSQL语句
                $result_sql = mysqli_query($mysqli, $sql);
                // 遍历结果到数组
                if (mysqli_num_rows($result_sql) > 0) {
                    while ($row = mysqli_fetch_assoc($result_sql)) {
                        $result = array((object)([
                            'code' => 200,
                            'a_id' => $row['a_id'],
                            'tel' => $row["tel"],
                            'fullname' => $row["fullname"],
                            'name' => $row['name'],
                            'portrait' => $row['portrait'],
                            'identity' => $row['identity'],
                            'token' => $row['rong_token'],
                            'onetime' => $row['onetime'],
                            'status' => $row['status'],
                            "rong_result" => $r
                        ]));
                    }
                    echo json_encode($result, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(array((object)([
                        'code' => 400,
                        'msg' => "SQL找不到该用户"
                    ])), JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode(array((object)([
                    'code' => 400,
                    'msg' => "Rong找不到该用户",
                    'rong_result' => $r
                ])), JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '1004': // 登录
        if ($arr_get['tel'] && $arr_get['pwd']) {
            // 连接数据库
            $mysqli = getMysqli();
            // MYSQL语句
            $sql = 'SELECT a_id,name,fullname,portrait,identity,rong_token,onetime,status FROM info WHERE tel=\'' . $arr_get["tel"] . '\' AND pwd=\'' . $arr_get["pwd"] . '\'';
            // 执行MYSQL语句
            $result_sql = mysqli_query($mysqli, $sql);
            // 遍历结果到数组
            if (mysqli_num_rows($result_sql) > 0) {
                while ($row = mysqli_fetch_assoc($result_sql)) {
                    $result = array((object)([
                        'code' => 200,
                        'a_id' => $row['a_id'],
                        'tel' => $arr_get["tel"],
                        'fullname' => $row["fullname"],
                        'name' => $row['name'],
                        'portrait' => $row['portrait'],
                        'identity' => $row['identity'],
                        'token' => $row['rong_token'],
                        'onetime' => $row['onetime'],
                        'status' => $row['status']
                    ]));
                }
                echo json_encode($result, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(array((object)([
                    'code' => 400,
                    'msg' => "账号或密码错误"
                ])), JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '1005': // 录入个人资料
        $arr_get['id'] = $arr_get['id'] == "" && $arr_get['tel'] != "" ? getId($arr_get['tel']) : $arr_get['id'];
        if ($arr_get['id']  && $arr_get['school'] && $arr_get['degree'] && $arr_get['resume']) {
            // 连接数据库
            $mysqli = getMysqli();
            // 判断数据库是否已经存在资料
            $resultId = mysqli_query($mysqli, 'SELECT a_id  FROM j_info WHERE a_id=\'' . $arr_get['id'] . '\'');
            if (mysqli_num_rows($resultId) == null) {
                // MYSQL语句 新增
                $sql = 'INSERT INTO j_info(a_id,school,degree,resume) VALUES (\'' . $arr_get["id"] . '\',\'' . $arr_get["school"] . '\',\'' . $arr_get['degree'] . '\',\'' . $arr_get['resume'] . '\')';
            } else {
                // MYSQL语句 更新
                $sql = 'UPDATE j_info SET school=\'' . $arr_get["school"] . '\',degree=\'' . $arr_get['degree'] . '\',resume=\'' . $arr_get['resume'] . '\' WHERE a_id=\'' . $arr_get["id"] . '\'';
            }
            // 执行MYSQL语句
            if (mysqli_query($mysqli, $sql)) {
                $result = Aupdate($arr_get);
                if ($result[0]->code == 200) {
                    $result = array((object)([
                        'code' => 200,
                        'id' => $arr_get['id'],
                        'tel' => $arr_get["tel"],
                        'school' => $arr_get['school'],
                        'degree' => $arr_get['degree'],
                        'resume' => $arr_get['resume'],
                        'rong_result' => $result
                    ]));
                }
                // 输出结果
                echo json_encode($result, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(array((object)([
                    'code' => 400,
                    'msg' => "数据库错误"
                ])), JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '1101': // 检查用户在线状态
        $arr_get['id'] = $arr_get['id'] == "" && $arr_get['tel'] != "" ? getId($arr_get['tel']) : $arr_get['id'];
        if ($arr_get['id']) {
            echo json_encode(check($arr_get['id']), JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '2001': // 获取大厅资料
        // 连接数据库
        $mysqli = getMysqli();
        $arr_get['num'] = $arr_get['num'] == "" ? 10 : $arr_get['num'];
        $sql = 'SELECT info.a_id,tel,name,fullname,portrait,age,identity,onetime,school,degree,resume FROM info,j_info WHERE info.a_id=j_info.a_id ORDER BY rand() LIMIT ' . $arr_get['num'];
        // 执行MYSQL语句
        $result_sql = mysqli_query($mysqli, $sql);
        // 遍历结果到数组
        if (mysqli_num_rows($result_sql) > 0) {
            // 初始化返回值
            $result = array((object)([
                'code' => 200,
                'length' => mysqli_num_rows($result_sql),
                'list' => []
            ]));
            // 遍历数据
            while ($row = mysqli_fetch_assoc($result_sql)) {
                array_push($result[0]->list, (object)([
                    'a_id' => $row['a_id'],
                    'tel' => $row["tel"],
                    'fullname' => $row["fullname"],
                    'name' => $row['name'],
                    'portrait' => $row['portrait'],
                    'age' => $row['age'],
                    'identity' => $row['identity'],
                    'onetime' => $row['onetime'],
                    'j_info' => (object)([
                        'school' => $row['school'],
                        'degree' => $row['degree'],
                        'resume' => $row["resume"]
                    ])
                ]));
            }
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "SQL找不到该用户"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '2002': // 获取个人资料
        if ($arr_get['id'] != '') {
            // 连接数据库
            $mysqli = getMysqli();
            // MYSQL语句
            $sql = 'SELECT info.a_id,tel,name,fullname,portrait,age,identity,onetime,school,degree,resume FROM info,j_info WHERE info.a_id=j_info.a_id AND info.a_id=\'' . $arr_get['id'] . '\'';
            // 执行MYSQL语句
            $result_sql = mysqli_query($mysqli, $sql);
            // 遍历结果到数组
            if (mysqli_num_rows($result_sql) > 0) {
                // 遍历数据
                while ($row = mysqli_fetch_assoc($result_sql)) {
                    // 融云获取用户信息
                    $r = getinit($row['a_id']);
                    $result = array((object)([
                        'code' => 200,
                        'a_id' => $row['a_id'],
                        'tel' => $row["tel"],
                        'fullname' => $row["fullname"],
                        'name' => $row['name'],
                        'portrait' => $row['portrait'],
                        'age' => $row['age'],
                        'identity' => $row['identity'],
                        'onetime' => $row['onetime'],
                        'j_info' => (object)([
                            'school' => $row['school'],
                            'degree' => $row['degree'],
                            'resume' => $row["resume"]
                        ])
                    ]));
                }
                echo json_encode($result, JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(array((object)([
                    'code' => 400,
                    'msg' => "SQL找不到该用户"
                ])), JSON_UNESCAPED_UNICODE);
            }
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }

        break;
    case '3001': // 获取关注列表
        echo json_encode(getFollow($arr_get['id']), JSON_UNESCAPED_UNICODE);
        break;
    case '3002': // 添加关注
        if ($arr_get['id'] != '' && $arr_get['yid'] != '') {
            // 连接数据库
            $mysqli = getMysqli();
            // 判断用户关注列表是否初始化
            $resultId = mysqli_query($mysqli, 'SELECT a_id  FROM follow WHERE a_id=\'' . $arr_get['id'] . '\'');
            if (mysqli_num_rows($resultId) == null) {
                // 新增
                $sql = 'INSERT INTO follow(a_id,data) VALUES (\'' . $arr_get['id'] . '\',\'' . $arr_get['yid'] . ',\')';
            } else {
                // 修改
                $sql = 'UPDATE follow SET data = CONCAT(data,\'' . $arr_get['yid'] . ',\') WHERE a_id=\'' . $arr_get['id'] . '\'';
            }
            if (mysqli_query($mysqli, $sql)) {
                $followArr = getFollow($arr_get['id']);
                $dataArr = array((object)([
                    'code' => 200,
                    'id' => $arr_get['id'],
                    'yid' => $arr_get['yid'],
                    'follow' => $followArr
                ]));
            }

            // 关闭数据库连接
            mysqli_close($mysqli);
            //json编码并输出
            echo json_encode($dataArr, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '3003': // 取消关注
        if ($arr_get['id'] != '' && $arr_get['yid'] != '') {
            $mysqli = getMysqli();
            $sql = 'SELECT data FROM follow WHERE a_id = \'' . $arr_get['id'] . '\'';
            $result = mysqli_query($mysqli, $sql);
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    if (stristr($row['data'], $arr_get['yid']) != false) {
                        $newJiahao = substr_replace($row['data'], "", strpos($row['data'], $arr_get['yid'] . ','), strlen($arr_get['yid'] . ','));
                        // 修改
                        $sql = 'UPDATE follow SET data = \'' . $newJiahao . '\' WHERE a_id = \'' . $arr_get['id'] . '\'';
                        if (mysqli_query($mysqli, $sql)) {
                            $followArr = getFollow($arr_get['id']);
                            $result = array((object)([
                                'code' => 200,
                                'msg' => '取消关注成功',
                                'id' => $arr_get['id'],
                                'yid' => $arr_get['yid'],
                                'follow' => $followArr
                            ]));
                        } else {
                            $result = array((object)([
                                'code' => 400,
                                'msg' => '数据库错误'
                            ]));
                        }
                    } else {
                        $result = array((object)([
                            'code' => 400,
                            'msg' => '没有关注此用户',
                        ]));
                    }
                }
            } else {
                $result = array((object)([
                    'code' => 400,
                    'msg' => '找不到该用户的好友列表',
                ]));
            }
            // 关闭数据库连接
            mysqli_close($mysqli);
            //json编码并输出
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    case '3004': // 搜索用户
        if ($arr_get['yid'] != '') {
            // 连接数据库
            $mysqli = getMysqli();
            $sql = 'SELECT info.a_id,tel,name,fullname,portrait,age,identity,onetime,school,degree,resume FROM info,j_info WHERE info.a_id=j_info.a_id AND (info.a_id = \'' . $arr_get['yid'] . '\' OR info.tel = \'' . $arr_get['yid'] . '\' OR info.name LIKE \'%' . $arr_get['yid'] . '%\' OR info.fullname LIKE \'%' . $arr_get['yid'] . '%\')';
            $resultUser = mysqli_query($mysqli, $sql);
            if (mysqli_num_rows($resultUser) > 0) {
                // 初始化返回值
                $dataArr = array((object)([
                    'code' => 200,
                    'length' => count($followArr),
                    'list' => []
                ]));
                // 遍历数据
                while ($row = mysqli_fetch_assoc($resultUser)) {
                    array_push($dataArr[0]->list, (object)([
                        'a_id' => $row['a_id'],
                        'tel' => $row["tel"],
                        'fullname' => $row["fullname"],
                        'name' => $row['name'],
                        'portrait' => $row['portrait'],
                        'age' => $row['age'],
                        'identity' => $row['identity'],
                        'onetime' => $row['onetime'],
                        'j_info' => (object)([
                            'school' => $row['school'],
                            'degree' => $row['degree'],
                            'resume' => $row["resume"]
                        ])
                    ]));
                }
            } else {
                $dataArr = array((object)([
                    'code' => 400,
                    'msg' => '找不到该用户',
                ]));
            }
            // 关闭数据库连接
            mysqli_close($mysqli);
            //json编码并输出
            echo json_encode($dataArr, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode(array((object)([
                'code' => 400,
                'msg' => "传入参数错误"
            ])), JSON_UNESCAPED_UNICODE);
        }
        break;
    default:
        echo json_encode(array((object)([
            'code' => 404,
            'msg' => "找不到此功能"
        ])), JSON_UNESCAPED_UNICODE);
        break;
}
// 关闭数据库连接
mysqli_close($mysqli);

/**
 * 修改用户数据
 */
function Aupdate($arr_get)
{
    $arr_get['id'] = $arr_get['id'] == "" && $arr_get['tel'] != "" ? getId($arr_get['tel']) : $arr_get['id'];
    if ($arr_get['id'] && ($arr_get['pwd'] || $arr_get['fullname'] || $arr_get['name'] || $arr_get['portrait']) || $arr_get['age']) { // $arr_get['identity']
        // 需要修改密码或者用户名或者年龄
        if ($arr_get['pwd'] || $arr_get['fullname'] || $arr_get['name'] || $arr_get['age'] || $arr_get['portrait']) {
            // 获取用户数据
            $init = getinit($arr_get['id']);
            $name = $arr_get['name'] == "" ? $init['name'] : $arr_get['name'];
            $portrait = $arr_get['portrait'] == "" ? $init['portrait'] : $arr_get['portrait'];
            // 连接数据库
            $mysqli = getMysqli();
            // MYSQL语句
            $sql = 'UPDATE info SET ';
            if ($arr_get['pwd'] != "") {
                $sql = $sql . 'pwd=\'' . $arr_get['pwd'] . '\',';
            }
            if ($arr_get['fullname'] != "") {
                $sql = $sql . 'fullname=\'' . $arr_get['fullname'] . '\',';
            }
            if ($arr_get['name'] != "") {
                $sql = $sql . 'name=\'' . $name  . '\',';
            }
            if ($arr_get['portrait'] != "") {
                $sql = $sql . 'portrait=\'' . $portrait . '\' ';
            }
            if ($arr_get['age'] != "") {
                $sql = $sql . 'age=\'' . $arr_get['age'] . '\' ';
            }
            $sql = $sql . 'WHERE a_id=\'' . $arr_get['id'] . '\'';
            // 执行MYSQL语句
            if (mysqli_query($mysqli, $sql)) {
                // 需要修改用户名或头像
                if ($arr_get['name'] || $arr_get['portrait']) {
                    // 融云用户信息更新
                    $r = update($arr_get['id'], $name, $portrait);
                }
                if ($r["code"] != 200) {
                    $result = array((object)([
                        'code' => 200,
                        'tel' => $arr_get['tel'],
                        'fullname' => $arr_get['fullname'],
                        'name' => $name,
                        'portrait' => $portrait,
                        'age' => $arr_get['age'],
                        'identity' => $portrait,
                        'rong_result' => $r
                    ]));
                } else {
                    $result = array((object)([
                        'code' => 200,
                        'tel' => $arr_get['tel'],
                        'fullname' => $arr_get['fullname'],
                        'name' => $name,
                        'portrait' => $portrait,
                        'age' => $arr_get['age'],
                        'identity' => $portrait
                    ]));
                }
            } else {
                $result = array((object)([
                    'code' => 400,
                    'tel' => $arr_get['tel'],
                    'fullname' => $arr_get['fullname'],
                    'name' => $name,
                    'age' => $arr_get['age'],
                    'identity' => $portrait
                ]));
            }
        }
        return $result;
    } else {
        return array((object)([
            'code' => 400,
            'msg' => "传入参数错误"
        ]));
    }
}

function getFollow($id)
{
    if ($id != '') {
        // 连接数据库
        $mysqli = getMysqli();
        $sql = 'SELECT data FROM follow WHERE a_id = \'' . $id . '\'';
        $result = mysqli_query($mysqli, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                // 关注列表
                $followArr = explode(',', $row['data']);
                // 删除最后一个空字段
                array_pop($followArr);
                // 初始化返回值
                $dataArr = array((object)([
                    'code' => 200,
                    'length' => count($followArr),
                    'list' => []
                ]));
                for ($i = 0; $i < count($followArr); $i++) {
                    $resultUser = mysqli_query($mysqli, 'SELECT info.a_id,tel,name,fullname,portrait,age,identity,onetime,school,degree,resume FROM info,j_info WHERE info.a_id=j_info.a_id AND info.a_id = \'' . $followArr[$i] . '\'');
                    if (mysqli_num_rows($resultUser) > 0) {
                        // 遍历数据
                        while ($row = mysqli_fetch_assoc($resultUser)) {
                            array_push($dataArr[0]->list, (object)([
                                'a_id' => $row['a_id'],
                                'tel' => $row["tel"],
                                'fullname' => $row["fullname"],
                                'name' => $row['name'],
                                'portrait' => $row['portrait'],
                                'age' => $row['age'],
                                'identity' => $row['identity'],
                                'onetime' => $row['onetime'],
                                'j_info' => (object)([
                                    'school' => $row['school'],
                                    'degree' => $row['degree'],
                                    'resume' => $row["resume"]
                                ])
                            ]));
                        }
                        // echo json_encode($dataArr, JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }
        // 关闭数据库连接
        mysqli_close($mysqli);
        return $dataArr;
    } else {
        return array((object)([
            'code' => 400,
            'msg' => "传入参数错误"
        ]));
    }
}

/**
 * 用户注册
 */
function register($id, $name, $portrait)
{
    $RongSDK = new RongCloud(APPKEY, APPSECRET);
    $user = [
        'id' => $id,
        'name' => $name, //用户名称
        'portrait' => $portrait //用户头像
    ];
    $register = $RongSDK->getUser()->register($user);
    // Utils::dump("用户注册", $register);
    return $register;
}

/**
 * 用户信息更新
 */
function update($id, $name, $portrait)
{
    $RongSDK = new RongCloud(APPKEY, APPSECRET);
    $user = [
        'id' => $id, //用户id
        'name' => $name, //用户名称
        'portrait' =>  $portrait //用户头像
    ];
    $update = $RongSDK->getUser()->update($user);
    // Utils::dump("用户信息更新", $update);
    return $update;
}

/**
 * 获取用户信息
 */
function getinit($id)
{
    $RongSDK = new RongCloud(APPKEY, APPSECRET);
    $user = [
        'id' => $id, //用户id
    ];
    $res = $RongSDK->getUser()->get($user);
    // Utils::dump("获取用户信息", $res);
    return $res;
}

/**
 * 在线状态
 */
function check($id)
{
    $RongSDK = new RongCloud(APPKEY, APPSECRET);
    $user = [
        'id' => $id, //用户id
    ];
    $register = $RongSDK->getUser()->Onlinestatus()->check($user);
    // Utils::dump("用户在线状态", $register);
    return $register;
}
