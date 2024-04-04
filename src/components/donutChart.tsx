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
  const costData = validItems.map(item => item.cost); // mapping all valid items
  const sliceColor = generateSliceColors(costData.length); // generate colors by the lengh of de data
  //const colorMapping = costData.map((_, index) => sliceColor[index]); // Map cost to color
  const totalCost = costData.reduce((a, b) => a + b, 0); // sum all cost form the data

  return (
    <Box p={'s'}>
      {validItems.length > 0 ? ( // Check for valid items before rendering
        <>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={costData}
            sliceColor={sliceColor}
            coverRadius={0.45}
          />
          <Text
            variant={'body'}
            textAlign={'center'}
            fontSize={20}
            fontWeight={'700'}>
            {`${totalCost ? totalCost : 0} $`}
          </Text>
        </>
      ) : (
        <Text variant={'body'} textAlign={'center'}>
          No data available
        </Text>
      )}
    </Box>
  );
}

export default DonutChart;
