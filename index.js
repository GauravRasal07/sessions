const app = require("./app.js");

const PORT = process.env.PORT || 9000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`The app is listening on PORT: ${PORT}`);
  }
});
