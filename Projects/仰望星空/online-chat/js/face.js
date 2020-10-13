// 渲染表情
$(function() {
    init();
    function init() {
      for(var i = 0; i < 141; i++) {
        $('.emoji').append('<li id='+i+'><img src="image/emoji/emoji ('+(i+1)+').png"></li>');
      }
    }
    
    // 显示表情
    $('#smile').click(()=> {
      $('.selectBox').css('display', "block");
    });
    $('#smile').dblclick((ev)=> { 
      $('.selectBox').css('display', "none");
    });  
    $('#dialogue_input').click(()=> {
      $('.selectBox').css('display', "none");
    }); 
    
    // 用户点击发送表情
    $('.emoji li img').click((ev)=> {
        ev = ev || window.event;
        var src = ev.target.src;
        var emoji = src.replace(/\D*/g, '').substr(6, 8);
        //window.webapi.insertEmoij('[emoji'+emoji+']' , '<img src="image/emoji/emoji ('+emoji+').png"/>')
        _insertimg('<img class="dialogue-text-img" src="image/emoji/emoji ('+2+').png"/>')
    });

    function _insertimg(str){
        var selection= window.getSelection ? window.getSelection() : document.selection;
        var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
        if (!window.getSelection){
            document.getElementById('dialogue_input').focus();
            var selection= window.getSelection ? window.getSelection() : document.selection;
            var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);
            range.pasteHTML(str);
            range.collapse(false);
            range.select();32
        }
        else{
            document.getElementById('dialogue_input').focus();
            range.collapse(false);
            var hasR = range.createContextualFragment(str);
            var hasR_lastChild = hasR.lastChild;
            while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
                var e = hasR_lastChild;
                hasR_lastChild = hasR_lastChild.previousSibling;
                hasR.removeChild(e)
            }
            range.insertNode(hasR);
            if (hasR_lastChild) {
                range.setEndAfter(hasR_lastChild);
                range.setStartAfter(hasR_lastChild)
            }
            selection.removeAllRanges();
            selection.addRange(range)
        }
    }
})
