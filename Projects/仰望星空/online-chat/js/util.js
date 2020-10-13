
function createRandomUId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);
}
//转换内容
function imContent(content) {
    //支持的html标签
    var html = function(end) {
        return new RegExp('\\n*\\[' + (end || '') + '(pre|div|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
    };
    var facesDOM = $(".mui-slider-item ul li");
    var faces = {};
    for (i = 0; i < facesDOM.length; i++) {
        faces[facesDOM[i].title] = facesDOM[i].getElementsByTagName("img")[0].src;
    }
    content = (content || '').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
        .replace(/face\[([^\s\[\]]+?)\]/g, function(face) { //转义表情
            var alt = face.replace(/^face/g, '');
            return '<img alt="' + alt + '" title="' + alt + '" src="' + faces[alt] + '">';
        }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str) { //转义链接
            var href = (str.match(/a\(([\s\S]+?)\)\[/) || [])[1];
            var text = (str.match(/\)\[([\s\S]*?)\]/) || [])[1];
            if (!href)
                return str;
            return '<a href="' + href + '" target="_blank">' + (text || href) + '</a>';
        }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移代码
        .replace(/\n/g, '<br>') //转义换行 
    return content;
}