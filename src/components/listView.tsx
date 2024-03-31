import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import Box from './box';
import Text from './text';
import {getItems} from '../db/items';

import {SQLiteDatabase} from 'react-native-sqlite-storage';

type ItemProps = {name: String; cost: number};

const Item = ({name, cost}: ItemProps) => (
  <Box
    paddingHorizontal={'m'}
    borderRadius={5}
    paddingVertical={'m'}
    borderWidth={1}
    flexDirection={'row'}
    width={'100%'}
    marginBottom={'s'}>
    <Box width={'80%'}>
      <Text variant={'paragraph'}>{name}</Text>
    </Box>
    <Box width={'20%'} borderLeftWidth={1}>
      <Text variant={'paragraph'} textAlign={'center'}>
        {cost}
      </Text>
    </Box>
  </Box>
);

function ListView({db}: {db: SQLiteDatabase}): React.JSX.Element {
  const [data, setData] = useState<ItemProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const fetchedItems = await getItems(db);
      setData(fetchedItems);
    } catch (error) {
      console.error(error);
    }
  }, [db]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Box width={'90%'}>
      <Box
        flexDirection={'row'}
        borderWidth={1}
        marginBottom={'s'}
        borderRadius={5}>
        <Box width={'70%'}>
          <Text variant={'subheader'} m={'s'}>
            Item
          </Text>
        </Box>
        <Box width={'30%'} borderLeftWidth={1}>
          <Text variant={'subheader'} m={'s'} textAlign={'center'}>
            Cost
          </Text>
        </Box>
      </Box>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} cost={item.cost} />}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      ) : (
        <Text variant={'paragraph'}>Your Recent Expenses Here!</Text>
      )}
    </Box>
  );
}

export default ListView;
