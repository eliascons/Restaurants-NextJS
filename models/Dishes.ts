import mongoose from "mongoose";

const dishesSchema = new mongoose.Schema({
    name: String,
    restaurant: {type: mongoose.Schema.Types.String, ref: 'Restaurant'}
});



export default mongoose.models?.Dish || mongoose.model("Dish", dishesSchema);
