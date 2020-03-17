/**
 * 投稿请求接口
 */
export default class SubscribeParamater {

	public title: string

	public tag: string
	
	public isPrivate: boolean

	public artical: string

	public articalId: string
	
	constructor() {
		this.title = '',
		this.tag = '',
		this.isPrivate = false,
		this.artical = '',
		this.articalId = ''
	}
}