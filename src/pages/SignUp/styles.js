import styled from "styled-components/native";

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AreaInput = styled.View`
  flex-direction: row;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#fff",
})`
  background-color: rgba(0, 0, 0, 0.2);
  width: 90%;
  font-size: 17px;
  color: #fff;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 7px;
`;

export const SubmitButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #00b94a;
  width: 90%;
  height: 45px;
  border-radius: 7px;
  margin-top: 10px;
`;

export const SubmitText = styled.Text`
  font-size: 20px;
  color: #131313;
`;
