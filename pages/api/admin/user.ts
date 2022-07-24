import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interface';
import { User } from '../../../models';

type Data = 
| {message: string}
| IUser[]

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            
            return getUsers(req, res);
    
        case 'POST':
            return updateUser(req, res);

        default:
            return res.status(400).json({ message: 'Bad request' })
    }


  
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    await db.connect()

    const users = await User.find().select('-password').lean()

    await db.disconnect()


    return res.status(200).json( users )

}

const updateUser= async (req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const { userId = '', role = ''} = req.body

    if(!isValidObjectId(userId)){
        return res.status(400).json({ message: 'no existe usuario con ese id' })
    }

    const validRoles = ['admin', 'client']

    if(!validRoles.includes(role)){
        return res.status(400).json({ message: 'Rol no permitido' + validRoles.join(', ') })
    }

    await db.connect()

    const user = await User.findById(userId);

    if(!user){
        await db.disconnect()
        return res.status(400).json({ message: 'id no valido' + userId })
    }
    
    user.role = role
    await user.save();

    await db.disconnect()

}

