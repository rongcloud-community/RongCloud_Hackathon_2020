<?php
	$htmlData = '';
	if (!empty($_POST['content1'])) {
		if (get_magic_quotes_gpc()) {
			$htmlData = stripslashes($_POST['content1']);
		} else {
			$htmlData = $_POST['content1'];
		}
	}
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>KindEditor PHP</title>
	<link rel="stylesheet" href="/Public/Common/kindeditor/themes/default/default.css" />
	<link rel="stylesheet" href="/Public/Common/kindeditor/plugins/code/prettify.css" />
	<script charset="utf-8" src="/Public/Common/kindeditor/kindeditor-all-min.js"></script>
	<script charset="utf-8" src="/Public/Common/kindeditor/lang/zh-CN.js"></script>
	<script charset="utf-8" src="/Public/Common/kindeditor/plugins/code/prettify.js"></script>
	<script>
		KindEditor.ready(function(K) {
			var editor1 = K.create('textarea[name="content1"]', {
				cssPath : '/Public/Common/kindeditor/plugins/code/prettify.css',
				uploadJson : '/Public/Common/kindeditor/php/upload_json.php',
				fileManagerJson : '/Public/Common/kindeditor/php/file_manager_json.php',
				allowFileManager : true,
				afterCreate : function() {
					var self = this;
					K.ctrl(document, 13, function() {
						self.sync();
						K('form[name=example]')[0].submit();
					});
					K.ctrl(self.edit.doc, 13, function() {
						self.sync();
						K('form[name=example]')[0].submit();
					});
				}
			});
			prettyPrint();
		});
	</script>
</head>
<body>
	<?php echo $htmlData; ?>
	<form name="example" method="post" action="/Public/Common/kindeditor/php/demo.php">
		<textarea name="content1" style="width:700px;height:200px;visibility:hidden;"><?php echo htmlspecialchars($htmlData); ?></textarea>
		<br />
		<input type="submit" name="button" value="提交内容" /> (提交快捷键: Ctrl + Enter)
	</form>
</body>
</html>

