const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lqyancf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    const productsCollection = client.db('kinun').collection('products');
    const categoriesCollection = client.db('kinun').collection('categories');

    app.get('/products', async (req, res) => {
      const products = await productsCollection.find({}).toArray();
      res.send(products);
    });

    app.get('/products/:id', async (req, res) => {
      const id = req.params.id;
      const product = await productsCollection.findOne({
        _id: ObjectId(id),
      });
      res.send(product);
    });

    app.get('/products/categories', async (req, res) => {
      const categories = await categoriesCollection.find({}).toArray();
      res.send(categories);
    });
  } finally {
  }
};

run().catch(err => console.error(err));

app.get('/', async (req, res) => {
  res.send('<h1>Kinun server is running</h1>');
});

app.listen(port, () => console.log(`Kinun server is running on port:${port}`));
