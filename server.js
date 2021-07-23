const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
  mongoose.connect(DB,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to database successfully!')
);

app.use(passport.initialize())
app.use(passport.session())


const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
