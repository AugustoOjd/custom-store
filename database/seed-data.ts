import bcrypt from 'bcryptjs'


interface SeedProduct {
    description: string;
    images: string[];
    inStock: number;
    price: number;
    colors: ValidColors[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    category: 'keycaps' | 'keyboards' | 'tools'
}

type ValidColors = 'black' | 'white' | 'yellow'| 'blue' | 'red' |'default';
type ValidTypes = 'keycap' | 'keyboard' | 'kit' | 'lube' | 'tool';

interface SeedData {
    products: SeedProduct[],
    users: SeedUser[];
}

interface SeedUser{
    name: string,
    email: string,
    password: string,
    role: 'admin' | 'client'
}



export const initialData: SeedData = {
        
    users: [
            {
                name: 'luis',
                email: 'luis@gmail.com',
                password: bcrypt.hashSync('123456'),
                role: 'admin'
            },
            {
                name: 'daniela',
                email: 'daniela@gmail.com',
                password: bcrypt.hashSync('123456'),
                role: 'client'
            }
        
    ],
    

    products: [
        {
            description: "Perfectas keycaps para sentirse en sincronia con la gastronomia japonesa y el mar",
            images: [
                'blue_sushi.jpg',
                'blue_sushi2.jpg',
            ],
            inStock: 7,
            price: 55,
            colors: ['default'],
            slug: "blue_shushi",
            type: 'keycap',
            tags: ['keyboard'],
            title: "Keycaps blue sushi PBS-ANSI",
            category: 'keycaps'
        },
        {
            description: "Un kit de case, placa y estabilizadores marca CIV, para teclados customs",
            images: [
                'civ_kit.jpg',
                'civ_kit2.jpg',
            ],
            inStock: 5,
            price: 80,
            colors: ['black', 'white', 'yellow', 'default'],
            slug: "keyboard_civ_kit_",
            type: 'keyboard',
            tags: ['keyboard'],
            title: "Keyboard case CIV",
            category: 'keyboards'
        },
        {
            description: "Un kit de case, placa y estabilizadores marca CIV, para teclados customs",
            images: [
                'cable_usb.jpg',
                'cable_usb2.jpg',
            ],
            inStock: 5,
            price: 30,
            colors: ['black', 'white', 'yellow', 'blue', 'red'],
            slug: "cable_usb_classic",
            type: 'tool',
            tags: ['cable'],
            title: 'Cable usb calssic',
            category: 'tools'
        }
    ]
}