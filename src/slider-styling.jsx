import { sliderAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);
const baseStyle = definePartsStyle({
  // define the part you're going to style
});
export const sliderTheme = defineMultiStyleConfig({ baseStyle });
