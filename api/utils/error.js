export const errorHandler =(statusCode,messge) =>{
    const error =new Error();
    error.statusCode=statusCode;
    error.message=messge;
    return error;
};