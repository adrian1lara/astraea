import {FlatList} from 'react-native';
import Box from './box';
import Text from './text';
import React, {useEffect, useState} from 'react';
import {getTopCostItems} from '../db/items';
import {SQLiteDatabase} from 'react-native-sqlite-storage';

type TopItemProps = {name: string};

const TopItems = ({name}: TopItemProps) => (
  <Box borderWidth={1} p={'s'} borderRadius={8} marginBottom={'s'}>
    <Text variant={'body'}>{name}</Text>
  </Box>
);

function TopExpenses({db}: {db: SQLiteDatabase}): React.JSX.Element {
  const [data, setData] = useState<TopItemProps[]>([]);

  useEffect(() => {
    const displayTopCostItems = async () => {
      try {
        const topItems = await getTopCostItems(db);
        setData(topItems);
      } catch (error) {
        console.error(error);
      }
    };

    displayTopCostItems();
  }, [db, data]);

  return (
    <Box borderWidth={1} borderRadius={10} padding={'s'}>
      <Text variant={'subheader'}>Top Expenses</Text>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({item}) => <TopItems name={item.name} />}
        />
      ) : (
        <Text variant={'body'}>Add some expenses</Text>
      )}
    </Box>
  );
}

export default TopExpenses;
