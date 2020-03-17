import ErrorDto from '@/types/common/ErrorDto'
/**
 * LoginResult
 */
export default class LoginResult {

    public errorDto: ErrorDto

    public result: string
    
	public accountId: string

	public mailAddress: string
	
	public nickName: string

	public token: string

	constructor() {
        this.errorDto = new ErrorDto()
        this.result = '',
        this.accountId = '',
		this.mailAddress = '',
		this.nickName = '',
		this.token = ''
	}
}
