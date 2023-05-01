import styled from "styled-components/native";

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #131313;
`;

export const Balance = styled.Text`
  margin-top: 5px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;
`;

export const Container = styled.View`
  margin-left: 15px;
  margin-bottom: 25px;
`;

export const Name = styled.Text`
  font-size: 19px;
  color: #fff;
  font-style: italic;
`;

export const Title = styled.Text`
  margin-left: 15px;
  color: #00b94a;
  margin-bottom: 10px;
`;

export const List = styled.FlatList.attrs({
  paddingHorizontal: 15,
})`
  padding-top: 15px;
  background-color: #fff;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  margin-left: 8px;
  margin-right: 8px;
`;
