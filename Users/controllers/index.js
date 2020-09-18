const { User } = require("../../models/user");
const { pick } = require("lodash");

const getUser = async (req, res) => {
  const { _id } = req.decoded;
  const user = await User.findById({_id}).select('-hash -salt');

  if (!user) return res.status(404).send("User does not exist");

  res.send(user)
};

const newUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists");

  user = new User({
    name,
    email,
    password,
    isAdmin,
  });
  user.setPassword(password);
  await user.save();

  const token = user.generateAuthToken();

  const data = {
    token,
    user: pick(req.body, ["_id", "name", "email"]),
  };
  res.send(data);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid Login Credentials");

  const validPassword = user.verifyPassword(password);
  if (!validPassword) return res.send(400).send("Invalid login Credentials");

  const token = user.generateAuthToken();

  const data = {
    token,
    user: pick(user, ["name", "email"]),
  };
  res.send(data);
};

module.exports = {
  getUser,
  newUser,
  login,
};
