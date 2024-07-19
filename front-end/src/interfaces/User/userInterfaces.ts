export interface User{
    first_name:string,
    is_employee:boolean,
    last_name:string, 
    rut: number | string, 
    user_id:number, 
    username: string
}

export interface Register{
    username:string, 
    password1:string, 
    password2:string,
    first_name:string, 
    last_name:string, 
    rut:string
}

export interface Login{
    username:string, 
    password:string
}

export interface UserResponse{
    error: null | string,
    success: any
}
