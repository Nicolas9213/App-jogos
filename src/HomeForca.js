import { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native-web";

export default function HomeForca({
    changeScreen, palavraForca, setPalavraForca }) {


        const handleClick = () => {
            if(changeScreen && setPalavraForca) {
                changeScreen("jogoForca")
            }
        }

        const goBack = () => {
            changeScreen("home");
        }
        return (
            <View style={styles.container}>
                <Button color="green" title='Voltar' onPress={goBack}/>

                <Text>A palavra para o jogo será: {palavraForca} </Text>
                <TextInput placeholder='Palavra' value={palavraForca} onChangeText={setPalavraForca} style={styles.input}/>


                <Button color="green" title='Iniciar' onPress={handleClick}/>
            </View>
        )
    }

    const styles = StyleSheet.create( {
        container: {
            flex: 1,
            gap: 20,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
        },
        input: {
            width: '80%',
            height: 40,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 5,
            padding: 5,
            color: 'black',
        },
    });