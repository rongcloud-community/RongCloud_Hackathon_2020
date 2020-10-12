export interface userManagementForm {
    userId: string
	Nickname?: string
	Password: string
	PortraitUri?: string
}

export interface userInfo {
	userID: string
	nickname?: string
	portraitUri?: string
	token?: string
	isAdmin?: boolean
	relation?: number
}

export interface userInfoOnList {
	UserID: string
	Nickname?: string
	PortraitURI?: string
	IsAdmin?: boolean
}

export interface userRelation {
	subjectID?: string
	objectID: string
	relation: number
}

export interface message {
	type: number
	targetId: string
	messageType: string
	messageUId: string
	isPersited: boolean
	isCounted: boolean
	isStatusMessage: boolean
	senderUserId: string
	content: any
	sentTime: number
	receivedTime: number
	messageDirection: number
	isOffLineMessage: boolean
	disableNotification: boolean
	canIncludeExpansion: boolean
	expansion: any
}

export interface mentionedList {
	type: number
	userIdList: string[]
}

export interface conversation {
	senderUserId?: string
	unreadMessageCount?: number
	hasMentiond?: boolean
	mentiondInfo?: mentionedList
	lastUnreadTime?: number
	notificationStatus?: number
	isTop?: number
	type?: number
	targetId: string
	hasMentioned?: boolean
	mentionedInfo?: mentionedList
	latestMessage?: message
}