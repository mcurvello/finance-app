import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { Container, IconView, Type, TypeText, ValueText } from "./styles";

export default function HistoryList({ data }) {
  return (
    <Container>
      <Type>
        <IconView tipo={data.tipo}>
          <Feather
            name={data.tipo === "despesa" ? "arrow-down" : "arrow-up"}
            color="#fff"
            size={20}
          />
          <TypeText>{data.tipo}</TypeText>
        </IconView>
      </Type>
      <ValueText>R$ {data.valor}</ValueText>
    </Container>
  );
}
