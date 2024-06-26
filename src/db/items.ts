import {SQLiteDatabase} from 'react-native-sqlite-storage';

type Item = {
  id: number;
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};

type ItemAdd = {
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};
type TopItemProps = {name: string};
// function to add new Item
export const addItem = async (db: SQLiteDatabase, item: ItemAdd) => {
  const insertQuery = `
    INSERT INTO ITEMS (name, date_added, category, cost)
    VALUES (?, ?, ?, ?)`;

  const date = item.date_added.toISOString();
  const values = [item.name, date, item.category, item.cost];

  try {
    return db.executeSql(insertQuery, values);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add contact');
  }
};

export const getTopCostItems = async (
  db: SQLiteDatabase,
): Promise<TopItemProps[]> => {
  const query = `
  SELECT name, cost FROM Items
  ORDER BY cost DESC
  LIMIT 3`;
  try {
    const items: Item[] = [];
    const results = await db.executeSql(query);
    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Items');
  }
};

// function to get all items
export const getItems = async (db: SQLiteDatabase): Promise<Item[]> => {
  try {
    const items: Item[] = [];
    const results = await db.executeSql(
      'SELECT * FROM Items ORDER BY date_added DESC',
    );
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

export const getItemsByCategory = async (
  db: SQLiteDatabase,
  category: string,
): Promise<Item[]> => {
  const query =
    'SELECT * FROM Items WHERE category = ? ORDER BY date_added DESC';
  const values = [category];

  try {
    const items: Item[] = [];
    const results = await db.executeSql(query, values);

    results?.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        items.push(result.rows.item(index));
      }
    });
    return items;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get items by category from database');
  }
};

//function to delete an item
export const deleteItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE FROM Items where id = ${id}`;

  try {
    await db.executeSql(deleteQuery);
    console.log(`successfully deleted ${id}`);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete Items');
  }
};
