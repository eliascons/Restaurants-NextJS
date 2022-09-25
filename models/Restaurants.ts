// test
import mongoose from "mongoose";

const RestaurantSchema = new mongoose.Schema({
    name: String,
    dishes: [{type: mongoose.Schema.Types.ObjectId, ref: "Dish"}]
});


export default mongoose.models?.Restaurant || mongoose.model("Restaurant", RestaurantSchema);