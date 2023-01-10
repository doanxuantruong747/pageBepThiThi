const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderSchema = Schema(
    {
        customer: { type: String, require: true },
        address: { type: String, require: true },
        phone: { type: Number, require: true },
        products: [{
            product: { type: Schema.Types.ObjectId, require: false, ref: "Product" },
            quantity: { type: Number, require: false },
            sum: { type: Number, require: false },
        }],
        priceShiping: { type: Number, default: 0 },
        total: { type: Number, require: true },
        authorId: { type: String, require: true },

        datHang: { type: Number, require: true, default: 0 },
        soanHang: { type: Number, require: true, default: 1 },
        giaoHang: { type: Number, require: true, default: 2 },
        nhanHang: { type: Number, require: true, default: 3 },
        status: { type: Number, require: true, default: 0 },

        method: { type: Number, required: false, default: 0 },

        isDeleted: { type: Boolean, default: false, select: false },
    },
    { timestamps: true }
);


export default mongoose.models.Order || mongoose.model("Order", orderSchema);