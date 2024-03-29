import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import { RootStackParamList } from '../navigation/types';


type Props = NativeStackScreenProps<RootStackParamList>;
function HomeScreen({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="+" onPress={() => navigation.navigate('CreateExpenseScreen')} />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default HomeScreen;
