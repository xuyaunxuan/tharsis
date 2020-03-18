/**
 * 投稿请求接口
 */
export default class SubscribeParamater {

	public title: string

	public tag: string
	
	public isPrivate: boolean

	public article: string

	public articleId: string
	
	constructor() {
		this.title = '',
		this.tag = '',
		this.isPrivate = false,
		this.article = '',
		this.articleId = ''
	}
}