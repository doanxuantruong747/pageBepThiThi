import dbConnect from "../../../untils/mongo";
import Cart from "../../../models/Cart";


const handler = async (req, res) => {
  const { method } = req;
  let { productId, quantity, author } = req.body;

  await dbConnect();

  // get list Carts 
  if (method === "GET") {
    try {

      let carts = await Cart.find()
        .populate("productId")
      let totalQuantity = 0;

      if (carts.length) {
        carts.forEach((item) => { totalQuantity += item.quantity })
      }

      res.status(200).json({ carts, totalQuantity });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // add product cast
  if (method === "POST") {
    try {
      let cart = await Cart.findOne({ productId, author })

      if (cart) {
        cart.quantity += quantity;
        await cart.save()
        return res.status(201).json(cart);
      }

      cart = await Cart.create(req.body);
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
