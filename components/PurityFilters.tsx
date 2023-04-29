import { useState, useEffect } from "react";
import MenuButton from "./MenuButton";
import MenuButtonsContainer from "./MenuButtonsContainer";
import { PurityColors } from "../types";
import useGetKey from "@/hooks/useGetKey";

type Purity = string[];

type Props = {
  dispatch: (action: any) => void;
  value: Purity;
};

const PurityFilters = ({ dispatch, value }: Props) => {
  const [show, setShow] = useState(false);
  let { savedKey: hasAccount } = useGetKey();
  useEffect(() => {
    if (!hasAccount) return;
    setShow(true);
  }, [hasAccount]);

  const purity = value;
  const setPurity = (value: Purity) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "SET_PURITY",
      payload: value,
    });
  };
  const handlePurity = (key: keyof Purity) => {
    const toRemove = purity.includes(key as string);
    if (toRemove) {
      const newPurity = purity.filter((item) => item !== key);
      setPurity(newPurity);
    } else {
      const newPurity = [...purity, key] as Purity;
      setPurity(newPurity);
    }
  };

  return (
    <MenuButtonsContainer title="Purity">
      <MenuButton
        isActive={purity.includes("sfw")}
        onClick={() => {
          handlePurity("sfw" as keyof Purity);
        }}
        activeColor={PurityColors.sfw}
      >
        SFW
      </MenuButton>
      <MenuButton
        isActive={purity.includes("sketchy")}
        activeColor={PurityColors.sketchy}
        onClick={() => {
          handlePurity("sketchy" as keyof Purity);
        }}
      >
        Sketchy
      </MenuButton>
      {show && (
        <MenuButton
          activeColor={PurityColors.nsfw}
          isActive={purity.includes("nsfw")}
          onClick={() => {
            handlePurity("nsfw" as keyof Purity);
          }}
        >
          NSFW
        </MenuButton>
      )}
    </MenuButtonsContainer>
  );
};

export default PurityFilters;
