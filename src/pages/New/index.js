import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

import { Background, Input, SubmitButton, SubmitText } from "./styles";

import Header from "../../components/Header";
import Picker from "../../components/Picker";

export default function New() {
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState(null);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header />
        <Input
          placeholder="Valor desejado"
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => Keyboard.dismiss()}
          value={valor}
          onChangeText={(text) => setValor(text)}
        />
        <Picker onChange={setTipo} tipo={tipo} />
        <SubmitButton>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>
      </Background>
    </TouchableWithoutFeedback>
  );
}
