import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image }
  from 'react-native';

  const imgsForca = [
  require("./assets/Forca.png"), 
  require("./assets/ForcaPerneta.png"),
  require("./assets/ForcaPerneta2.png"), 
  require("./assets/ForcaManeta.png"), 
  require("./assets/ForcaManeta2.png"), 
  require("./assets/ForcaCabeca.png"), 
  require("./assets/ForcaPerdeu.png"), 

];
  
  export default function JogoForca ({ changeScreen, palavraForca, setPalavraForca }) {

    const valorInicial = palavraForca.split("").map((letra) => {
        return letra === " " ? " " : " _ ";
    });
    const [palavraMostra, setPalavraMostra] = useState(valorInicial);
    const [palavraAdivinha, setPalavraAdivinha] = useState("");
    const [letrasUsadas, setLetrasUsadas] = useState([]);

    const [vidas, setVidas] = useState(0);
    const [imgForca, setImgForca] = useState(imgsForca[0]);

    const voltar = () => {
        setPalavraForca(palavraForca);
        changeScreen("homeForca");
    }

    useEffect(() => {
        if (palavraMostra.join("").toUpperCase() === palavraForca.toUpperCase()) {
            setTimeout(() => {
                alert(`Parabéns!\nA palavra era: ${palavraMostra.join("")}`);
                voltar();
            }, 10);
        }
        let vidasTmp = vidas;
        setImgForca(imgsForca[vidasTmp]);
        if (vidasTmp == 6) {
            setTimeout(() => {
                alert("Perdeu playboy!")
                changeScreen("home")
            }, 10);
        }
    }, [palavraMostra, vidas]);

    const checarLetra = () => {
        let vidastmp = vidas;
        if (palavraAdivinha.length >= 1 && palavraAdivinha.match('[A-z]+')) {
            if (palavraAdivinha.toUpperCase() === palavraForca.toUpperCase()) {
                alert(`Parabéns!\nA palavra era: ${palavraForca}`);
                voltar();
            } else if (palavraAdivinha.length == palavraForca.length) {
                setVidas(++vidastmp);
            } else {
                const letrasUsadasTmp = [...letrasUsadas];
                if (!(letrasUsadasTmp.includes(`${palavraAdivinha.toUpperCase().charAt(0)} `))) {
                    letrasUsadasTmp.push(`${palavraAdivinha.toUpperCase().charAt(0)} `);
                    setLetrasUsadas(letrasUsadasTmp);
                    let palavraTmp = palavraForca.toUpperCase().split("")
                    
                    palavraTmp = palavraTmp.map((letra) => {
                        return letra != " " ? letra : "";
                    });

                    palavraTmp = palavraTmp.map((letra) => {
                        return letra === palavraAdivinha.toUpperCase().charAt(0);
                    });

                    const palavraMostraTmp = [...palavraMostra];
                    let contTem = 0;

                    palavraTmp.map((letra, index) => {
                        if (letra) {
                            palavraMostraTmp[index] = palavraAdivinha.toUpperCase().charAt(0);
                            contTem++;
                        }
                    });

                    if (contTem === 0) {
                        setVidas(++vidastmp);
                    }

                    setPalavraMostra(palavraMostraTmp);
                }

            }
        } else {
            alert("Digite apenas letras!")
        }
        setPalavraAdivinha("");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo da Forca</Text>
            <Button color="green" title="Voltar" onPress={voltar} />

            <Image
                style={styles.imgForca}
                source={imgForca}
            />

            <Text>{palavraMostra}</Text>

            <Text>Tentativas: {letrasUsadas}</Text>


            <TextInput placeholder='Digite a letra ou palavra' value={palavraAdivinha} onChangeText={setPalavraAdivinha} style={styles.input} id="" />

            <Button color="green" title="Tentativa" onPress={checarLetra} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    title: {
        fontSize: 30,
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
    imgForca: {
        width: '50%',
        height: '50%',
    },
});