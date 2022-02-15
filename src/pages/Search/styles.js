import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
flex:1;
backgroundColor:#FFF;
`;

export const ContainerInput = styled.View`
flexDirection: row ;
justifyContent: center;
width: 100%;
marginVertical: 14px;

`;
export const Input = styled.TextInput`
backgroundColor: #EDEDED;
marginLeft: 10px;
height:50px;
width: 80%;
borderRadius:4px;
padding:5px
`;

export const ButtonSearch = styled.TouchableOpacity`
backgroundColor: #2E54D4;
borderRadius:4px;
alignItems: center;
justifyContent: center;
width: 15%;
marginLeft:5px;
marginRight: 10px;

`;