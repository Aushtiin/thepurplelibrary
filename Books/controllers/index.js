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
  const { title, genre, numberInStock } = req.body;

  const genreName = await Genre.findOne(genre);
  if (!genreName) return res.status(404).send("Invalid Genre");

  const book = new Book({ title, genre, numberInStock });
  await book.save();

  res.send(book);
};

const editBook = async (req, res) => {
  const { title, genre, numberInStock } = req.body;
  const book = await Book.findByIdandUpdate(
    req.params.id,
    title,
    genre,
    numberInStock,
    { new: true }
  );
  if (!book) return res.status(404).send("Genre not found");

  res.send(book);
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndRemove(req.params.id);
  if (!book) return res.status(404).send("Genre not found");

  res.send(book);
};

module.exports = {
    getAllBooks,
    getBook,
    addBook,
    editBook,
    deleteBook,
}