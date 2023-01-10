import dbConnect from "../../../untils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method, cookies, body } = req;
  let { page, limit, title, ...filterQuery } = req.query;

  const token = cookies.token

  dbConnect();

  // api get list products
  if (method === "GET") {
    try {
      const filterKeys = Object.keys(filterQuery);
      if (filterKeys.length) {
        return res.status(401).json({ status: false, message: 'tên truy vấn sai' });
      }

      const filterConditions = [{ isDeleted: false }]
      if (title) {
        filterConditions.push({
          title: { $regex: title, $options: "i" },
        })
      }
      const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

      const count = await Product.countDocuments(filterCritera)
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const totalPages = Math.ceil(count / limit);
      const offset = limit * (page - 1)


      let products = await Product.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate("author")
        .limit(limit)
        .skip(offset)

      res.status(200).json({ products, totalPages, count });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if (!token || token !== process.env.token) {
    //   return res.status(401).json("Not authenticated!")
    // }
    try {
      const product = await Product.create(body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
