import React from 'react';
import Box from './box';
import Text from './text';
import PieChart from 'react-native-pie-chart';
import {generateSliceColors} from '../utils/randomColor';

type ItemProps = {
  name: string;
  date_added: Date;
  category: string;
  cost: number;
};

type Items = {
  items: ItemProps[];
};

function DonutChart({items}: Items): React.JSX.Element {
  const widthAndHeight = 150;

  const validItems = items.filter(item => item.cost !== 0); // Filter out items with zero cost
  const costData = validItems.map(item => item.cost);
  const sliceColor = generateSliceColors(costData.length);
  //const colorMapping = costData.map((_, index) => sliceColor[index]); // Map cost to color
  return (
    <Box p={'s'}>
      <Text variant={'subheader'} textAlign={'center'}>
        Basic Chart
      </Text>
      {validItems.length > 0 ? ( // Check for valid items before rendering
        <>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={costData}
            sliceColor={sliceColor}
            coverRadius={0.45}
          />
        </>
      ) : (
        <Text variant={'paragraph'} textAlign={'center'}>
          No data available
        </Text>
      )}
    </Box>
  );
}

export default DonutChart;
