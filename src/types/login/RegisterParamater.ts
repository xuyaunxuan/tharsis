/**
 * RegisterParamater
 */
export default class RegisterParamater {
	// ID
	public accountId: string
	// 邮箱
	public mailAddress: string
	// 昵称
	public nickName: string
	// 密码
	public password: string

	constructor() {
		this.accountId = '',
		this.mailAddress = '',
		this.nickName = '',
		this.password = ''
	}
}