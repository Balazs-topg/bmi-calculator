import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import { ChakraProvider, useFormControlProps } from "@chakra-ui/react";
import { Flex, Slider, SliderTrack, SliderFilledTrack, SliderThumb, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { sliderTheme } from "./slider-styling";

export const theme = extendTheme({
  components: { Slider: sliderTheme },
});

function copyToClipboard(text) {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Make the textarea invisible
  textarea.style.position = "fixed";
  textarea.style.opacity = 0;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select and copy the text from the textarea
  textarea.select();
  document.execCommand("copy");

  // Remove the temporary textarea from the document
  document.body.removeChild(textarea);
}

function SliderInput({ value, setValue, minValue, maxValue }) {
  const handleChange = (value) => setValue(value);

  return (
    <div className="flex w-full gap-4">
      <NumberInput maxW="80px" value={value} onChange={handleChange}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider focusThumbOnChange={false} value={value} onChange={handleChange} min={minValue} max={maxValue}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize="sm" />
      </Slider>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { weightParam } = useParams();
  const { heightParam } = useParams();

  const [weight, setWeight] = useState(weightParam);
  const [height, setHeight] = useState(heightParam);

  const [clipBoardButtonLabel, setClipBoardButtonLabel] = useState("Copy Result");
  const [clipBoardButtonLabelColor, setClipBoardButtonLabelColor] = useState("");
  const [clipBoardButtonLabelIsOpen, setClipBoardButtonLabelIsOpen] = useState("");

  const [copyLinkLabel, setCopyLinkLabel] = useState("Copy Link");
  const [copyLinkLabelColor, setCopyLinkLabelColor] = useState("");
  const [copyLinkLabelIsOpen, setCopyLinkLabelIsOpen] = useState("");

  function calculateBMI(weight, height) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(2);
  }

  function handleUrl(weight, height) {
    if (location.pathname !== "/" + weight + "/" + height) {
      navigate("/" + weight + "/" + height);
    }
  }
  function copyUrl() {
    handleUrl(weight, height);
    const currentUrl = window.location.href;
    copyToClipboard(currentUrl);
  }

  return (
    <ChakraProvider theme={theme}>
      <div className="p-8 px-4 h-screen bg-gradient-to-tr from-stone-200 to-rose-100">
        <div className="p-4 max-w-2xl mx-auto rounded-xl bg-stone-50 shadow-xl border border-stone-200 bg-opacity-95 flex flex-col gap-2 mb-4">
          <div className="font-semibold text-2xl text-center flex items-center justify-center gap-4">
            <div>BMI: {calculateBMI(weight, height)}</div>
            <div className="flex gap-4">
              <div
                className="active:scale-95 transition-all bg-white rounded-lg p-2 shadow-md"
                onClick={() => {
                  setClipBoardButtonLabel("Copied Result!");
                  setClipBoardButtonLabelColor("green.400");
                  copyToClipboard(calculateBMI(weight, height));
                  setClipBoardButtonLabelIsOpen("true");

                  setTimeout(() => {
                    setClipBoardButtonLabelIsOpen("");
                    setClipBoardButtonLabel("Copy Result");
                    setClipBoardButtonLabelColor("");
                  }, 1000);
                }}
              >
                <Tooltip isOpen={clipBoardButtonLabelIsOpen} hasArrow label={clipBoardButtonLabel} bg={clipBoardButtonLabelColor} closeOnClick={false} onClick={() => {}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
                </Tooltip>
              </div>
              <div
                className="active:scale-95 transition-all bg-white rounded-lg p-2 shadow-md"
                onClick={() => {
                  setCopyLinkLabel("Copied Link!");
                  setCopyLinkLabelColor("green.400");
                  copyUrl();
                  setCopyLinkLabelIsOpen("true");
                  setTimeout(() => {
                    setCopyLinkLabel("Copy Link");
                    setCopyLinkLabelColor("");
                    setCopyLinkLabelIsOpen("");
                  }, 1000);
                }}
              >
                <Tooltip isOpen={copyLinkLabelIsOpen} hasArrow label={copyLinkLabel} closeOnClick={false} bg={copyLinkLabelColor}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 max-w-2xl mx-auto rounded-xl bg-stone-50 shadow-xl border border-stone-200 bg-opacity-95 flex flex-col gap-2">
          <div className="flex rounded-lg transition-all items-center justify-center gap-5 p-2 border border-stone-200">
            <Tooltip hasArrow label="kilograms (kg), centimeters (cm)">
              <div className="px-4 p-1 bg-white rounded-full shadow">
                <div className="select-none">Metric</div>
              </div>
            </Tooltip>
            <Tooltip hasArrow label="feet, inches">
              <div className="px-4 p-1 rounded-full ">
                <div className="select-none">Imperial</div>
              </div>
            </Tooltip>
          </div>
          <div className="active:bg-white p-2 active:shadow-lg rounded-lg transition-all border border-stone-200">
            <div>
              <h1 className="p-2 flex justify-between">
                <div>
                  Weight<span className="select-none"> *</span>
                </div>
                Kilograms
              </h1>
            </div>
            <div className="flex gap-4">
              <SliderInput value={weight} setValue={setWeight} minValue={30} maxValue={160} />
            </div>
          </div>
          <div className="active:bg-white p-2 active:shadow-lg rounded-lg transition-all border border-stone-200">
            <h1 className="p-2 flex justify-between">
              <div>
                Height<span className="select-none"> *</span>
              </div>
              Centimeters
            </h1>
            <div className="flex gap-4">
              <SliderInput value={height} setValue={setHeight} minValue={120} maxValue={220} />
            </div>
          </div>
        </div>
        {
          //        <Link to={"/" + weight + "/" + height}>
          //         <div className="p-4 max-w-2xl mx-auto bg-blue-600 mt-4 rounded-xl shadow-xl border border-stone-200 text-white text-center font-bold uppercase bg-opacity-95 active:translate-y-1 active:opacity-80 transition-all select-none">calculate</div>
          //       </Link>
        }
      </div>
    </ChakraProvider>
  );
}

export default App;
