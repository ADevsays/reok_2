export const processError = (error:any)=>{
    const internalError = JSON.parse(error);
    const errorMsg = (Object.values(internalError) as any)[0][0].message;
    return errorMsg;
}