import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {RootStackParamList} from '../navigation/types';
import ListView from '../components/listView';
import Box from '../components/box';
import DonutChart from '../components/donutChart';
import TopExpenses from '../components/topExpenses';
import connectToDatabase from '../db/db';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {getItems} from '../db/items';
import {Button} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList>;
type Item = {name: string; date_added: Date; category: string; cost: number};

function HomeScreen({navigation}: Props): React.JSX.Element {
  const [database, setDatabase] = useState<SQLiteDatabase>();
  const [items, setItems] = useState<Item[]>([]);

  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      setDatabase(db);

      loadItems(db);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadItems = async (db: SQLiteDatabase) => {
    try {
      const fetchedItems = await getItems(db);
      setItems(fetchedItems);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          onPress={() => navigation.navigate('CreateExpenseScreen')}
        />
      ),
    });

    loadData();
  }, [navigation, loadData]);

  return (
    <Box
      flex={1}
      alignItems={'center'}
      borderColor={'cardPrimaryBackground'}
      p={'m'}>
      <Box
        flexDirection={'row'}
        width={'100%'}
        justifyContent={'space-between'}>
        {database && <TopExpenses db={database} />}
        {items && <DonutChart items={items} />}
      </Box>
      <Box marginTop={'s'}>{items && <ListView items={items} />}</Box>
    </Box>
  );
}

export default HomeScreen;
