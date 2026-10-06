import React from 'react'
import { StyleSheet, View } from 'react-native'
import Square from './Square'

/**
 * Componente Board: representa el tablero de 3x3
 * @param {Array} squares - Array con los valores de las 9 celdas
 * @param {Array} winningLine - Array con los índices de la línea ganadora
 * @param {boolean} disabled - Bloquea los toques (fin de juego o turno de la PC)
 * @param {function} onSquarePress - Función que maneja el toque en una celda
 */
function Board({ squares, winningLine, disabled, onSquarePress }) {
  return (
    <View style={styles.board}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={styles.row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col
            return (
              <Square
                key={index}
                value={squares[index]}
                isWinning={Boolean(winningLine && winningLine.includes(index))}
                disabled={disabled}
                onPress={() => onSquarePress(index)}
              />
            )
          })}
        </View>
      ))}
    </View>
  )
}

export default Board

const styles = StyleSheet.create({
  board: {
    width: '100%',
    maxWidth: 400,
    gap: 12,
    padding: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
})
