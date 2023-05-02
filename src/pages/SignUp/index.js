import React, { useContext, useState } from "react";

import { AuthContext } from "../../contexts/auth";

import {
  AreaInput,
  Background,
  Container,
  Input,
  Logo,
  SubmitButton,
  SubmitText,
} from "./styles";
import { ActivityIndicator, Platform } from "react-native";

export default function SignUp() {
  const { signUp, loadingAuth } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    signUp(email, password, nome);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""}>
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color="#fff" />
          ) : (
            <SubmitText>Cadastrar</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
