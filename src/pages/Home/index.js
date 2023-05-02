import React, { useContext, useEffect, useState } from "react";
import firebase from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

import { Background, Balance, Container, List, Name, Title } from "./styles";
import HistoryList from "../../components/HistoryList";
import { format } from "date-fns";

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
            };

            setHistory((oldArray) => [...oldArray, list].reverse());
          });
        });
    }
    loadList();
  }, []);

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
        renderItem={({ item }) => <HistoryList data={item} />}
      />
    </Background>
  );
}
