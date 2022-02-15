import styled from "styled-components/native";

export const Container = styled.View`
flex:1;
backgroundColor: rgba(34,34,34, 0.4);
`;

export const Modal = styled.View`
flex:1;
`;

export const ModalContent = styled.View`
flex: 1;
backgroundColor:#FFF;
padding:15px
`;

export const ModalContentTitle = styled.Text`
marginTop:14px; 
textAlign: center;
 fontWeight: bold;
 fontSize:19px;
 `;
export const Input = styled.TextInput`
   borderRadius:4px;
   height:45px;
   backgroundColor: #DDD;
   marginVertical:15px;
   fontSize: 16px;
   paddingHorizontal:5px
 `;
export const ButtonCreate = styled.TouchableOpacity`
    borderRadius:4px;
    backgroundColor: #2E54D4;
    height: 45px;
    alignItems: center;
    justifyContent: center;
`;
export const ButtonCreateText = styled.Text`
    fontSize:19px;
    fontWeight: bold;
    color: #FFF;
 `;

export const ButtonBack = styled.TouchableOpacity`
 marginTop:10px
 alignItems: center;
 justifyContent: center;
`;
export const ButtonBackText = styled.Text`

    fontWeight: bold;
 `;
