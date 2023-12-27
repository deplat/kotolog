const Cat = require('../models/cat');

/**
 * QUESTION:
 * Do I REALLY NEED TRY/CATCH THERE?
*/


const getAllCats = (filter, pageNum, pageSize, sortField, sortOrder) => {
  try {
    return Cat
    .find(filter)
    .skip((pageNum-1)*pageSize)
    .limit(pageSize)
    .sort({ [sortField]: sortOrder });
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneCat = (catId) => {
  try {
    return Cat.findById(catId);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewCat = (newCat) => {
  try {
    const createdCat = new Cat(newCat);
    /*
    for (let i = 0; i < newCat.images.length; i++ ) {
      Cat.images.push(newCat.images[i].url);
    }
    */
    return createdCat.save();
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneCat = (catId, changes) => {
  try {
    const options = { new: true };
    const updatedCat = Cat.findByIdAndUpdate(
      catId, changes, options
    );
    return updatedCat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneCat = (catId) => {
  try {
    const deletedCat = Cat.findByIdAndDelete(catId);
    return deletedCat;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
}
};

module.exports = {
  getAllCats,
  getOneCat,
  createNewCat,
  updateOneCat,
  deleteOneCat
}