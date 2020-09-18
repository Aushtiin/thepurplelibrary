const { Book } = require("../../models/books");
const { Genre } = require("../../models/genres");

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort("name");
  res.send(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) return res.send("Invalid id");

  res.send(book);
};

const addBook = async (req, res) => {
  const { title, numberInStock, price } = req.body;

  const genre = await Genre.findOne({ name: req.body.genre });
  if (!genre) return res.status(404).send("Invalid Genre");

  const book = new Book({
    title,
    genre:{
        name: genre.name,
        _id: genre._id
    },
    numberInStock,
    price,
  });
  await book.save();

  res.send(book);
};

const editBook = async (req, res) => {
  const { id } = req.params;
  const { title, genre, numberInStock, price } = req.body;
  const book = await Book.findByIdAndUpdate(
    id,
    {title,
    genre,
    numberInStock,
    price},
    { new: true }
  );
  if (!book) return res.status(404).send("Book not found");
//fix route
  res.send(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send("Book not found");

  res.send(book);
};

module.exports = {
  getAllBooks,
  getBook,
  addBook,
  editBook,
  deleteBook,
};
