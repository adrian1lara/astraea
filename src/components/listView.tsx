import React, {useState} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import Box from './box';
import Text from './text';

type ItemProps = {
  id: number;
  name: String;
  cost: number;
  onDeleteItem: (id: number) => void;
};

type Item = {
  id: number;
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};

type ListViewProps = {
  items: Item[];
  onDeleteItem: (id: number) => Promise<void>;
};

const Item: React.FC<ItemProps> = ({id, name, cost, onDeleteItem}) => (
  <TouchableOpacity onPress={() => onDeleteItem(id)}>
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
  </TouchableOpacity>
);

function ListView({items, onDeleteItem}: ListViewProps): React.JSX.Element {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <Box width={'100%'}>
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
      {items ? (
        <FlatList
          data={items}
          renderItem={({item}) => (
            <Item
              id={item.id}
              name={item.name}
              cost={item.cost}
              onDeleteItem={onDeleteItem}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text variant={'paragraph'}>Your Recent Expenses Here!</Text>
      )}
    </Box>
  );
}

export default ListView;
