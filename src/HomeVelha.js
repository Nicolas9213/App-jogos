import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button }
  from 'react-native';

  export default function HomeVelha({ changeScreen, mudarNomeJogadores, jogo }) {

  const [jogador1, setJogador1] = useState("");
  const [jogador2, setJogador2] = useState("");

  const handleClick = () => {

    if (mudarNomeJogadores) {
      mudarNomeJogadores(jogador1, jogador2)
      changeScreen(jogo)

    }

  }
  const goBack = () => {
    changeScreen("home");
}

  return (
    <View style={styles.container}>
      <Button color="green" title="Voltar" onPress={goBack} />
      <Text>Selecione os jogadores: </Text>
      <Text>O nome do jogador 1 é: {jogador1}</Text>
      <TextInput style={styles.input} placeholder='Jogador 1' value={jogador1} onChangeText={setJogador1} />
      
      <Text>O nome do jogador 2 é: {jogador2}</Text>
      <TextInput style={styles.input} placeholder='Jogador 2' value={jogador2} onChangeText={setJogador2} />
      
      <Button color="green" title='Iniciar' onPress={handleClick} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      gap: 20,
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  input: {
    height: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  }

});