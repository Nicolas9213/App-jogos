import {StyleSheet, View, Button, Text} from 'react-native';

export default function Home({changeScreen, nextScreen}) {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bem vindo!</Text>
            <Text>Escolha o jogo que deseja jogar:</Text>
            <Button color="green" title="Jogo da Velha 👵" onPress={() => {nextScreen("jogoVelha"); changeScreen("homeVelha")}}/>
            <Button color="green" title="Jogo da Forca 💀" onPress={() => {nextScreen("jogoForca"); changeScreen("homeForca")}}/>
            <Button color="green" title="Jogo da Memória 🧠" onPress={() => {nextScreen("jogoMemoria"); changeScreen("homeVelha")}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        width: '100',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 50,
    }
})