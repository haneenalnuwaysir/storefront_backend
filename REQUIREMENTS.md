# Image Processing API

The company stakeholders have decided they want to set up an online store to make their great product ideas available for purchase -- and they want you and your co-worker to build it.

The stakeholders have put together a list of requirements for this online store. Your co-worker will be building the frontend and you will be supplying the JavaScript API. The requirements have been collected into requirements document.


## API Endpoints
#### Users
- Index [token required] (GET `/api/users`)
- Show [token required] (GET `/api/users/:id`)
- Create (POST `/api/users/create`)
- Update [token required] (PUT `/api/users/:id`)
- Delete [token required] (DELETE `/api/users/:id`)
- Authenticate (POST `/api/users/authenticate`)
#### Products
- Index (GET `/api/products` )
- Show (GET `/api/products/:id`)
- Create [token required] (POST `/api/products/create`)
- Update [token required] (PUT `/api/products/:id`)
- Delete [token required] (DELETE `/api/products/:id`)
#### Order
- Index [token required] (GET `/api/orders`)
- Show [token required] (GET `/api/orders/:id`)
- Create [token required] (POST `/api/orders/create`)
- Update [token required] (PUT `/api/orders/:id`)
- Delete [token required] (DELETE `/api/orders/:id`)
- Current Order by user (args: user id)[token required] (GET `/api/orders/user/:user_id`)

## Data Shapes
#### User
The table includes the following fields:
- id
- username
- firstName
- lastName
- password
The SQL schema for this table is as follows:
```sql
CREATE TABLE users (
  id                SERIAL PRIMARY KEY,
  username          VARCHAR(100) NOT NULL,
  firstname         VARCHAR(100) NOT NULL,
  lastname          VARCHAR(100) NOT NULL,
  password_digest   VARCHAR NOT NULL
);
```
#### Product
The table includes the following fields:
- id
- name
- price
The SQL schema for this table is as follows:
```sql
CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  price INTEGER      NOT NULL
);
```


#### Orders
The table includes the following fields:
- id
- user_id
- status of order (active or complete)
The SQL schema for this table is as follows:
```sql
CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);
```

#### order_products
The table includes the following fields:
- id
- order_id
- product_id
- quantity
The SQL schema for this table is as follows:
```sql
CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
```
## Data Shapes for Postman
#### create a new user
```sql
{
  "username":"Test_user",
  "firstname":"Test_name",
  "lastname":"Test_last",
  "password":"testPassword124"
}
```
#### create a new product
```sql
{
  "name":"book",
  "price":"200"
}
```
#### create a new order
```sql
{
  "user_id":"1",
  "status":"true"
}
```
#### create a new order_products
```sql
{
  "order_id":"1",
  "product_id":"1",
  "quantity":"12"
}
```

