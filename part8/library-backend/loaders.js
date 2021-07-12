const Author = require('./models/Author')

const authorBatch = async (keys) => {
    const authors = await Author.findAll({
        where: {
          _id: {
            $in: keys
          }
        }
    })

    return keys.map(key => authors.find(author => author._id === key))
}

module.exports = authorBatch