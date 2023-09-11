import { OrderModel } from '../../models/order';
import {UserModel} from "../../models/user";
import {ProductModel} from "../../models/product";

const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

describe("Order Model", () => {
    it('should have an index method', () => {
        expect(orderModel.index).toBeDefined();
    });

    it('should have a show by userId method', () => {
        expect(orderModel.showByUserId).toBeDefined();
    });

    it('should have a create method', () => {
        expect(orderModel.create).toBeDefined();
    });

    it('should have a edit method', () => {
        expect(orderModel.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(orderModel.delete).toBeDefined();
    });

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
        productModel.delete(1);
        userModel.delete(1);
    })

    it('create method should add a order', async () => {
        const result = await orderModel.create({
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        });
        expect(result).toEqual({
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        });
    });

    it('index method should return a list of order', async () => {
        const result = await orderModel.index();
        expect(result).toEqual([{
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        }]);
    });

    it('show method should return the correct order by userId', async () => {
        const result = await orderModel.showByUserId(1);
        expect(result).toEqual([{
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: false,
            user_id: 1
        }]);
    });

    it('edit method should update the correct order', async () => {
        const result = await orderModel.edit({
            id: 1,
            user_id: 1,
            status: true
        });
        expect(result).toEqual({
            id: 1,
            order_products: [{ product_id: 1, quantity: 1 }],
            status: true,
            user_id: 1
        });
    });

    it('delete method should remove the order', async () => {
        await orderModel.delete(1);
        const result = await orderModel.index()

        expect(result).toEqual([]);
    });
});