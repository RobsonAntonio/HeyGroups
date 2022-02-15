import React, { useState } from 'react';
import { Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Container, TextLogo, Input, ButtonLogin, ButtonTextLogin, TextButtonConta, ButtonConta } from './styles';

function SignIn() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState(false); // false > Tela Login  | true > Cadastro


  function handleLogin() {
    if (type) {
      if (name === '' || email === '' || password === '')
        return;

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name
          })
            .then(() => {
              navigation.goBack();
            })
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            alert('Email já em uso!');
          }
          if (error.code === 'auth/invalid-email') {
            alert('Email inválido!');
          }

        })

    } else {
      //Logar um usuario

      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack();
        })
        .catch((error) => {
          if (error.code === 'auth/invalid-email') {
            alert('Email inválido!');
          }
        })
    }
  }

  return (
    <Container>
      <TextLogo>HeyGroups</TextLogo>
      <Text style={{ marginBottom: 20 }}>Ajude, colabore, faça networking!</Text>

      {type && (
        <Input
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Qual seu Nome?"
          placeholderTextColor="#99999B"
        />
      )

      }
      <Input
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Seu email"
        placeholderTextColor="#99999B"
      />
      <Input
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Sua senha"
        placeholderTextColor="#99999B"
        secureTextEntry={true}
      />

      <ButtonLogin
        style={{ backgroundColor: type ? "#F53745" : "#57DD86" }}
        onPress={handleLogin}

      >
        <ButtonTextLogin>
          {type ? "Cadastrar" : "Acessar"}
        </ButtonTextLogin>
      </ButtonLogin>

      <ButtonConta onPress={() => setType(!type)}>
        <TextButtonConta>
          {type ? "Já possuo uma conta" : "Criar uma nova conta"}
        </TextButtonConta>
      </ButtonConta>
    </Container>
  );
}

export default SignIn;