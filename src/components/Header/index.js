import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";

import { ButtonMenu, Container } from "./styles";

export default function Header() {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Feather name="menu" color="#fff" size={30} />
      </ButtonMenu>
    </Container>
  );
}
