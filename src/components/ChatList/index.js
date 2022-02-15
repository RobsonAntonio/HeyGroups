import React from 'react';
import { } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Row, Content, Header, NameText, ContentText, ButtonGroup } from './styles';


function ChatList({ data, deleteRoom, userStatus }) {
    const navigation = useNavigation();

    function openChat() {
        if (userStatus) {
            navigation.navigate("Messages", { thread: data })
        } else {
            navigation.navigate("SignIn")
        }
    }

    return (

        <ButtonGroup onPress={openChat} onLongPress={() => deleteRoom && deleteRoom()}>
            <Row>
                <Content>
                    <Header>
                        <NameText numberOfLines={1}>{data.name}</NameText>
                    </Header>
                    <ContentText numberOfLines={1}>{data.lastMessage.text}</ContentText>
                </Content>
            </Row>
        </ButtonGroup>
    );
}
export default ChatList;