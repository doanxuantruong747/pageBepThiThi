import dbConnect from "../../../untils/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  let { page, limit, customer, ...filterQuery } = req.query
  await dbConnect();

  if (method === "GET") {
    try {
      const filterKeys = Object.keys(filterQuery);
      if (filterKeys.length) {
        return res.status(401).json({ status: false, message: 'tên truy vấn sai' });
      }

      const filterConditions = [{ isDeleted: false }]
      if (customer) {
        filterConditions.push({
          customer: { $regex: customer, $options: "i" },
        })
      }
      const filterCritera = filterConditions.length
        ? { $and: filterConditions }
        : {};

      const count = await Order.countDocuments(filterCritera)
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 10;
      const totalPages = Math.ceil(count / limit);
      const offset = limit * (page - 1)

      const orders = await Order.find(filterCritera)
        .sort({ createdAt: -1 })
        .populate({
          path: 'products',
          populate: { path: 'product' }
        })
        .limit(limit)
        .skip(offset);

      res.status(200).json(orders, totalPages, count);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
