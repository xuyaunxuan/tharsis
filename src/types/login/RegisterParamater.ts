/**
 * RegisterParamater
 */
export default class RegisterParamater {

	public mailAddress: string

	public nickName: string
	
	public oncePassword: string

	constructor() {
		this.mailAddress = '',
		this.nickName = '',
		this.oncePassword = ''
	}
}