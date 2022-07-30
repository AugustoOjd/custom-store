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
            title: "Set Keycaps blue sushi PBS-ANSI",
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
            price: 20,
            colors: ['black', 'white', 'yellow', 'blue', 'red'],
            slug: "cable_usb_classic",
            type: 'tool',
            tags: ['cable'],
            title: 'Cable usb calssic',
            category: 'tools'
        },        
        {
            description: "Set de keycaps basados en el pokemon bulbasuar de la primera generacion",
            images: [
                'bulba_white.jpg',
                'bulba_white2.jpg',
            ],
            inStock: 0,
            price: 25,
            colors: ['default'],
            slug: "keycaps_bulba_white",
            type: 'keycap',
            tags: ['keycap'],
            title: "Set keycaps bulbasaur",
            category: 'keycaps'
        },
        {
            description: "Cable tipo usb conexion DIY para evitar delay",
            images: [
                'cable_diy.jpg',
                'cable_diy2.jpg',
            ],
            inStock: 3,
            price: 14,
            colors: ['black', 'white', 'yellow', 'red'],
            slug: "cable_diy_usb",
            type: 'tool',
            tags: ['cable'],
            title: "Cable tipo DIY-USB",
            category: 'tools'
        },
        {
            description: "Set de keycaps de un fuerte verde dandole un color maravilloso al teclado",
            images: [
                'hard_green.jpg',
                'hard_green2.jpg',
            ],
            inStock: 9,
            price: 34,
            colors: ['default'],
            slug: "keycaps_hard_green",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps hard green",
            category: 'keycaps'
        },
        {
            description: "Set de keycaps con un estilo 00s con los colores clasicos de un bluejean",
            images: [
                'keycaps_bluejean.jpg',
                'keycaps_bluejean2.jpg',
            ],
            inStock: 5,
            price: 50,
            colors: ['default'],
            slug: "keycaps_blue_jean",
            type: 'keycap',
            tags: ['keycaps', 'set', 'bluejean'],
            title: "Set Kercaps Bluejean",
            category: 'keycaps'
        },
        {
            description: "Un kit de herramientas para lubricado, desmontaje y montaje para keycaps y switches",
            images: [
                'kit_tools.jpg',
                'kit_tools2.jpg',
            ],
            inStock: 23,
            price: 12,
            colors: ['default'],
            slug: "kit_tools_complete",
            type: 'tool',
            tags: ['tools', 'kit'],
            title: "Kit de herramientas",
            category: 'tools'
        },
        {
            description: "Lubricante especial para switches, no deja grumos",
            images: [
                'lube_single.jpg',
                'lube_single2.jpg',
            ],
            inStock: 30,
            price: 8,
            colors: ['default'],
            slug: "lube_single",
            type: 'tool',
            tags: ['tools'],
            title: "Lubricante para switches",
            category: 'tools'
        },
        {
            description: "Set de keycaps con una mezcla de colores azul celeste y azul mecha",
            images: [
                'mecha_japan.jpg',
                'mecha_japan2.jpg',
            ],
            inStock: 5,
            price: 37,
            colors: ['default'],
            slug: "mecha_japan",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps Mecha",
            category: 'keycaps'
        },
        {
            description: "Kit de case y placa para custumizar tu teclado marca next time",
            images: [
                'next_time.jpg',
                'next_time2.jpg',
            ],
            inStock: 5,
            price: 73,
            colors: ['black', 'white', 'yellow'],
            slug: "next_time_case",
            type: 'keyboard',
            tags: ['keyboard', 'case', 'kit'],
            title: "Kit teclado Next Time",
            category: 'keyboards'
        },
        {
            description: "Set unicolor de keycaps para custumizar tu teclados",
            images: [
                'normal_keycaps.jpg',
                'normal_keycaps2.jpg',
            ],
            inStock: 5,
            price: 17,
            colors: ['black', 'white', 'yellow', 'red', 'blue'],
            slug: "normal_keycaps",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set keycaps unicolor",
            category: 'keycaps'
        },
        {
            description: "Set de keycaps con una hermosa mezcla de blanco, negro y un amarillo toxico",
            images: [
                'nuclear_yellow.jpg',
                'nuclear_yellow2.jpg',
            ],
            inStock: 2,
            price: 30,
            colors: ['default'],
            slug: "nuclear_yellow",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps Nuclear",
            category: 'keycaps'
        },
        {
            description: "Set de keycaps con colores pasteles para tener colores adaptados al bosque y la naturaleza",
            images: [
                'old_wood.jpg',
                'old_wood2.jpg',
            ],
            inStock: 0,
            price: 45,
            colors: ['default'],
            slug: "old_wood",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps Old Wood",
            category: 'keycaps'
        },
        {
            description: "Set de keycaps que recuerdan los juegos de nintendo de mario bros, con un color rojo y blanco",
            images: [
                'red_mario.jpg',
                'red_mario2.jpg',
            ],
            inStock: 5,
            price: 26,
            colors: ['default'],
            slug: "red_mario",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps Mario Bros",
            category: 'keycaps'
        },
        {
            description: "Kit de teclado customizable, marca skyloong, modelo gk61",
            images: [
                'skyloong_gk61_kit.jpg',
                'skyloong_gk61_kit2.jpg',
            ],
            inStock: 14,
            price: 83,
            colors: ['black', 'white'],
            slug: "skyloong_gk61",
            type: 'keyboard',
            tags: ['keyboard'],
            title: "Kit Keyboard Skyloong gk61",
            category: 'keyboards'
        },
        {
            description: "Set de keycaps pbs de color blanco y verde hoja tea, para aquellos que les gusta relajarse",
            images: [
                'sweet_green.jpg',
                'sweet_green2.jpg',
            ],
            inStock: 5,
            price: 19,
            colors: ['default'],
            slug: "sweet_green",
            type: 'keycap',
            tags: ['keycaps', 'set'],
            title: "Set Keycaps Sweet Green",
            category: 'keycaps'
        },
        {
            description: "Switches de 3 pines, marca gateron (speed, clicky, tactil) ",
            images: [
                'switch_gateron.jpg',
                'switch_gateron2.jpg',
            ],
            inStock: 102,
            price: 2,
            colors: ['black', 'white', 'yellow', 'red', 'blue'],
            slug: "switch_gateron",
            type: 'tool',
            tags: ['tools', 'switches'],
            title: "Switches Gateron",
            category: 'tools'
        },
        {
            description: "Switches de 3 pines, marca outemu hotswap (speed, clicky, tactil)",
            images: [
                'switch_outemu.jpg',
                'switch_outemu2.jpg',
            ],
            inStock: 99,
            price: 1,
            colors: ['black', 'white', 'yellow', 'red', 'blue'],
            slug: "switch_outemu",
            type: 'tool',
            tags: ['tools', 'switches'],
            title: "Switches Outemu hotswap",
            category: 'tools'
        },
    ]
}