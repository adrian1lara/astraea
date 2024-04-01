import randomColor from 'randomcolor';

export const generateSliceColors = (numSlices: number) => {
  const colors = [];
  for (let index = 0; index < numSlices; index++) {
    colors.push(
      randomColor({
        hue: 'green',
        alpha: 0.5,
        luminosity: 'dark',
      }),
    );
  }
  return colors;
};
