import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {RootStackParamList} from '../navigation/types';
import ListView from '../components/listView';
import Box from '../components/box';
import DonutChart from '../components/donutChart';
import TopExpenses from '../components/topExpenses';
import connectToDatabase from '../db/db';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {deleteItem, getItems, getItemsByCategory} from '../db/items';

import {AddButton} from '../components/addButton';
import {BarsButton} from '../components/barsButton';
import {Title} from '../components/headerTitle';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
type ItemProp = {
  id: number;
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};

function HomeScreen({navigation, route}: Props): React.JSX.Element {
  const [database, setDatabase] = useState<SQLiteDatabase>();
  const [items, setItems] = useState<ItemProp[]>([]);

  const category = route.params?.category;
  console.log(category);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => Title({textTitle: category}),
      headerRight: () => AddButton({navigation, category}),
      headerLeft: () => BarsButton({navigation}),
    });

    const loadItems = async () => {
      try {
        const db = await connectToDatabase();
        setDatabase(db);
        if (category === 'All') {
          const fetchedItems = await getItems(db);
          setItems(fetchedItems);
        } else {
          const fetchedItemsByCategories = await getItemsByCategory(
            db,
            category,
          );
          setItems(fetchedItemsByCategories);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const unsubscribe = navigation.addListener('state', () => {
      loadItems();
    });

    return unsubscribe;
  }, [navigation, category]);

  const handleDeleteItem = async (id: number) => {
    const newItems = [...items];

    try {
      const db = await connectToDatabase();
      await deleteItem(db, id);
      const index = items.findIndex(v => v.id === id);
      newItems.splice(index, 1);
      setItems(newItems);
      //await loadItems(db);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      flex={1}
      alignItems={'center'}
      borderColor={'cardPrimaryBackground'}
      backgroundColor={'mainBackground'}
      p={'m'}>
      <Box
        flexDirection={'row'}
        width={'100%'}
        justifyContent={'space-between'}>
        {database && <TopExpenses db={database} />}
        {items && <DonutChart items={items} />}
      </Box>
      <Box marginTop={'s'}>
        {items && <ListView items={items} onDeleteItem={handleDeleteItem} />}
      </Box>
    </Box>
  );
}

export default HomeScreen;
