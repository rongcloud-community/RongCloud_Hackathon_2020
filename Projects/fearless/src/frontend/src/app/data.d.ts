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
}

export interface userInfoOnList {
	UserID: string
	Nickname?: string
	PortraitURI?: string
	IsAdmin?: boolean
}