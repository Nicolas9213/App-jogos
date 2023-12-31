import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const startValues = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]

export default function JogoVelha({
  changeScreen,
  player1,
  player2
}) {
  const [states, setStates] = useState(startValues);
  const [player, setPlayer] = useState("X");

  useEffect(() => {
    checkWin();
  }, [states])

  const voltar = () => {
    changeScreen("homeVelha")
  }

  const checkPlayerWin = (player) => {    for (let i = 0; i < 3; i++) {
      if (states[i][0] === player
        && states[i][1] === player
        && states[i][2] === player) {
        return true
      }
    }
    for (let i = 0; i < 3; i++) {
      if (states[0][i] === player
        && states[1][i] === player
        && states[2][i] === player) {
        return true
      }
    }

    if (states[0][0] === player
      && states[1][1] === player
      && states[2][2] === player) {
      return true;
    }
    if (states[0][2] === player
      && states[1][1] === player
      && states[2][0] === player) {
      return true;
    }
  };

  const endPlay = (message) => {
    alert(message);
    setStates(startValues);
    voltar();
  }

  const checkWin = () => {
    if (checkPlayerWin("X")) {
      endPlay(`O jogador ${player1} venceu!`);
    } else if (checkPlayerWin("O")) {
      endPlay(`O jogador ${player2} venceu!`);
    } else {
      let countStates = 0;

      states.forEach(line => {
        line.forEach(column => {
          if (column === "X" || column === "O") countStates++;
        });
      });

      if (countStates === 9) {
        endPlay("Ninguém venceu!");
      }
    }
  }

  const handleClickPosition = (line, column) => {
    if (states[line][column] != "") {
      return;
    }

    const newState = [[...states[0]], [...states[1]], [...states[2]]]
    newState[line][column] = player;
    setStates(newState);
    setPlayer(player === "X" ? "O" : "X");
  }

  const getPlayerName = () => player === "X" ? player1 : player2;

  return (
    <View>
      <Text style={styles.title}>Jogo da Velha</Text>
      <Button color="green" title="Voltar" onPress={voltar} />

      <Text>
        É a vez do jogador: {getPlayerName()} - {player}
      </Text>

      {
        states.map((line, indexLine) => {
          return (
            <View style={styles.line} key={indexLine}>
              {line.map((column, indexColumn) => (
                <TouchableOpacity
                  key={`${indexLine}${indexColumn}${column}`}
                  onPress={() => handleClickPosition(indexLine, indexColumn)}
                >
                  <View style={styles.buttonGame}>
                    <Text style={styles.buttonGameFont}>
                      {column}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  line: {
    display: "flex",
    flexDirection: "row"
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  buttonGame: {
    backgroundColor: 'green',
    width: 80,
    height: 80,
    margin: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonGameFont: {
    fontSize: 50,
    color: "#fff"
  }
});