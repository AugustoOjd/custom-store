import mongoose, {Model, model, Schema} from 'mongoose';
import { IProduct } from '../interface';


const productSchmea = new Schema(
    {
        description: {type: String, required: true},
        images: [{type: String}],
        inStock: {type: Number, required: true, default: 0},
        price: {type: Number, required: true, default: 0},
        size: [
            {
                type: String,
                enum: {
                    values: ['XS','S','M','L','XL','XXL','XXXL'],
                    message: '{VALUE} no es permitido'
                }
            }],
        slug: {type: String, required: true, unique: true},
        tags: [{type: String}],
        title: {type: String, required: true},
        type: [
            {
                type: String,
                enum: {
                    values: ['shirts','pants','hoodies','hats'],
                    message: '{VALUE} no permitido talle'
                }
            }],
        gender: [
            {
                type: String,
                enum: {
                    values: ['men','women','kid','unisex'],
                    message: '{VALUE} no es un genero valido'
                }
            
            }]
    },
    {
        timestamps: true
    }
)

// Crear indice en mongo

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchmea)

export default Product