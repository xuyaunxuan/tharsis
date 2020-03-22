import ErrorDto from '@/types/common/ErrorDto'
import ArticleDto from '@/types/article/ArticleDto'
/**
 * ArticleGetResult
 */
export default class ArticleGetResult {

    public errorDto: ErrorDto

    public result: string

    public articles: ArticleDto[]

    constructor() {
        this.errorDto = new ErrorDto()
        this.result = ""
        this.articles = []
    }
}
