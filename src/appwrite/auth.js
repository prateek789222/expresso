import conf from "../conf"
import { Client, Account, ID } from "appwrite";

//refer documentation: https://appwrite.io/docs/products/auth/quick-start

//we made this code future-proof using the documentation
//we make a class, with variables client and account

export class AuthService {
    client = new Client();
    account;

//we make a constructor so that the following code, gets executed, the moment we create an object.
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
        //now account object can be used to access various services(functions) of Account class.
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email, password, name)

            if(userAccount){
                //call login method after account is created
                return this.login(email, password)
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try{
            return await this.account.createEmailSession(email, password)
        }
        catch(error){
            throw error;
        }
    }

    //to get the current logged-in user
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log("Appwrite error :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwrite error :: logout :: error", error);
        }
    }
}

const authService = new AuthService(); //creating an object
export default authService;