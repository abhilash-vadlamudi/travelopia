const fs = require('fs');
const mustacheViews = {};
fs.readdirSync(__dirname)
  .forEach(file => {
    if (file !== "index.js" && file.includes(".js")) {
      const name = file.replace(".js", "");
      mustacheViews[name] = require('./' + file);
    }
  })
module.exports = mustacheViews;