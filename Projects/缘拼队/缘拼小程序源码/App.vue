<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.setEnableDebug({
			  enableDebug: true
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
</style>
