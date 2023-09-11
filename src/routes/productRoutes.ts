import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";

const productModel = new ProductModel();

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await productModel.index();
    res.json(products);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = {
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
    };

    if (!newProduct.name || !newProduct.price) {
      res.status(400);
      res.send("Missing param name or price");
      return false;
    }
    const product: Product = await productModel.create(newProduct);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing param id!");
      return false;
    }
    const product: Product = await productModel.show(id);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updateProduct = {
      id: req.params.id as unknown as number,
      name: req.body.name as unknown as string,
      price: req.body.price as unknown as number,
    };
    if (!updateProduct.id || !updateProduct.name || !updateProduct.price) {
      res.status(400);
      res.send("Missing param id or name or price!");
      return false;
    }
    const product: Product = await productModel.edit(updateProduct);
    res.json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    if (!id) {
      res.status(400);
      res.send("Missing param id!");
      return false;
    }
    await productModel.delete(id);
    res.send(`Deleted product ${id}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
