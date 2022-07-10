import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { User } from '../../../models'
import bcrypt from 'bcryptjs';
import { jwt, valitations } from '../../../utils';

type Data = 
| { message: string }
| {
    token: string,
    user:{
        email:string,
        name: string,
        role: string
    }
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'POST':
            return registerUser(req, res)
    
        default:
            return res.status(400).json({message: 'bad request'})
    }
}


const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>)=>{

    const { email = '', password = '', name = ''} = req.body as { email: string, password: string, name: string}



    if(password.length < 6){
        return res.status(400).json({message: 'el password debe ser mayor a 6 caracteres'})
    }

    if(name.length < 2){
        return res.status(400).json({message: 'el nombre debe ser mayor a 2 caracteres'})
    }

    // validar email
    if( !valitations.isValidEmail( email ) ){
        return res.status(400).json({message: 'No es un email permitido'})
    }

    await db.connect()

    const user = await User.findOne({email})

    if(user){
        return res.status(400).json({message: 'Correo ya existe'})
    }

    const newUser = new User({
        email: email.toLocaleLowerCase(),
        password: bcrypt.hashSync( password ),
        role: 'client',
        name
    })
    
    try {
        await newUser.save({ validateBeforeSave: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Ocurrio un error en el servidor'})
    }


    const {_id } = newUser

    const token = jwt.signToken( _id, email)

    return res.status(200).json({
        token, 
        user:{
            email, 
            role: 'client', 
            name
        }
    })
}