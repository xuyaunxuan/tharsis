/**
 * ArticleDto
 */
export default class ArticleDto {

    public title: string
    public articlePath: string
    public accountId: string
    public postTime!: Date
    public updateTime!: Date
    public tag: string
    public content: string
    public contentOri: string
    public isPrivate : string

    constructor() {
        this.title = ""
        this.articlePath = ""
        this.accountId = ""
        this.tag = ""
        this.content = ""
        this.contentOri = ""
        this.isPrivate = ""
        
    }
}