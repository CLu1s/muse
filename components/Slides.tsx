import { useState } from "react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  Text,
} from "@chakra-ui/react";
import MenuButton from "./MenuButton";
import MenuButtonsContainer from "./MenuButtonsContainer";
import { State } from "../types";

type Props = {
  currentIndex: number;
  metadata: State["metadata"];
  dispatch: (action: any) => void;
  isActivated: boolean;
  intervalID: number;
};

const Slides = ({
  dispatch,
  currentIndex,
  metadata,
  isActivated,
  intervalID,
}: Props) => {
  let index = currentIndex;
  const [time, setTime] = useState(300000);
  const startSlides = () => {
    if (isActivated) {
      clearInterval(intervalID);
      dispatch({
        type: "SET_SLIDE_ACTIVE",
        payload: {
          isActivated: false,
          intervalID: null,
        },
      });
      dispatch({
        type: "SET_CURRENT_INDEX",
        payload: 0,
      });
      return;
    }
    const interval = setInterval(() => {
      if (index === metadata.total - 1) {
        dispatch({
          type: "SET_CURRENT_INDEX",
          payload: 0,
        });
        return;
      }
      dispatch({
        type: "ADVANCE_CURRENT_INDEX",
      });
    }, time);
    dispatch({
      type: "SET_SLIDE_ACTIVE",
      payload: {
        isActivated: true,
        intervalID: interval,
      },
    });
    return () => clearInterval(interval);
  };
  const hanldeActivation = () => {
    startSlides();
  };
  const message = isActivated ? "Stop" : "Start";
  return (
    <MenuButtonsContainer title="Slide Mode">
      <VStack justify="flex-start" alignItems="flex-start">
        <Text color="white" fontSize="xs">
          Time in Minutes:
        </Text>
        <NumberInput
          size={"sm"}
          onChange={(value) => setTime(Number(value) * 1000 * 60)}
          value={time / (1000 * 60)}
          isDisabled={isActivated}
        >
          <NumberInputField
            backgroundColor={isActivated ? "gray.200" : "white"}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </VStack>
      <MenuButton isActive={isActivated} onClick={hanldeActivation}>
        {message}
      </MenuButton>
    </MenuButtonsContainer>
  );
};

export default Slides;
