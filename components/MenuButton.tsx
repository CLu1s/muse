import { Button } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  isActive: boolean;
  activeColor?: string;
  align?: string;
};

const MenuButton = ({
  onClick,
  children,
  isActive,
  activeColor,
  align,
}: Props) => {
  return (
    <Button
      w="full"
      onClick={onClick}
      size="sm"
      variant="ghost"
      isActive={isActive}
      color={isActive ? "#E7E6F0" : "#C3BFD9"}
      _hover={{
        color: "#E7E6F0",
        backgroundColor: activeColor ?? "#3F3C53",
      }}
      _active={{
        color: "#E7E6F0",
        backgroundColor: activeColor ?? "#3F3C53",
      }}
      minW="100px"
      justifyContent={align ?? "flex-start"}
    >
      {children}
    </Button>
  );
};

export default MenuButton;
