import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import ListView from '../components/listView';
import Box from '../components/box';
import DonutChart from '../components/donutChart';
import TopExpenses from '../components/topExpenses';
import connectToDatabase from '../db/db';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

type Props = NativeStackScreenProps<RootStackParamList>;
function HomeScreen({navigation}: Props): React.JSX.Element {
  const [database, setDatabase] = useState<SQLiteDatabase>();

  const loadData = async () => {
    try {
      const db = await connectToDatabase();
      setDatabase(db);
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
  }, [navigation]);

  return (
    <Box flex={1} alignItems={'center'} borderColor={'cardPrimaryBackground'}>
      <Box
        flexDirection={'row'}
        width={'100%'}
        paddingHorizontal={'m'}
        paddingVertical={'m'}
        justifyContent={'space-between'}>
        {database && <TopExpenses db={database} />}
        <DonutChart />
      </Box>
      {database && <ListView db={database} />}
    </Box>
  );
}

export default HomeScreen;
