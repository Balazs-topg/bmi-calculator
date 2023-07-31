import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { Slider, SliderTrack, SliderFilledTrack, SliderThumb, SliderMark } from "@chakra-ui/react";

import { Flex, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";

import { extendTheme } from "@chakra-ui/react";
import { sliderTheme } from "./slider-styling";
export const theme = extendTheme({
  components: { Slider: sliderTheme },
});

function SliderInput() {
  const [value, setValue] = React.useState(0);
  const handleChange = (value) => setValue(value);

  return (
    <Flex>
      <NumberInput maxW="100px" mr="2rem" value={value} onChange={handleChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider flex="1" focusThumbOnChange={false} value={value} onChange={handleChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" boxSize="32px" children={value} />
      </Slider>
    </Flex>
  );
}
function App() {
  return (
    <ChakraProvider theme={theme}>
      <div className="p-8 h-screen bg-gradient-to-tr from-stone-200 to-red-100 shadow-xl">
        <div className="p-4 max-w-2xl mx-auto rounded-xl bg-stone-50 border border-stone-200 bg-opacity-95 flex flex-col gap-2 mb-4">
          <h1 className="font-semibold text-2xl text-center">BMI: 21</h1>
        </div>
        <div className="p-2 max-w-2xl mx-auto rounded-xl bg-stone-50 border border-stone-200 bg-opacity-95 flex flex-col gap-2">
          <div className="active:bg-white p-2 active:shadow-lg rounded-lg transition-all border border-stone-200">
            <div>
              <h1 className="p-2">
                Weight<span className="select-none"> *</span>
              </h1>
            </div>
            <SliderInput></SliderInput>
          </div>
          <div className="active:bg-white p-2 active:shadow-lg rounded-lg transition-all border border-stone-200">
            <h1 className="p-2">
              Height<span className="select-none"> *</span>
            </h1>
            <SliderInput></SliderInput>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
}

export default App;
