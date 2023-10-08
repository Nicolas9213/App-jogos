import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Home'
import HomeVelha from './src/HomeVelha';
import HomeForca from './src/HomeForca';
import JogoVelha from './src/JogoVelha';
import JogoForca from './src/JogoForca';
import JogoMemoria from './src/JogoMemoria';

export default function App() {
  const [nextScreen, setNextScreen] = useState("");
  const [palavraForca, setPalavraForca] = useState("");
  const [screen, setScreen] = useState("home");
  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  const checkScreen = (screenName) => screenName === screen;

  const setJogadores = (nome1, nome2) => {
    setJogador1(nome1);
    setJogador2(nome2);
  }

  const changeScreen = (newScreen) => setScreen(newScreen);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {checkScreen("home") && (
        <Home
          mudarNomeJogadores={setJogadores}
          changeScreen={changeScreen}
          nextScreen={setNextScreen}
        />
      )}
      {checkScreen("homeVelha") && (
        <HomeVelha
          changeScreen={changeScreen}
          mudarNomeJogadores={setJogadores}
          player1={jogador1}
          player2={jogador2}
          jogo ={nextScreen}
        />
      )}
      {checkScreen("jogoVelha") && (
        <JogoVelha
          changeScreen={changeScreen}
          player1={jogador1}
          player2={jogador2}
  
        />
      )}
      {checkScreen("homeForca") && (
        <HomeForca
          changeScreen={changeScreen}
          palavraForca={palavraForca}
          setPalavraForca={setPalavraForca}
          />
      )}
      {checkScreen("jogoForca") && (
        <JogoForca
         changeScreen={changeScreen}
         palavraForca={palavraForca}
         setPalavraForca={setPalavraForca}
         />
      )}
      {checkScreen("jogoMemoria") && (
        <JogoMemoria
         changeScreen={changeScreen}
         jogador1={jogador1}
         jogador2={jogador2}
         />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});