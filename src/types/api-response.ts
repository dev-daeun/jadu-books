import { StatusCodes } from 'http-status-codes';


type ApiResponse<T> = {
    statusCode: StatusCodes,
    data: T
}
export default ApiResponse
