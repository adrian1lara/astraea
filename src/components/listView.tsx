import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Box from './box';
import Text from './text';
import {SwipeListView} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

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
};

type ListViewProps = {
  items: Item[];
  onDeleteItem: (id: number) => Promise<void>;
};

// Render HiddenItem component in swipeList
const RenderHiddenItem: React.FC<HiddenItemProps> = ({id, onDeleteItem}) => (
  <Box style={styles.hiddenItemContainer} p={'m'}>
    <TouchableOpacity
      style={[styles.backRightBtn, styles.dangerBtn]}
      onPress={() => onDeleteItem(id)}>
      <Text style={styles.hiddenItemText} variant={'body'}>
        <Icon name="trash-outline" size={20} />
      </Text>
    </TouchableOpacity>
  </Box>
);

//Render component Item In SwipeList
const Item: React.FC<ItemProps> = ({id, name, cost}) => (
  <Box key={id} style={styles.renderItemContainer}>
    <Box
      backgroundColor={'cardSecondaryBackground'}
      borderWidth={1}
      borderRadius={8}
      padding={'m'}
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-between'}>
      <Text
        variant={'body'}
        color={'mainForeground'}
        fontWeight={'700'}
        textTransform={'capitalize'}>
        {name}
      </Text>
      <Text variant={'body'} textAlign={'center'} fontWeight={'600'}>
        $ {cost}
      </Text>
    </Box>
  </Box>
);
export const backButtonWidth = 75;
export const openWidth = backButtonWidth;

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
      <Box flexDirection={'row'} marginBottom={'s'} borderRadius={5}>
        <Box width={'70%'}>
          <Text variant={'subheader'} m={'s'}>
            Item
          </Text>
        </Box>
        <Box width={'30%'}>
          <Text variant={'subheader'} m={'s'} textAlign={'right'}>
            Cost
          </Text>
        </Box>
      </Box>
      {items.length > 0 ? (
        <SwipeListView
          data={items}
          disableRightSwipe
          renderItem={({item}) => (
            <Item id={item.id} name={item.name} cost={item.cost} />
          )}
          renderHiddenItem={({item}) => (
            <RenderHiddenItem id={item.id} onDeleteItem={onDeleteItem} />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
          keyExtractor={item => item.id.toString()}
          rightOpenValue={-openWidth}
        />
      ) : (
        <Text variant={'body'}>Your Recent Expenses Here!</Text>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  renderItemContainer: {
    marginVertical: 5,
  },
  listCardTextOne: {
    color: '#000000',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  hiddenItemContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  hiddenItemButton: {
    marginRight: 10,
    backgroundColor: '#191919',
    borderRadius: 4,
    paddingHorizontal: 1,
    paddingVertical: 8,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    borderRadius: 4,
    padding: 25,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: backButtonWidth,
  },

  dangerBtn: {
    backgroundColor: 'red',
    right: 0,
  },

  hiddenItemText: {
    color: '#FFFFFF',
    height: 20,
  },
});

export default ListView;
