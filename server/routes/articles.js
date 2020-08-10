const express = require('express')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useCreateIndex: true, // https://github.com/Automattic/mongoose/issues/6890
  useFindAndModify: false, // https://mongoosejs.com/docs/deprecations.html#findandmodify,
  useUnifiedTopology: true,
})
const router = express.Router()

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to mongo db')
})

const articleSchema = new mongoose.Schema({
  slug: { type: [String], index: true },
  comments: [{ body: String, date: Date }],
  views: Number,
})

// Get reads, comments for an article (reads will be += 1 automatically))
router.get('/:slug', async (req, res, next) => {
  const slug = req.params.slug
  try {
    const Article = mongoose.model('Article', articleSchema)
    const { views, comments } = await Article.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
    res.json({
      slug,
      views,
      comments,
    })
  } catch (err) {
    next(err)
  }
})

// Post a comment
router.post('/:slug/comments', async (req, res, next) => {
  const slug = req.params.slug
  const comment = req.body.comment
  try {
    const Article = mongoose.model('Article', articleSchema)
    const response = await Article.updateOne(
      { slug },
      {
        $push: {
          comments: {
            body: comment,
            date: Date.now(),
          },
        },
      }
    )
    console.log(response)
    res.json({
      slug,
      comment,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
