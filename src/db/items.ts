import {SQLiteDatabase} from 'react-native-sqlite-storage';

type Item = {name: string; date_added: Date; category: string; cost: number};

// function to add new Item
export const addItem = async (db: SQLiteDatabase, item: Item) => {
  const insertQuery = `
    INSERT INTO ITEMS (name, date_added, category, cost)
    VALUES (?, ?, ?, ?)`;

  const values = [item.name, item.date_added, item.category, item.cost];

  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add contact');
  }
};

export const getItems = async (db: SQLiteDatabase): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql('SELECT * FROM Items');
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Items from database');
  }
};
