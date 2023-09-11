import { ProductModel } from '../../models/product';

const productModel = new ProductModel();

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productModel.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productModel.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productModel.create).toBeDefined();
    });

    it('should have a update method', () => {
        expect(productModel.edit).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(productModel.delete).toBeDefined();
    });

    it('create method should add a product', async () => {
        const result = await productModel.create({
            name: 'Product',
            price: 15
        });
        expect(result).toEqual({
            id: 2,
            name: "Product",
            price: 15
        });
    });

    it('index method should return a list of product', async () => {
        const result = await productModel.index();
        expect(result).toEqual([{
            id: 2,
            name: "Product",
            price: 15
        }]);
    });

    it('show method should return the correct product', async () => {
        const result = await productModel.show(2);
        expect(result).toEqual({
            id: 2,
            name: "Product",
            price: 15
        });
    });

    it('edit method should update the correct product', async () => {
        const result = await productModel.edit({
            id: 2,
            name: 'ProductUpdated',
            price: 16
        });
        expect(result).toEqual({
            id: 2,
            name: "ProductUpdated",
            price: 16
        });
    });

    it('delete method should remove the product', async () => {
        await productModel.delete(2);
        const result = await productModel.index()
        expect(result).toEqual([]);
    });
});