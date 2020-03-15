/**
 * ResetParamater
 */
export default class ResetParamater {

	public mailAddress: string

	public captchaCode: string
	
	public oncePassword: string

	public twicePassword: string

	constructor() {
		this.mailAddress = '',
		this.captchaCode = '',
		this.oncePassword = '',
		this.twicePassword = ''
	}
}