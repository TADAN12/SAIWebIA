


export class Session{

    userId = null;

    constructor(){
        
    }

    async createSession(){
        try{
            let response = await fetch("http://localhost:3010/createSession");   
            userId = response;
        }catch(err){
            return {message:"Error al crear la sesion de usuario"};
        }finally{
            return {message:"Sesion creada"}
        }
    }
    
    async validateSession(userId){
        this.userId=userId;
        try{
            let response = await fetch("http://localhost:3010/createSession");   
            userId = response;
        }catch(err){
            return {message:"Error al validar la sesion"}
        }finally{
            return {message:"Sesion validada"}
        }
    }
    
    async deleteSession(userId){
        this.userId = userId;
        try{
            let response = await fetch("http://localhost:3010/createSession");   
            userId = response;
        }catch(err){
            return {message:"Error al borrar la sesion"}
        }finally{
            return {message:"Sesion borrada"}
        }
    }

}
