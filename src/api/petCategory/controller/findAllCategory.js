const findAllCategory = async (req, res) => {
  const cursor = petsCategory.find();
  const result = await cursor.toArray();
  res.send(result);
};

module.exports = findAllCategory;
