export interface Signup {
    lastname: string,
    firstname: string,
    password: string,
    email: string,
    role: string,
    pseudo:string
}

export interface Signin {
    pseudo:string
    password: string,
}