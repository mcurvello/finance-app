import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../contexts/auth";

import {
  Container,
  Logout,
  LogoutText,
  Name,
  NewLink,
  NewText,
} from "./styles";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Name>{user && user.nome}</Name>
      <NewLink onPress={() => navigation.navigate("Registrar")}>
        <NewText>Registrar gastos</NewText>
      </NewLink>
      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}
