class User {
    username: string;
    email: string;
    password: string;
    confirmPassword:string;

    constructor(){
        this.username = "",
        this.email = "",
        this.password = ""
    }
}

export default User;