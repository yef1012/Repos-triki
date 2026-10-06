import React, { useEffect, useState } from 'react'
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Board from './Components/Board'
import Footer from './Components/Footer'

const createEmptyBoard = () => Array(9).fill(null)

/**
 * Función auxiliar que verifica si hay un ganador en el tablero
 * @param {Array} squares - Array con los valores de las 9 celdas
 * @returns {Object} - Objeto con el ganador (null, 'X', 'O') y la línea ganadora
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Fila superior
    [3, 4, 5], // Fila media
    [6, 7, 8], // Fila inferior
    [0, 3, 6], // Columna izquierda
    [1, 4, 7], // Columna central
    [2, 5, 8], // Columna derecha
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal inversa
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] }
    }
  }

  return { winner: null, line: null }
}

/**
 * Componente Game: maneja la lógica del juego.
 * Estado único de verdad: `history` + `stepNumber`.
 * El tablero actual, el turno y el historial se derivan de ellos.
 */
export default function Game() {
  const [history, setHistory] = useState(() => [createEmptyBoard()])
  const [stepNumber, setStepNumber] = useState(0)
  const [gameMode, setGameMode] = useState('pvp')

  const squares = history[stepNumber] ?? createEmptyBoard()
  const xIsNext = stepNumber % 2 === 0

  const { winner, line: winningLine } = calculateWinner(squares)
  const isDraw = !winner && squares.every((square) => square !== null)
  const isGameOver = Boolean(winner) || isDraw
  const isComputerTurn = gameMode === 'computer' && !xIsNext && !isGameOver

  /**
   * Registra una jugada y descarta los movimientos futuros del historial
   * @param {Array} nextSquares - Tablero resultante
   * @param {number} step - Paso sobre el que se aplica la jugada
   */
  function play(nextSquares, step = stepNumber) {
    setHistory((prev) => [...prev.slice(0, step + 1), nextSquares])
    setStepNumber(step + 1)
  }

  /**
   * Maneja el toque en una celda
   * @param {number} i - Índice de la celda
   */
  function handleSquarePress(i) {
    if (isGameOver || isComputerTurn) return
    if (squares[i]) return

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    play(nextSquares)
  }

  // Turno de la computadora (con retardo).
  // El cleanup cancela el temporizador si el usuario reinicia, cambia de
  // modo o navega por el historial mientras la computadora "piensa".
  useEffect(() => {
    if (!isComputerTurn) return undefined

    const timer = setTimeout(() => {
      const emptySquares = squares.reduce(
        (acc, square, index) => (square === null ? [...acc, index] : acc),
        []
      )
      if (emptySquares.length === 0) return

      const index = emptySquares[Math.floor(Math.random() * emptySquares.length)]
      const nextSquares = squares.slice()
      nextSquares[index] = 'O'
      play(nextSquares, stepNumber)
    }, 500)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComputerTurn, stepNumber, squares])

  function resetGame() {
    setHistory([createEmptyBoard()])
    setStepNumber(0)
  }

  function setMode(mode) {
    setGameMode(mode)
    resetGame()
  }

  /**
   * Navega a una jugada específica del historial
   * @param {number} step - Número de movimiento
   */
  function jumpTo(step) {
    setStepNumber(step)
  }

  function getStatus() {
    if (winner) return `¡Ganador: ${winner}!`
    if (isDraw) return '¡Empate!'
    if (isComputerTurn) return 'La computadora piensa…'
    return `Turno de: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Triki</Text>

          <View style={styles.modeRow}>
            <Pressable
              onPress={() => setMode('pvp')}
              style={({ pressed }) => [
                styles.modeBtn,
                gameMode === 'pvp' && styles.modeBtnActive,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.modeText,
                  gameMode === 'pvp' && styles.modeTextActive,
                ]}
              >
                2 Jugadores
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setMode('computer')}
              style={({ pressed }) => [
                styles.modeBtn,
                gameMode === 'computer' && styles.modeBtnActive,
                pressed && styles.pressed,
              ]}
            >
              <Text
                style={[
                  styles.modeText,
                  gameMode === 'computer' && styles.modeTextActive,
                ]}
              >
                vs Computadora
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.status,
              winner && styles.statusWinner,
              isDraw && styles.statusDraw,
            ]}
          >
            <Text style={styles.statusText}>{getStatus()}</Text>
          </View>

          <Board
            squares={squares}
            winningLine={winningLine}
            disabled={isGameOver || isComputerTurn}
            onSquarePress={handleSquarePress}
          />

          <Pressable
            onPress={resetGame}
            style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
          >
            <Text style={styles.resetText}>Reiniciar Juego</Text>
          </Pressable>

          {history.length > 1 && (
            <View style={styles.history}>
              <Text style={styles.historyTitle}>Historial de Jugadas</Text>

              <View style={styles.historyList}>
                {history.map((_, step) => {
                  const isCurrent = step === stepNumber
                  return (
                    <Pressable
                      key={step}
                      onPress={() => jumpTo(step)}
                      style={({ pressed }) => [
                        styles.historyBtn,
                        isCurrent && styles.historyBtnCurrent,
                        pressed && styles.pressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.historyText,
                          isCurrent && styles.historyTextCurrent,
                        ]}
                      >
                        {step === 0 ? 'Inicio' : `Movimiento ${step}`}
                      </Text>
                    </Pressable>
                  )
                })}
              </View>
            </View>
          )}

          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#16213e',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  card: {
    width: '100%',
    maxWidth: 480,
    alignItems: 'center',
    gap: 24,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#667eea',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4,
  },
  modeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  modeBtn: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  modeBtnActive: {
    backgroundColor: '#fff',
  },
  modeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#667eea',
  },
  status: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  statusWinner: {
    backgroundColor: '#10b981',
  },
  statusDraw: {
    backgroundColor: '#f59e0b',
  },
  statusText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  resetBtn: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 14,
    backgroundColor: '#f43f5e',
    shadowColor: '#f43f5e',
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  resetText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  history: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  historyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  historyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    maxWidth: 350,
  },
  historyBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  historyBtnCurrent: {
    backgroundColor: '#fff',
  },
  historyText: {
    color: '#fff',
    fontSize: 14,
  },
  historyTextCurrent: {
    color: '#667eea',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.7,
  },
})
