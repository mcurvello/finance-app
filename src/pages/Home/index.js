import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";

import { Background, Balance, Container, List, Name, Title } from "./styles";
import HistoryList from "../../components/HistoryList";

export default function Home() {
  const [historico, setHistorico] = useState([
    { key: "1", tipo: "receita", valor: 1200 },
    { key: "2", tipo: "despesa", valor: 200 },
    { key: "3", tipo: "receita", valor: 40 },
    { key: "4", tipo: "receita", valor: 89.62 },
    { key: "5", tipo: "despesa", valor: 310 },
    { key: "6", tipo: "despesa", valor: 450 },
    { key: "7", tipo: "receita", valor: 22 },
  ]);
  const { user } = useContext(AuthContext);
  return (
    <Background>
      <Header />
      <Container>
        <Name>Marcio</Name>
        <Balance>R$ 123,00</Balance>
      </Container>
      <Title>Últimas movimentações</Title>
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <HistoryList data={item} />}
      />
    </Background>
  );
}
