const kotoDB = require('../databases/kotoDB');

const getAllCats = (filter, pageNum, pageSize, sortField, sortOrder) => {
  try {
    const allCats = kotoDB.getAllCats(filter, pageNum, pageSize, sortField, sortOrder);
    return allCats;
  } catch (error) {
    throw error;
  }
};

const getOneCat = (catId) => {
  try { 
    const cat = kotoDB.getOneCat(catId);
    return cat; 
  } catch (error) {
    throw error;
  }
};

const createNewCat = (newCat) => {
  try {
    const createdCat = kotoDB.createNewCat(newCat);
    return createdCat;
  } catch (error) {
    throw error;
  }
};

const updateOneCat = (catId, changes) => {
  try {
    const updatedCat = kotoDB.updateOneCat(catId, changes);
    return updatedCat;
  } catch (error) {
    throw error;
  }
};

const deleteOneCat = (catId) => {
  try {
    const deletedCat = kotoDB.deleteOneCat(catId);
    return deletedCat;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat
};
