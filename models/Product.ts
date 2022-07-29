import mongoose, {Model, model, Schema} from 'mongoose';
import { IProduct } from '../interface';


const productSchmea = new Schema(
    {
        description: {type: String, required: true, default: ''},
        images: [{type: String}],
        inStock: {type: Number, required: true, default: 0},
        price: {type: Number, required: true, default: 0},
        colors: [
            {
                type: String,
                enum: {
                    values: ['black', 'white', 'yellow', 'blue', 'red','default'],
                    message: '{VALUE} no es permitido'
                }
            }],
        slug: {type: String, required: true, unique: true},
        tags: [{type: String}],
        title: {type: String, required: true, default: ''},
        type: [
            {
                type: String,
                enum: {
                    values: ['keycap', 'keyboard', 'kit', 'lube', 'tool'],
                    message: '{VALUE} no permitido talle'
                },
                default: 'keyboard'
            }],
        category: [
            {
                type: String,
                enum: {
                    values: ['keycaps', 'keyboards', 'tools'],
                    message: '{VALUE} no es un genero valido'
                },
                default: 'keyboard'
            
            }]
    },
    {
        timestamps: true
    }
)

// Crear indice en mongo

productSchmea.index({title: 'text', tags: 'text'})

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchmea)

export default Product
