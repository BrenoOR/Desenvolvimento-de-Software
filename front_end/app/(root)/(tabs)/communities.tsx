import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'

const Communities = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient 
          colors={["#E2CAFF", "#BBEAFF", "#FFE0C9", "#FFC3F4"]}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image 
                source={icons.avatar8} 
                style={styles.avatar}
              />
              <Text style={styles.headerTitle}>IA</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>10:00</Text>
            </View>
          </View>
          
          {/* Opção de sair centralizada */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.exitButton}>
              <Text style={styles.exitButtonText}>Sair da conversa</Text>
            </TouchableOpacity>
          </View>
          
          {/* Seção do Tema */}
          <View style={styles.themeContainer}>
            <Text style={styles.themeTitle}>Conversando sobre Desenho</Text>
            <Text style={styles.themeSubtitle}>Tema: Van Gogh</Text>
          </View>
          
          {/* Mensagens */}
          <View style={styles.messagesContainer}>
            <View style={[styles.messageBubble, styles.receivedMessage]}>
              <Text style={styles.messageText}>Oie</Text>
            </View>

            <View style={[styles.messageBubble, styles.sentMessage]}>
              <Text style={styles.messageText}>Van Gogh também é seu pintor favorito?</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
      
      {/* Input Fixo */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva sua mensagem aqui"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Image 
            source={icons.send} 
            style={styles.sendIcon} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000'
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100
  },
  gradient: {
    flex: 1,
    minHeight: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF', // Alterado para branco
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000'
  },
  timeContainer: {
    backgroundColor: '#FFD9A3',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza o botão
    marginTop: 10
  },
  exitButton: {
    backgroundColor: '#EEE',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  exitButtonText: {
    fontSize: 14,
    color: '#333'
  },
  themeContainer: {
    alignItems: 'center',
    marginVertical: 16
  },
  themeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#666'
  },
  themeSubtitle: {
    fontSize: 16,
    color: '#666'
  },
  messagesContainer: {
    paddingHorizontal: 16,
    gap: 12
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20
  },
  receivedMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start'
  },
  sentMessage: {
    backgroundColor: '#F3F3F3',
    alignSelf: 'flex-start'
  },
  messageText: {
    fontSize: 16,
    color: '#000'
  },
  inputContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Aumentei a opacidade
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)', // Suavizei um pouco a borda
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#000'
  },
  sendButton: {
    padding: 8
  },
  sendIcon: {
    width: 20,
    height: 20,
    tintColor: '#000'
  }
})

export default Communities
