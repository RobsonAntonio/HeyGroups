import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
flex:1;
justifyContent: center;
alignItems: center;
`;

export const ContainerInput = styled.View`
    flexDirection: row;
    margin: 10px;
    alignItems: flex-end;
`;

export const MainContainerInput = styled.View`
    flexDirection: row;
    alignItems: center;
    backgroundColor: #FFF;
    flex: 1;
    borderRadius:25px;
    marginRight: 10px;

`;
export const TextInput = styled.TextInput`
    flex: 1;
    marginHorizontal:10px;
    maxHeight: 130px;
    minHeight: 48px
`;

export const ButtonInput = styled.TouchableOpacity`
    backgroundColor: #51C880;
    height: 48px;
    width:48px;
    alignItems: center;
    justifyContent: center;
    borderRadius: 24px;
`;

