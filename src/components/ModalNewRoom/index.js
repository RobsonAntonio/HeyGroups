import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import { ModalContent, Container, Modal, ModalContentTitle, ButtonBackText, ButtonBack, Input, ButtonCreate, ButtonCreateText } from './styles';

function ModalNewRoom({ setVisible, setUpdateScreen }) {
    const [roomName, setRoomName] = useState('');

    //pegar usuario logado
    const user = auth().currentUser.toJSON();

    function handleButtonCreate() {
        if (roomName === '') return;

        //DEIXAR APENAS CADA USUARIO CRIAR 4 GRUPOS!
        firestore().collection('MESSAGE_THREADS')
            .get()
            .then((snapshot) => {
                let myThreads = 0;

                snapshot.docs.map(docItem => {
                    if (docItem.data().owner === user.uid) {
                        myThreads += 1;
                    }
                })
                if (myThreads >= 4) {
                    alert('Você já atingiu o limite de grupos por usuarios.')
                } else {
                    createRoom();

                }
            })

    }

    //Criar nova sala no firestore 
    function createRoom() {
        firestore().collection('MESSAGE_THREADS').add({
            name: roomName,
            owner: user.uid,
            lastMessage: {
                text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                createdAt: firestore.FieldValue.serverTimestamp(),
            }
        })
            .then((docRef) => {
                docRef.collection('MESSAGES').add({
                    text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    system: true,
                })
                    .then(() => {

                        setVisible();
                        setUpdateScreen();

                    })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={setVisible}>
                <Modal></Modal>
            </TouchableWithoutFeedback>


            <ModalContent>
                <ModalContentTitle>Criar um novo Grupo?</ModalContentTitle>
                <Input
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Nome para sua sala?"

                />
                <ButtonCreate>
                    <ButtonCreateText onPress={handleButtonCreate}>Criar Sala</ButtonCreateText>
                </ButtonCreate>

                <ButtonBack>
                    <ButtonBackText>Voltar</ButtonBackText>
                </ButtonBack>
            </ModalContent>

        </Container>

    );
}

export default ModalNewRoom;
