import {Switch} from 'react-native';
import Box from './box';
import {storage} from '../utils/mmkvStorage';

type SwitcherProps = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

const Switcher: React.FC<SwitcherProps> = ({isDarkMode, setIsDarkMode}) => {
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    storage.set('isDarkMode', !isDarkMode);
  };

  return (
    <Box>
      <Switch value={isDarkMode} onChange={toggleDarkMode} />
    </Box>
  );
};

export default Switcher;
