import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  

    switch (req.method) {
        case 'GET':
            return getError(req, res)
        default:
            break;
    }
}

const getError = async (req: NextApiRequest, res: NextApiResponse<Data>) =>{
    
    const { } = req.query

    return res.status(404).json({message: 'Error 404 || Debe especificar el query'})

}
