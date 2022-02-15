import React, { useMemo } from 'react';
import { } from 'react-native';
import auth from '@react-native-firebase/auth';

import { Container, TextoName, MessageBox, TextoMessage } from './styles';

function ChatMessage({ data }) {
  const user = auth().currentUser.toJSON();
  const isMyMessage = useMemo(() => {
    return data?.user?._id === user.uid
  }, [data])


  return (
    <Container>
      <MessageBox style={
        {
          backgroundColor: isMyMessage ? '#DCF8C5' : '#FFF',
          marginLeft: isMyMessage ? 50 : 0,
          marginRight: isMyMessage ? 0 : 50,
        }}>

        {!isMyMessage && <TextoName>{data?.user?.displayName}</TextoName>}

        <TextoMessage>{data.text}</TextoMessage>
      </MessageBox>
    </Container>
  );
}

export default ChatMessage;