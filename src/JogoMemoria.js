import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, Button } from "react-native";

export default function Memoria({ changeScreen, jogador1, jogador2 }) {
    const [clicks, setClicks] = useState(0);
    const [indexes, setIndexes] = useState([]);
    const [jogador, setJogador] = useState(jogador1);
    const [pares, setPares] = useState([0, 0]);

    const voltar = () => {
        changeScreen("homeVelha")
      }

    const generateGame = () => {
        const emojis = ["🧬", "🐒", "🦋", "🌱", "🦴", "🧠", "🌳", "🦒", "🦣", "🦕", "🦖", "🦠", "👤",

        "🧬", "🐒", "🦋", "🌱", "🦴", "🧠", "🌳", "🦒", "🦣", "🦕", "🦖", "🦠", "👤"];

        const game = [
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""],
            ["", "", "", ""]
        ];

        game.forEach((row) => {
            for (let i = 0; i < 5; i++) {
                let index = Math.floor(Math.random() * emojis.length);
                row[i] = emojis[index];
                emojis.splice(index, 1);
            }
        });

        return game;
    }

    const [game, setGame] = useState([...generateGame()]);

    const [showedGame, setShowedGame] = useState([
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}],
        [{val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}, {val: "", player:""}]
    ]);

    useEffect(() => {
        checkWin()
    }, showedGame);

    const play = (row, col) => {
        let showedGameTmp = [[...showedGame[0]], [...showedGame[1]], [...showedGame[2]], [...showedGame[3]],
        [...showedGame[4]], [...showedGame[5]], [...showedGame[6]], [...showedGame[7]], [...showedGame[8]],
        [...showedGame[9]]];

        let amountClicks = clicks;
        let clickIndexes = [...indexes];
        let paresTmp = [...pares];
        let gameTmp = [...game];

        if (amountClicks === 0) {

            setIndexes([row, col]);

            showedGameTmp[row][col].val = gameTmp[row][col];
            
        } else if (amountClicks === 1 && gameTmp[clickIndexes[0]][clickIndexes[1]] == gameTmp[row][col]) {
            
            showedGameTmp[row][col].val = gameTmp[row][col];

            showedGameTmp[clickIndexes[0]][clickIndexes[1]].player = jogador;
            showedGameTmp[row][col].player = jogador;
            
            jogador === jogador1 ? ++paresTmp[0] : ++paresTmp[1];
            setIndexes([]);
            amountClicks = -1;
        } else {
            setTimeout(() => {
                showedGameTmp[clickIndexes[0]][clickIndexes[1]].val = "";
                showedGameTmp[row][col].val = "";
                setShowedGame([...showedGameTmp])
            }, 1000);
            
            showedGameTmp[row][col].val = gameTmp[row][col];
            setIndexes([]);
            amountClicks = -1;
            setJogador(jogador === jogador1 ? jogador2 : jogador1);
        }
        
        setPares([...paresTmp]);
        setShowedGame([...showedGameTmp])
        ++amountClicks;
        setClicks(amountClicks);

    }

    const checkWin = () => {
        let temGanhador = true;
        showedGame.forEach((row) => {
            row.forEach((card) => {
                if (card.val == "") {
                    temGanhador = false;
                }
            });
        });
        temGanhador ? setTimeout(() => {definirGanhador()}, 10) : 0;
    }

    const definirGanhador = () => {
        if (pares[0] > pares[1]) {
            alert(jogador1 + " ganhou!")
        } else {
            alert(jogador2 + " ganhou!")
        }
        changeScreen("home");
    }

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Jogo da Memória - Evolução</Text>
            <Text style={jogador == jogador1 ? styles.jogador1 : styles.jogador2}>Quem joga é: {jogador}</Text>
            <Text style={styles.jogador1}>{jogador1}: {pares[0]}</Text>
            <Text style={styles.jogador2}>{jogador2}: {pares[1]}</Text>
            <View>
                {
                    showedGame.map((row, indexRow) => {
                        return (
                            <View style={styles.row} key={indexRow}>
                                {row.map((column, indexColumn) => (
                                    <Pressable
                                        key={`${indexRow}, ${indexColumn}, ${column}`}
                                        onPress={() => play(indexRow, indexColumn)}
                                        disabled={(column.val != "")}
                                    >
                                        <View
                                            style={(column.val != "" ? (column.player != "" ? (column.player == jogador1 ? styles.cardGameJog1 : styles.cardGameJog2) : styles.cardGameDisabled) : styles.cardGame)}
                                            
                                        >
                                            <Text style={styles.cardGameFont}>
                                                {column.val}
                                            </Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                            
                        )
                    })
                }
            </View>
            <Button title="Voltar" color="green" onPress={voltar} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
    },
    title: {
        fontSize: 30,
    },
    row: {
        display: "flex",
        flexDirection: "row",
    },
    cardGame: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#20B2AA",
        alignItems: "center",
    },
    cardGameJog1: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#7FFFD4",
        alignItems: "center",
    },
    cardGameJog2: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#DC143C",
        alignItems: "center",
    },
    cardGameDisabled: {
        width: 40,
        height: 40,
        margin: 2,
        borderRadius: 1,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "lightgrey",
        alignItems: "center",
    },
    cardGameFont: {
        fontSize: 25,
        color: "#fff",
    },
    jogador1: {
        color: "#000000",
    },
    jogador2: {
        color: "#000000",
    }
});