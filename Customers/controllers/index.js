const { Customer } = require("../../models/customer");

const getCustomer = async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.send(customer);
};

const newCustomer = async (req, res) => {
  const { name, phone, isGold } = req.body;

  const customer = new Customer({
    name,
    phone,
    isGold,
  });
  await customer.save();

  res.send(customer);
};

const editCustomer = async (req, res) => {
  const { name, phone, isGold } = req.body;

  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    name,
    phone,
    isGold,
  });

  if (!customer) return res.status(404).send("Customer not found");

  res.send(customer);
};

const deleteCustomer = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).send("Customer not found");

  res.send(customer);
};

module.exports = {
  getCustomer,
  newCustomer,
  editCustomer,
  deleteCustomer,
};
