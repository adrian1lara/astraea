import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Box from './box';
import Text from './text';

type ItemProps = {name: String; cost: number};

type Items = {
  items: ItemProps[];
};

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

function ListView({items}: Items): React.JSX.Element {
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
