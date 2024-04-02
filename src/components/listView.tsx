import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Box from './box';
import Text from './text';
import {SwipeListView} from 'react-native-swipe-list-view';

type ItemProps = {
  id: number;
  name: String;
  cost: number;
};

type Item = {
  id: number;
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};

type HiddenItemProps = {
  id: number;
  onDeleteItem: (id: number) => void;
  onCloseItem: () => void;
};

type ListViewProps = {
  items: Item[];
  onDeleteItem: (id: number) => Promise<void>;
};

const RenderHiddenItem: React.FC<HiddenItemProps> = ({
  id,
  onCloseItem,
  onDeleteItem,
}) => (
  <Box style={styles.hiddenItemContainer}>
    <TouchableOpacity
      style={styles.hiddenItemButton}
      onPress={() => onCloseItem()}>
      <Text style={styles.hiddenItemText} variant={'paragraph'}>
        Close
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.hiddenItemButton]}
      onPress={() => onDeleteItem(id)}>
      <Text style={styles.hiddenItemText} variant={'paragraph'}>
        Delete
      </Text>
    </TouchableOpacity>
  </Box>
);

const Item: React.FC<ItemProps> = ({id, name, cost}) => (
  <Box key={id} style={styles.renderItemContainer}>
    <Box width={'80%'} style={styles.listCard}>
      <Text variant={'paragraph'} style={styles.listCardTextOne}>
        {name}
      </Text>
      <Text variant={'paragraph'} textAlign={'center'}>
        {cost}
      </Text>
    </Box>
  </Box>
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
        <SwipeListView
          data={items}
          renderItem={({item}) => (
            <Item id={item.id} name={item.name} cost={item.cost} />
          )}
          renderHiddenItem={({item}) => (
            <RenderHiddenItem
              id={item.id}
              onDeleteItem={onDeleteItem}
              onCloseItem={onRefresh}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item.id.toString()}
          rightOpenValue={-230}
        />
      ) : (
        <Text variant={'paragraph'}>Your Recent Expenses Here!</Text>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  renderItemContainer: {
    marginVertical: 10,
  },
  listCard: {
    backgroundColor: '#F8F7F1',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listCardTextOne: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  hiddenItemContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  hiddenItemButton: {
    marginRight: 10,
    backgroundColor: '#191919',
    borderRadius: 4,
    padding: 10,
  },
  hiddenItemText: {
    color: '#FFFFFF',
    height: 20,
  },
});

export default ListView;
