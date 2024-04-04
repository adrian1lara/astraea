import React, {useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';
import {addItem} from '../db/items';
import connectToDatabase from '../db/db';
import DatePicker from 'react-native-date-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateExpenseScreen'>;

function FormScreen({navigation}: Props): React.JSX.Element {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
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
      navigation.navigate('HomeScreen', {itemAdded: true});
    } catch (error) {
      console.error('Failed to add Item: ', error);
    }
  };

  return (
    <Box padding={'m'} backgroundColor={'mainBackground'}>
      <Text variant={'header'}>Home</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="name"
        maxLength={20}
      />
      <TextInput
        style={styles.input}
        value={cost}
        onChangeText={setCost}
        keyboardType="numeric"
        placeholder="cost"
      />
      <TextInput
        style={styles.input}
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
    padding: 2,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    fontSize: 20,
  },
});

export default FormScreen;
