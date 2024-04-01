import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/themes/default';
import Navigation from './src/navigation';
import connectToDatabase, {createTables, getTablesNames} from './src/db/db';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  const loadData = useCallback(async () => {
    try {
      const db = await connectToDatabase();
      await createTables(db);
      const name = await getTablesNames(db);
      console.log(name);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
