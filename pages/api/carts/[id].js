import dbConnect from "../../../untils/mongo";
import Cart from "../../../models/Cart";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies
  } = req;


  const token = cookies.token

  dbConnect();

  //update single cart
  if (method === "PUT") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      let cart = await Cart.findById(id);

      if (!cart) {
        return res.status(401).json({ cart: false });
      }

      const allows = [
        "quantity",
      ];

      allows.forEach((field) => {
        if (req.body[field] !== undefined) {
          cart[field] = req.body[field]
        }
      });

      await cart.save();

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // delete single cart
  if (method === "DELETE") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      let cart = await Cart.findByIdAndDelete(id);
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
