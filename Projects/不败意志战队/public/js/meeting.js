$(function () {
  // 发送消息
  $("#bottom-btn").click(function (e) {
    var text = $("textarea").val();
    var div = document.querySelector(".center");
    e.preventDefault();
    // 发送消息
    if (text.trim()) {
      sendChatRoom(text);
      $("textarea").val("");
    }
    div.scrollTop = div.scrollHeight;
  });
  // 在input中写入视频链接   播放视频

  $("#btn").click(function () {
    var text = $(".bottom-key input").val();
    $(".bottom-key input").val("");
    console.log(text);
    // $.ajax({
    //   async: false, //改同步获取
    //   type: "POST", //默认get
    //   url: "url",
    //   data: {},
    //   success: function (response) {
    //     // $("iframe").prop("src");
    //     console.log(response);
    //   },
    // });
  });
});
