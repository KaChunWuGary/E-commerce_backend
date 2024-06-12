const router = require('express').Router();
const { Category, Product } = require('../../models');


// The `/api/categories` endpoint

//getting all categories
router.get('/', async (req, res) => {
  try{
    const categoriesData = await Category.findAll({
      include: { model: Product},
    });
    const categories = categoriesData.map((category) => category.get({ plain: true }));
    res.json(categories)
  } catch (err) {
    res.status(500).json(err);
  }
});

//getting from one category
router.get('/:id',  async (req, res) => {
  try{
    const categoryData = await Category.findOne(
      {
        where:{id: req.params.id},
        include: {model: Product},
      },
    );
    const result = categoryData.get({ plain: true });
    res.json(result)
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try{
    const createcategoryData = await Category.create(req.body);
    res.json(createcategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const editcategoryData = await Category.update(
      req.body,
      { where: {id: req.params.id}}
    )
    res.json(editcategoryData);
    } catch (err) {
      res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const deletecategoryData = await Category.destroy(
      { where: {id: req.params.id}}
    )
    res.json(deletecategoryData);
    } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;
