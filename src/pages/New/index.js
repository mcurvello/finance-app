import React, { useContext, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { format } from "date-fns";

import firebase from "../../services/firebaseConnection";

import { Background, Input, SubmitButton, SubmitText } from "./styles";

import Header from "../../components/Header";
import Picker from "../../components/Picker";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";

export default function New() {
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState(null);

  const { user: usuario } = useContext(AuthContext);

  const navigation = useNavigation();

  function handleSubmit() {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valor)) || tipo === null) {
      alert("Preencha todos os campos!");
      return;
    }

    Alert.alert(
      "Confirmando dados",
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  async function handleAdd() {
    let uid = usuario.uid;

    let key = await firebase.database().ref("history").child(uid).push().key;
    await firebase
      .database()
      .ref("history")
      .child(uid)
      .child(key)
      .set({
        tipo: tipo,
        valor: parseFloat(valor),
        date: format(new Date(), "dd/MM/yy"),
      });

    let user = firebase.database().ref("users").child(uid);
    await user.once("value").then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);

      tipo === "despesa"
        ? (saldo -= parseFloat(valor))
        : (saldo += parseFloat(valor));

      user.child("saldo").set(saldo);
    });
    setValor("");
    Keyboard.dismiss();
    navigation.navigate("Home");
  }

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
        <SubmitButton onPress={() => handleSubmit()}>
          <SubmitText>Registrar</SubmitText>
        </SubmitButton>
      </Background>
    </TouchableWithoutFeedback>
  );
}
