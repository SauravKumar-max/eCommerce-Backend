const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const productsData = require("./db/data"); 
const  pageNotFound  = require("./middleware/pageNotFound");
const internalSeverError = require("./middleware/internalServerError");
const { initializeDBConnection } = require("./db/db.connect");

const productsRouter = require("./routes/products.route");
const cartsRouter = require("./routes/carts.route");
const wishlistRouter = require("./routes/wishlists.route")


app.use(cors());
app.use(bodyParser.json());

initializeDBConnection();

app.get('/', (req, res) => {
		res.send({success: true, message: "E-commerce API"});
});


app.use('/products', productsRouter);
app.use('/carts', cartsRouter);
app.use('/wishlists', wishlistRouter);


// ** Note: DO NOT MOVE (This should be last Route) **
// 404 error route Handler
app.use(pageNotFound);

// 500 server error handler
app.use(internalSeverError)

app.listen(3000, () => {
  console.log('server started');
});