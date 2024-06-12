const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags, includes its associated Product data
router.get('/', async (req, res) => {
  try{
    const allTagData = await Tag.findAll({
      include: { all:true }
    });
    const allTags = allTagData.map((Tag) => Tag.get({ plain: true }));
    res.json(allTags)
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// find a single tag by its `id`, includes its associated Product data
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findOne(
      {
        where:{id: req.params.id},
        include: { all: true },
      },
    );
    const tag = tagData.get({ plain: true });
    res.json(tag)
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// create a new tag
router.post('/', async(req, res) => {
  try{
    const createTagData = await Tag.create(req.body);
    res.json('created: '+ createTagData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    await Tag.update(
      req.body,
      { where: {id: req.params.id}}
    )
    res.json("Successfully edited tag");
    } catch (err) {
      res.status(500).json(err.message);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try{
    await Tag.destroy(
      { where: {id: req.params.id}}
    )
    res.json("Sucessfully deleted tag");
    } catch (err) {
      res.status(500).json(err.message);
  }
});

module.exports = router;
