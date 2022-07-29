export interface IProduct {
    _id: string
    description: string;
    images: string[];
    inStock: number;
    price: number;
    colors: IColors[];
    slug: string;
    tags: string[];
    title: string;
    type: ITypes;
    category: 'keycaps' | 'keyboards' | 'tools'

    // Create createAt

    createdAt: string,
    updatedAt: string
}

export type IColors = 'black' | 'white' | 'yellow'| 'blue' | 'red' |'default';
export type ITypes = 'keycap' | 'keyboard' | 'kit' | 'lube' | 'tool';


