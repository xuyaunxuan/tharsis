import ErrorDto from '@/types/common/ErrorDto.ts'
/**
 * LoginParamater
 */
export default class BaseResult {
	public errorDto: ErrorDto
	
	public result: string
	
	constructor() {
        this.errorDto = new ErrorDto();
        this.result = ''
	}
}