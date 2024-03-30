import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';

//enable promises at the beginning
enablePromise(true);

type Table = ['Items'];

// function to create at Items Table
export const createTables = async (db: SQLiteDatabase) => {
  const items = `
    CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
        category TEXT,
        cost REAL NOT NULL
    );`;

  try {
    await db.executeSql(items);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create tables');
  }
};

// Function to retrieve table names
export const getTablesNames = async (db: SQLiteDatabase): Promise<string[]> => {
  try {
    const tableNames: string[] = [];
    const results = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
    );
    results?.forEach(result => {
      for (let i = 0; i < result.rows.length; i++) {
        tableNames.push(result.rows.item(i).name);
      }
    });
    return tableNames;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get table names from database');
  }
};

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to drop table ${tableName}`);
  }
};

const connectToDatabase = async (): Promise<SQLiteDatabase> => {
  return openDatabase(
    {name: 'astraea.db', location: 'default'},
    () => {},
    error => {
      console.error(error);
      throw new Error('Could not connect to database');
    },
  );
};

export default connectToDatabase;
