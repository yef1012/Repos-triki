import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const LOGO = require('../../assets/icon.png')

function Footer() {
  return (
    <View style={styles.footer}>
      <Image source={LOGO} style={styles.logo} accessibilityLabel="Logo" />
      <View style={styles.text}>
        <Text style={styles.name}>Realizado por Yefry Amaya</Text>
        <Text style={styles.copy}>© {new Date().getFullYear()} Juego</Text>
      </View>
    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    width: '100%',
    padding: 20,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  text: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  copy: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
})
