export class SignupModel{
    constructor(public email: string,
                public subscription: string,
                public password: string,
                public confirmedpassword: string,
                public startDate: string){}
}