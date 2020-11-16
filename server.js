const PORT = process.env.PORT || 1337;
const app = require('./app');

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
