import { forwardRef } from "react";
import { Heading, VStack } from "@chakra-ui/react";
type Props = {
  children: React.ReactNode;
  title: string;
};

type ForwardedRef = any;

const MenuButtonsContainer = forwardRef(
  ({ children, title }: Props, ref: ForwardedRef) => {
    return (
      <VStack w="full" alignItems="flex-start" p={4} ref={ref}>
        <Heading size="sm" color="teal.100" textTransform="uppercase">
          {title}
        </Heading>
        {children}
      </VStack>
    );
  }
);

MenuButtonsContainer.displayName = "MenuButtonsContainer";

export default MenuButtonsContainer;
