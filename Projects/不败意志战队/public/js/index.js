$(function () {
  console.log(1);
  // 加入会议按钮
  $("#join").click(function (e) {
    e.preventDefault();
    $(".join-box").show();
  });

  //加入按钮
  $("#meeting_btn_join").click(function (e) {
    e.preventDefault();
    let result = getUserInfo();
    if (result) {
      $.ajax({
        type: "post",
        url: "/user/registered",
        data: result,
        success: function (response) {
          console.log(response);
          if (response.code == 200) {
            console.log(response);
            location.href = `/user/meeting?userId=${response.userId}&username=${response.username}&meetingId=${response.meetingId}&portrait=${response.portrait}&token=${response.token}`;
          }
        },
      });
    } else {
      alert("加入会议ID或用户名称ID");
    }
  });

  //取消按钮
  $("#meeting_btn_off").click(function (e) {
    e.preventDefault();
    $(".join-box").hide();
  });

  /**
   *得到用户输入的会议ID和用户自定义的名字
   *
   */
  function getUserInfo() {
    // 加入会议id
    let meetingId = $("#meeting").val();
    let username = $("#username").val();

    if (meetingId == "" || username == "") {
      return false;
    }

    return {
      username: username, //用户自定义名称
      meetingId: meetingId, //加入的会议id
    };
  }
});