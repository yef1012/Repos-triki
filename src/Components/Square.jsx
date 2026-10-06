import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

/**
 * Componente Square: representa una celda individual del tablero
 * @param {string} value - Valor de la celda ('X', 'O', o null)
 * @param {boolean} isWinning - Indica si esta celda es parte de la línea ganadora
 * @param {boolean} disabled - Impide tocar la celda
 * @param {function} onPress - Función que se ejecuta al tocar la celda
 */
function Square({ value, isWinning, disabled, onPress }) {
  const isX = value === 'X'
  const isO = value === 'O'
  const isEmpty = value === null || value === undefined

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || !isEmpty}
      accessibilityRole="button"
      accessibilityLabel={value ? `Celda con ${value}` : 'Celda vacía'}
      style={({ pressed }) => [
        styles.square,
        isX && styles.squareX,
        isO && styles.squareO,
        isWinning && styles.squareWinning,
        disabled && isEmpty && styles.squareDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.value,
          isX && styles.valueX,
          isO && styles.valueO,
        ]}
      >
        {value}
      </Text>
    </Pressable>
  )
}

export default Square

const styles = StyleSheet.create({
  square: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  squareX: {
    backgroundColor: '#e0e7ff',
  },
  squareO: {
    backgroundColor: '#fce7f3',
  },
  squareWinning: {
    backgroundColor: '#c7d2fe',
    borderWidth: 2,
    borderColor: '#6366f1',
    shadowColor: '#6366f1',
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  squareDisabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  value: {
    fontSize: 40,
    fontWeight: '700',
    color: '#1f2937',
  },
  valueX: {
    color: '#6366f1',
  },
  valueO: {
    color: '#ec4899',
  },
})
