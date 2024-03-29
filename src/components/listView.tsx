import React from 'react';
import {FlatList} from 'react-native';
import Box from './box';
import Text from './text';

const items = [
  {
    name: 'item1',
    price: '$10',
  },
  {
    name: 'item2',
    price: '$15',
  },
  {
    name: 'item3',
    price: '$20',
  },
  {
    name: 'item4',
    price: '$25',
  },
  {
    name: 'item5',
    price: '$30',
  },
  {
    name: 'item6',
    price: '$35',
  },
  {
    name: 'item7',
    price: '$40',
  },
  {
    name: 'item8',
    price: '$45',
  },
  {
    name: 'item9',
    price: '$50',
  },
  {
    name: 'item10',
    price: '$55',
  },
];

type ItemProps = {name: String; price: String};

const Item = ({name, price}: ItemProps) => (
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
        {price}
      </Text>
    </Box>
  </Box>
);

function ListView(): React.JSX.Element {
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
        <Box width={'30%'}>
          <Text variant={'subheader'} m={'s'} textAlign={'center'}>
            Cost
          </Text>
        </Box>
      </Box>
      <FlatList
        data={items}
        renderItem={({item}) => <Item name={item.name} price={item.price} />}
      />
    </Box>
  );
}

export default ListView;
