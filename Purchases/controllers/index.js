const { Book } = require("../../models/books");
const { Customer } = require("../../models/customer");
const { Purchase } = require("../../models/purchase");
const Fawn = require("fawn");

const newPurchase = async (req, res) => {
  const { customerId, bookId } = req.body;

  const customer = await Customer.findById(customerId);
  if (!customer) return res.status(404).send("Customer does not exist");

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).send("Book does not exist");

  if (book.numberInStock === 0)
    return res.status(400).send("Book is out of stock");

  const purchase = new Purchase({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },

    book: {
      _id: book._id,
      title: book.title,
    },
  });

  await purchase.save();
  await book.update({ _id: book._id }, { $inc: { numberInStock: -1 } });

  res.send(purchase);
};

const getPurchase = async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);
  if (!purchase)
    return res.status(404).send("purchase with given Id was not found");

  res.send(purchase);
};

module.exports = {
  newPurchase,
  getPurchase,
};
