import mongoose, {Model, model, Schema, SchemaType} from 'mongoose';
import { IOrder } from '../interface';


const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    orderItems: [{
        _id: { type: String, required: true},
        title: { type: String, required: true},
        size: { type: String, required: true},
        quantity: { type: Number, required: true},
        slug: { type: String, required: true},
        price: { type: Number, required: true}
    }],
    ShippingAddress: {
        firstName: { type: String, required: true},
        lastName : { type: String, required: true},
        address  : { type: String, required: true},
        address2 : { type: String},
        zip      : { type: Number, required: true},
        city     : { type: String, required: true},
        provincias: { type: String, required: true},
        phone    : { type: String, required: true},
    },
    numberOfItems: { type: Number, required: true},
    subTotal: { type: Number, required: true},
    tax: { type: Number, required: true},
    total: { type: Number, required: true},

    isPaid: { type: Boolean, required: true, default: false},
    paidAt: { type: String},

},
{
    timestamps: true
})


const Order:Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);
export default Order