

export async function validateUser(email , password){
    let valildado=false;
    try{
        let resposne = await fetch("hhtps://localhost:3010")
        valildado = response;
    }catch(err){
        return {message:"Error al validar al usuario",status:false}
    }finally{
        return {message:"Usuario validado", status:validado }
    }
}