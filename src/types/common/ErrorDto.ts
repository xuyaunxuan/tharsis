/**
 * ErrorDto
 */
export default class ErrorDto {

    public message: string
	
	public errors: string[]
	
	constructor() {
        this.message = ""
        this.errors = []
	}
}