import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme, {darkTheme} from './src/themes/default';
import Navigation from './src/navigation';
import connectToDatabase, {createTables, getTablesNames} from './src/db/db';
import {StatusBar} from 'react-native';
import {AppContext} from './src/context/appContext';

function App(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const appContext = useMemo(() => {
    return {
      isDarkMode,
      setIsDarkMode,
    };
  }, [isDarkMode]);

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
    <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
      <StatusBar barStyle={darkTheme ? 'dark-content' : 'light-content'} />
      <NavigationContainer>
        <AppContext.Provider value={appContext}>
          <Navigation />
        </AppContext.Provider>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
