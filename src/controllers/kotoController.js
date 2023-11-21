const kotoService = require('../services/kotoService');

const getAllCats = async (req, res) => {
  let pageNum = 1;
  let pageSize = 20;
  let sortField = '_id';
  let sortOrder = -1;
  const {
    name,
    color,
    sex,
    age,
    page,
    length,
    sortBy,
    sort
  } = req.query;
  filter = {};
  if (name) {
    filter.name = name;
  };
  if (color) {
    filter.color = color;
  };
  if (sex) {
    filter.sex = sex;
  };
  if (age) {
    filter.age = age;
  };
  if(page) {
    pageNum = page;
  };
  if(length) {
    pageSize = length;
  };
  if (sortBy) {
    sortField = sortBy;
  };
  if(sort) {
    sortOrder = Number(sort);
  };

  try {
    const allCats = await kotoService.getAllCats(filter, pageNum, pageSize, sortField, sortOrder);
    res.send({ status: 'OK', data: allCats });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const getOneCat = async (req, res) => {
  const {
    params: { catId }
  } = req;
  if (!catId) {
    res
      .status(error?.status || 500)
      .send({
        status: 'FAILED',
        data: { error: "Parameter ':catId' can not be empty." }
      });
  }
  try {
    const cat = await kotoService.getOneCat(catId);
    res.send({ status: 'OK', data: cat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const createNewCat = async (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.color ||
    !body.sex ||
    !body.age
  ) {
    res
      .status(400)
      .send({
        status: 'FAILED',
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'color', 'sex', 'age'."
        }
      });
    return;
  }
  const newCat = {
    name: body.name,
    color: body.color,
    sex: body.sex,
    age: body.age
  };
  try {
    const createdCat = await kotoService.createNewCat(newCat);
    res.status(201).send({ status: 'OK', data: createdCat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const updateOneCat = async (req, res) => {
  const {
    body,
    params: { catId }
  } = req;
  if (!catId) {
    res
      .status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter 'catId' can not be emprty." }
      });
  }
  try {
    const updatedCat = await kotoService.updateOneCat(catId, body);
    res
      .send({ status: 'OK', data: updatedCat });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

const deleteOneCat = async (req, res) => {
  const {
    params: { catId }
  } = req;
  if (!catId) {
    res
      .status(400)
      .send({
        status: 'FAILED',
        data: { error: "Parameter 'catId' can not be empty" }
      });
  }
  try {
    const deletedCat = await kotoService.deleteOneCat(catId);
    res.status(204).send({ status: 'OK' });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: 'FAILED', data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat
};