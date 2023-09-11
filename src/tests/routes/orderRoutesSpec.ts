import supertest from 'supertest';
import app from '../../server';
import { userAuthToken } from '../../utils/auth';
import {UserModel} from "../../models/user";
import {ProductModel} from "../../models/product";

 const request = supertest(app)
 const token: string = userAuthToken({username: 'username', password: 'password'});

 const userModel = new UserModel();
 const productModel = new ProductModel();

describe('Order routes: ', () => {
    beforeAll(() => {
        productModel.create({
            name: 'Product',
            price: 20
        });
        userModel.create({
            username: 'username',
            password: 'password',
            firstname: 'firstname',
            lastname: 'lastname'
        })
    });

    afterAll(() => {
        productModel.delete(3);
        userModel.delete(3);
    });

    it('should return a new order after it is created', () => {
        const data = {
            user_id: 3,
            status: false,
            order_products: [{ product_id: 1, quantity: 1 }]
        }
        request
            .post('/api/orders/create')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all orders', () => {
        request
            .get('/api/orders')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show an order with given id', () => {
        request
            .get('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should update an order with given id', () => {
        const data = {
            user_id: 3,
            status: true,
        }
        request
            .put('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .send(data)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should show all orders with given user_id', () => {
        request
            .get('/api/orders/user/3')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('should delete an order with given id', () => {
        request
            .delete('/api/orders/2')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });
})