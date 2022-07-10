import jwt from 'jsonwebtoken'
import { resolve } from 'path';

export const signToken = (_id: string, email: string)=>{

    if( !process.env.JWT_SECRET_SEED){
        throw new Error("No hay semilla de jwt - revisar variabels de entorno");
        
    }

    return jwt.sign(
        // payload
        {
            _id, email
        },

        // seed
        process.env.JWT_SECRET_SEED,

        // options

        { expiresIn: '30d'}
    
        )


}


export const isValidToken = ( token: string ): Promise<string> =>{
    if( !process.env.JWT_SECRET_SEED){
        throw new Error("No hay semilla de jwt - revisar variabels de entorno");
        
    }


    return new Promise( (res, rej) =>{

        try {
            jwt.verify( token, process.env.JWT_SECRET_SEED || '', (err, payload)=> {
                if( err) return rej('JWT no es valido')
                    
                const { _id } = payload as { _id: string}

                res(_id);
            })
        } catch (error) {
            rej('JWT no es valido')
        }
    })
}