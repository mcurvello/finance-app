import React, { useContext, useEffect, useState } from "react";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

import { Background, Balance, Container, List, Name, Title } from "./styles";
import HistoryList from "../../components/HistoryList";
import { format, isPast } from "date-fns";
import { Alert } from "react-native";

export default function Home() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(AuthContext);

  const uid = user && user.uid;

  useEffect(() => {
    async function loadList() {
      await firebase
        .database()
        .ref("users")
        .child(uid)
        .on("value", (snapshot) => {
          setBalance(snapshot.val().saldo);
        });
      await firebase
        .database()
        .ref("history")
        .child(uid)
        .orderByChild("date")
        .equalTo(format(new Date(), "dd/MM/yy"))
        .limitToLast(10)
        .on("value", (snapshot) => {
          setHistory([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };

            setHistory((oldArray) => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, []);

  function handleDelete(data) {
    if (isPast(new Date(data.date))) {
      alert("Você não pode excluir um registro antigo!");
      return;
    }

    Alert.alert(
      "Cuidado, atenção",
      `Você deseja excluir ${data.tipo} - Valor: R$ ${parseFloat(
        data.valor
      ).toFixed(2)}`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Deletar",
          onPress: () => handleDeleteSuccess(data),
        },
      ]
    );
  }

  async function handleDeleteSuccess(data) {
    await firebase
      .database()
      .ref("history")
      .child(uid)
      .child(data.key)
      .remove()
      .then(async () => {
        let actualBalance = balance;
        data.tipo === "despesa"
          ? (actualBalance += parseFloat(data.valor))
          : (actualBalance -= parseFloat(data.valor));

        await firebase
          .database()
          .ref("users")
          .child(uid)
          .child("saldo")
          .set(actualBalance);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Background>
      <Header />
      <Container>
        <Name>{user && user.nome}</Name>
        <Balance>
          R$ {balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
        </Balance>
      </Container>
      <Title>Últimas movimentações</Title>
      <List
        showsVerticalScrollIndicator={false}
        data={history}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <HistoryList data={item} deleteItem={handleDelete} />
        )}
      />
    </Background>
  );
}
