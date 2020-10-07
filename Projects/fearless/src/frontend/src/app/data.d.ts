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
	targetID: string
	messageType: string
	messageUID: string
	isPersited: boolean
	isCounted: boolean
	isStatusMessage: boolean
	senderUserID: string
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
	Type: number
	UserIDList: string[]
}

export interface conversation {
	SenderUserID: string
	UnreadMessageCount: number
	HasMentiond: boolean
	MentiondInfo: mentionedList
	LastUnreadTime: number
	NotificationStatus: number
	IsTop: number
	Type: number
	TargetID: string
	HasMentioned: boolean
	MentionedInfo: mentionedList
	LatestMessage: message
}