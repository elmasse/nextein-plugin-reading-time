
const unified = require('unified')
const rehype = require('rehype-parse')
const rehype2retext = require('rehype-retext')
const english = require('retext-english')
const visit = require('unist-util-visit')

const stats = (hast) => {
  let counts;

  const count = () => {
    return function counter(tree) {
      counts = {};
      visit(tree, visitor);
      function visitor(node) {
        counts[node.type] = (counts[node.type] || 0) + 1;
      }
    }
  }

  unified()
    .use(rehype)
    .use(rehype2retext,
      unified().use(english).use(count)
    ).runSync(hast)
  
  return counts;
}
  
const words = ({ wordsPerMinute }) => hast => {
  const { WordNode: totalWords = 0 } = stats(JSON.parse(JSON.stringify(hast)))
  return Math.ceil(totalWords / wordsPerMinute)
}

module.exports.transform = ({ wordsPerMinute = 200 } = {}, posts) => {
  const readingTime = words({wordsPerMinute})
  return posts.map(post => {
    post.data.readingTime = readingTime(post.content)
    return post
  })
}
