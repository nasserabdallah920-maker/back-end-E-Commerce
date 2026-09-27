const app = require("./app");
const { connectDB } = require("./src/config/db.config");

connectDB();
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`the server is running at port ${port}`);
});
