const { Genre } = require("../../models/genres");

const getAllGenres = async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
};

const getGenre = async (req, res) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) return res.status(404).send("Invalid Id");

  res.send(genre);
};

const newGenre = async (req, res) => {
  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
};

const editGenre = async (req, res) => {
  const { id } = req.params;
  const genre = await Genre.findByIdAndUpdate(
    id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
};

const deleteGenre = async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre not found");

  res.send(genre);
};

module.exports = {
  deleteGenre,
  editGenre,
  getAllGenres,
  newGenre,
  getGenre,
};
