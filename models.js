import mongoose from "mongoose";

const schema = new mongoose.Schema({
  password: String,
  username: String,
  firstName: String,
  lastName: String,
  avatar: String,
  admin: Boolean,
});

const cart_schema = new mongoose.Schema({
  user_id: String,
  products: Array,
});

const products_schema = new mongoose.Schema({
  product_name: String,
  product_description: String,
  product_price: Number,
  product_imgUrl: String,
  product_stock: Number,
});

const chat_schema = new mongoose.Schema({
  author: {
    email: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    alias: { type: String, required: true },
  },
  text: { type: String, required: true },
  fechahora: { type: String, required: true },
});

const orders_schema = new mongoose.Schema({
  nro: Number,
  user: String,
  prod: Array,
});

const modelo = mongoose.model("User", schema);
const cart_model = mongoose.model("Cart", cart_schema);
const products_model = mongoose.model("Products", products_schema);
const chat_model = mongoose.model("Chats", chat_schema);
const order_model = mongoose.model("Orders", orders_schema);

export { modelo, cart_model, products_model, chat_model, order_model };
