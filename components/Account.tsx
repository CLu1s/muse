import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Text,
  VStack,
  chakra,
  Link,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Avatar,
} from "@chakra-ui/react";
import { invoke } from "@tauri-apps/api/tauri";
import useGetKey from "../hooks/useGetKey";

interface Props {
  dispatch: React.Dispatch<any>;
}

function Account({ dispatch }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [apiKey, setApiKey] = useState("");
  const [userNameState, setUserName] = useState("");
  const isClient = typeof window !== "undefined";
  const { savedKey, userName } = useGetKey();
  if (savedKey && !apiKey) {
    setApiKey(savedKey);
    setUserName(userName!);
  }

  const onKeyChange = () => {
    dispatch({
      type: "SET_API_KEY",
      payload: apiKey,
    });
    dispatch({
      type: "SET_USER_NAME",
      payload: userNameState,
    });
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("userName", userNameState);
    onClose();
  };
  const isError = userNameState === "";
  return (
    <>
      <Button mt={4} onClick={onOpen} width="full" colorScheme="ghost">
        <Avatar bg="teal.500" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <Text>
                Your API key can be used to grant other apps access to some of
                your account settings.{" "}
                <chakra.span>
                  <Link
                    href="#"
                    color="blue.500"
                    onClick={(e) => {
                      e.preventDefault();
                      isClient &&
                        invoke("open_url", {
                          url: "https://wallhaven.cc/settings/account",
                        }).catch(console.error);
                    }}
                  >
                    Get your API key
                  </Link>
                </chakra.span>
              </Text>
              <FormControl isInvalid={isError}>
                <FormLabel>User name</FormLabel>
                <Input
                  placeholder="User name"
                  value={userNameState}
                  onChange={(e: { target: { value: any } }) =>
                    setUserName(e.target.value)
                  }
                />
                {!isError ? (
                  <FormHelperText>required</FormHelperText>
                ) : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>

              <Input
                placeholder="API-key"
                value={apiKey}
                onChange={(e: { target: { value: any } }) =>
                  setApiKey(e.target.value)
                }
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onKeyChange}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Not know
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Account;
