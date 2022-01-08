import mongoose from 'mongoose';

const nameCollectProducts = 'products'
const nameColletMessages = 'messages'

const productSchema = mongoose.Schema({
    title: String,
    price: Number,
    thumbnail: String
});

const messageSchema = mongoose.Schema({
        author: Object,
        text: String,
        date: String
})

export const products = mongoose.model(nameCollectProducts, productSchema);
export const messages = mongoose.model(nameColletMessages, messageSchema);