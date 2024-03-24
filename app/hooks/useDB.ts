import * as SQLite from "expo-sqlite";
import { useCallback, useEffect } from "react";

export interface Product {
  id?: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
}

export const useDB = () => {
  const db = SQLite.openDatabase("shop.db");
  const initDB = useCallback(async () => {
    const sql = `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      quantity INTEGER NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL
    )`;
    const readonly = false;
    await db.execAsync([{ sql, args: [] }], readonly);
    console.log("Init db");
  }, [db]);

  // Inital DB setup if not exit
  useEffect(() => {
    initDB();
  }, []);

  const insertProduct = async (product: Product, onSuccess?: () => void) => {
    const sql = `INSERT INTO products (
      name, price, quantity, image, description, category
    ) VALUES (?, ?, ?, ?, ?, ?);`;
    const args = [
      product.name,
      product.price,
      product.quantity,
      product.image,
      product.description,
      product.category,
    ];
    const readonly = false;

    const result = await db.execAsync([{ sql, args }], readonly);
    if (onSuccess) onSuccess();
    return result;
  };

  const getProducts = async (): Promise<Product[]> => {
    const sql = `SELECT * FROM products;`;
    const readonly = true;
    try {
      const result: any = await db.execAsync([{ sql, args: [] }], readonly);
      return result[0].rows;
    } catch (err) {
      throw err;
    }
  };

  return { insertProduct, getProducts };
};
