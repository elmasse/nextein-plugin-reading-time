# nextein-plugin-reading-time
Add a `readingTime` to your `post.data` based on your post content.


## Install

```
npm i nextein-plugin-reading-time
```

## Usage

Edit your `next.config.js` file and add it to the plugins list:

```js
// next.config.js
const { withNextein } = require('nextein/config')


module.exports = withNextein({
  nextein: function(config) {
   
    config.plugins.push({
      name: 'nextein-plugin-reading-time',
      options: {
        wordsPerMinute: 130
      }
    })

   return config
 },
  // ...
}))

```

## Configuration

The `options` object can define the following properties:

- wordsPerMinute: `{Integer}. Default: 130`. Calculate the words per minute ratio.

