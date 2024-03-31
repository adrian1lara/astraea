import React from 'react';
import Box from './box';
import Text from './text';
import PieChart from 'react-native-pie-chart';

function DonutChart(): React.JSX.Element {
  const widthAndHeight = 150;
  const series = [100, 120, 3, 400, 9];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];

  return (
    <Box padding={'s'}>
      <Text variant={'subheader'} textAlign={'center'}>
        Basic Chart
      </Text>
      <PieChart
        widthAndHeight={widthAndHeight}
        series={series}
        sliceColor={sliceColor}
        coverRadius={0.45}
      />
    </Box>
  );
}

export default DonutChart;
