import * as SQLite from "expo-sqlite";
import { useCallback, useEffect } from "react";

export interface Product {
  id: number;
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
    const sql = `CREATE TABLE IF NOT EXIST products (
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
    console.log("Written into db");
  }, [db]);

  useEffect(() => {
    initDB();
  }, []);
};
