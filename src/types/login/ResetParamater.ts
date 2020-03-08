/**
 * ResetParamater
 */
export default class ResetParamater {

	public mailAddress: string

	public identifyCd: string
	
	public oncePassword: string

	public twicePassword: string

	constructor() {
		this.mailAddress = '',
		this.identifyCd = '',
		this.oncePassword = '',
		this.twicePassword = ''
	}
}