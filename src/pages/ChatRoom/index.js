import React, { useState, useEffect } from 'react';
import { Modal, ActivityIndicator, FlatList, Alert } from 'react-native';
import FabButton from '../../components/FabButton';
import ModalNewRoom from '../../components/ModalNewRoom';
import ChatList from '../../components/ChatList';
import { ButtonVoltar, Container, HeaderRoom, HeaderRoomLeft, TextHeader, ButtonSearch } from './styles';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ChatRoom() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateScreen, setUpdateScreen] = useState(false);

  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    //console.log(hasUser);

    setUser(hasUser);

  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore().collection('MESSAGE_THREADS').orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then((snapshot) => {
          const threads = snapshot.docs.map(documentSnapshot => {
            return {
              _id: documentSnapshot.id,
              name: '',
              lastMessage: { text: '' },
              ...documentSnapshot.data()
            }
          })
          if (isActive) {
            setThreads(threads);
            setLoading(false);
            //console.log(threads)
          }
        })
    }
    getChats();

    return () => {
      isActive = false;
    }

  }, [isFocused, updateScreen]);

  function handlerSignOut() {
    auth().signOut().then(() => {
      setUser(null);
      navigation.navigate("SignIn")
    })
      .catch(() => {
        console.log("Nao possui nenhum usuario")
      })
  }


  function deleteRoom(ownerId, idRoom) {
    if (ownerId !== user?.uid) return;

    Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja deletar essa sala?",
      [
        {
          text: "Cancel",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "Ok",
          onPress: () => handleDeleteRoom(idRoom)
        }
      ]
    )

  }

  async function handleDeleteRoom(idRoom) {
    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(idRoom)
      .delete();


    setUpdateScreen(!updateScreen);

  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#555" />
    )
  }
  return (
    <Container>
      <HeaderRoom>
        <HeaderRoomLeft>

          {user && (
            <ButtonVoltar onPress={handlerSignOut}>
              <MaterialIcons name="arrow-back" size={28} color="#FFF" />
            </ButtonVoltar>
          )}

          <TextHeader> Groups </TextHeader>

        </HeaderRoomLeft>
        <ButtonSearch onPress={() => navigation.navigate("Search")}>
          <MaterialIcons name="search" size={28} color="#FFF" />
        </ButtonSearch>
      </HeaderRoom>

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList data={item} deleteRoom={() => deleteRoom(item.owner, item._id)} userStatus={user} />
        )}
      />

      <FabButton setVisible={() => setModalVisible(true)} userStatus={user} />
      <Modal visible={modalVisible} animationType="fade" transparent={true} >
        <ModalNewRoom
          setVisible={() => setModalVisible(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>

    </Container>
  );
}
