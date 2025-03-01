import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Link from "expo-router/link"
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'

import icons from '@/constants/icons'
import Chats from '@/components/Chats'
import ConnectionButton from '@/components/ConnectionButton'
import Logo from '@/components/Logo'

const NewConnection = () => {
  //Lembrar de tirar os mocks quando tiver a API
  const progress = [
    {title: 'Em progresso', id: 1, messages: []},
    {title: 'Finalizadas', id: 2, messages: []}

  ]
  const mockChatPreview = [ 
      { id: 1, chatName: "IA desenho", profilePic: icons.avatar1, text: "Hey there!", time: "12:20" },
      { id: 2, chatName: "IA gatos", profilePic: icons.avatar2,text: "It's sunny and 25°C outside!", time: "15:30" }
  ]
  const mockEndedChats = [
    { id: 1, chatName: "IA feliz", profilePic: icons.avatar3, text: "Hey there!", time: "12:20" },
    { id: 2, chatName: "IA triste", profilePic: icons.avatar4,text: "It's sunny and 25°C outside!", time: "15:30" }
  ]
  const [selectedId, setSelectedId] = useState(progress.length > 0 ? progress[0].id : null)
  const toggleSelection = (id: any) => {
    setSelectedId(prevId => (prevId === id ? null : id))
  }
  const selectedItem = progress.find(item => item.id === selectedId)
  const selectedChats = selectedId === 1 ? mockChatPreview : mockEndedChats
  const [isSelected, setIsSelected] = useState(false)
  
  

  return (
    //Falta editar a tela pra ficar no mesmo padrão das outras
    <SafeAreaView className='flex-1 bg-primary'>
      <ScrollView contentContainerClassName='flex-grow' scrollEnabled={true}>
        <View className='h-full w-full justify-start items-center px-8 gap-4'>
          <Logo/>
            <View className='justify-center items-center'>
              <ConnectionButton
              textH1='Nova Conexão'
              textH3='Encontre novas pessoas'
              icon={icons.share}
              linkTo={'/prepare-connection'}
              type='people'
              />
              <ConnectionButton
              textH1='Pratique conversação'
              textH3='Converse com uma IA'
              icon={icons.starPopup}
              linkTo={'/prepare-connection'}
              type='ai'
              />
            </View>
            <Text className='text-2xl self-start font-bold'>Seu histórico</Text>
          <View className='flex-row gap-1 w-5/6 justify-center mx-4'>
            {progress.map((item) => (
              <Pressable key={item.id} onPress={() => toggleSelection(item.id)}>
                <View className={`justify-center items-center h-10 w-44 ${
                  selectedId === item.id 
                    ? 'bg-orange-300 border border-orange-500 rounded-3xl' 
                    : 'bg-primary border border-gray-500 rounded-3xl'
                }`}>
                  <Text className='text-lg'>{item.title}</Text>
                </View>
              </Pressable>
            ))}
          </View>
          <View className='justify-center'>
            {selectedItem && (
               <View className='w-full'>
               {selectedChats.length > 0 ? (
                 selectedChats.map((item) => (
                   <View key={item.id}>
                      <Chats 
                      picture={item.profilePic} 
                      lastMessage={item.text} 
                      chatName={item.chatName} 
                      time={item.time} 
                      linkTo={''}
                    />
                   <View className='h-[1px] w-full bg-gray-300 m-2'/>
                   </View>
                 ))
               ) : (
                 <Text className='text-sm text-gray-500'>Nenhuma conversa disponível.</Text>
               )}
             </View>
           )}
         </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default NewConnection