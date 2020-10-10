function connect (token) {
  jsToAndroid.connectToRongCloud(token)
}

function disconnect () {
  jsToAndroid.disconnectToRongCloud()
}

function sendToRongCloud (userId, message) {
  jsToAndroid.sendMessageToRongCloud(userId, JSON.stringify(message))
}

export default {
  connect,
  disconnect,
  sendToRongCloud
}
