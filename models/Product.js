const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = Schema(
    {
        title: { type: String, required: true },
        describe: { type: String, required: true },
        price: { type: Number, required: true },
        priceSale: { type: Number, required: false },
        unit: { type: String, required: true },
        image: { type: [], required: true },
        rating: { type: Number, required: false },
        feedback: { type: [{}], required: false },

        isDeleted: { type: Boolean, default: false, required: true },

        author: {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User",
        },

    },
    { timestamps: true }
);



export default mongoose.models.Product || mongoose.model("Product", productSchema);