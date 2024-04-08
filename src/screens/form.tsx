import React, {useContext, useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';
import {addItem} from '../db/items';
import connectToDatabase from '../db/db';
import DatePicker from 'react-native-date-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {AppContext} from '../context/appContext';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateExpenseScreen'>;

function FormScreen({navigation}: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {isDarkMode} = useContext(AppContext);

  const handleAdd = async () => {
    if (name.trim() === '') {
      return;
    }

    const db = await connectToDatabase();
    const floatCost = parseFloat(cost);

    try {
      const newItem = {
        name: name,
        date_added: date,
        category: 'all',
        cost: floatCost,
      };

      await addItem(db, newItem);
      setName('');
      setCost('');
      setDate(new Date());
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Failed to add Item: ', error);
    }
  };

  return (
    <Box padding={'m'} backgroundColor={'mainBackground'}>
      <Text variant={'header'}>New Expense</Text>
      <TextInput
        style={isDarkMode ? styles.inputDark : styles.input}
        value={name}
        onChangeText={setName}
        placeholderTextColor={'#AAAAAA'}
        placeholder="name"
        maxLength={20}
      />
      <TextInput
        style={isDarkMode ? styles.inputDark : styles.input}
        value={cost}
        onChangeText={setCost}
        placeholderTextColor={'#AAAAAA'}
        keyboardType="numeric"
        placeholder="cost"
      />
      <TextInput
        style={isDarkMode ? styles.inputDark : styles.input}
        value={date.toLocaleDateString()}
        onPressIn={() => setOpen(true)}
      />
      <DatePicker
        modal
        date={date}
        open={open}
        mode="date"
        onConfirm={selected => {
          setOpen(false);
          setDate(selected);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Button title="add" onPress={handleAdd} />
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: '#000',
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 5,
    borderRadius: 5,
    fontSize: 24,
  },

  inputDark: {
    color: '#ffff',
    borderWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
    fontSize: 24,
  },
});

export default FormScreen;
