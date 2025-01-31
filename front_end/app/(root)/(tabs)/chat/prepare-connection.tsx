import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import Link from "expo-router/link"

import icons from '@/constants/icons'
import FormField from '@/components/FormField.jsx'
import Checkbox from 'expo-checkbox'

const PrepareConnection = () => {
  const mockInterest = [
    {id: 1, name: "Desenho", user: "Ana"},
    {id:2, name: "Música", user: "Ana"}
  ]
  const [changeInterest, setChangeInterest] = useState(false)
  const [selectedInterest, setSelectedInterest] = useState(mockInterest[0].id)
  const [form, setForm] = useState({
        description: '',
        timing: ''
  })
  const [isChecked, setIsChecked] = useState(false)
  

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView contentContainerClassName='flex-grow' scrollEnabled={true}>
        <LinearGradient colors={["#ffffff", "#FFE0C9", "#FFC3F4", "#E2CAFF", "#BBEAFF"]} start={[0,0]} end={[0,1]} className='flex-1'>
          <View className='flex-1 justify-start items-center gap-8 px-8 w-full'>
            <View>
              <Image source={icons.logo} className='h-8 w-40 mt-4'/>
            </View>
            <View className='justify-center items-center'>
              <Image source={icons.settingsGears} resizeMode='contain' className='h-12 w-12 mb-2'/>
              <Text className='text-2xl font-bold'>Prepare sua conversa</Text>
              <Text className='text-xl font-normal text-center'>Ajuste os detalhes para tornar sua interação ainda mais especial.</Text>
            </View>
            <View className='h-full gap-4 justify-start items-center w-full bg-primary overflow-hidden rounded-t-3xl border border-gray-500'>
              <Link href='/' className='mt-2'>Pular</Link>
              <View className='w-full gap-4 mx-4 items-left px-8 justify-center'>
                <Text className='text-xl text-xl font-normal'>Seu interesse selecionado:</Text>
                <View className='flex-row items-center justify-center'>
                  <View className='justify-center items-center h-12 min-w-32 bg-orange-300 border border-gray-500 rounded-full'>
                    <Text className='text-xl font-bold'>{mockInterest.find(i => i.id === selectedInterest)?.name} </Text>
                  </View>
                  <View className='justify-center items-center'>
                  {changeInterest ? (
                    <View className='w-full items-center justify-center'>
                      <ScrollView className='w-3/4' horizontal={true}>
                        {mockInterest.map((interest) => (
                          <Pressable 
                            key={interest.id} 
                            onPress={() => {
                              setSelectedInterest(interest.id)
                              setChangeInterest(false)
                            }}
                            className="bg-gray-200 border border-gray-300 rounded-full p-2 mr-2"
                          >
                            <Text className="text-lg">{interest.name}</Text>
                          </Pressable>
                        ))}
                      </ScrollView>
                    </View>
                  ) : (
                    <Pressable onPress={() => setChangeInterest(true)} className='w-24'>
                      <Text className='text-lg text-left text-gray-500 ml-2'>Mudar interesse</Text>
                    </Pressable>
                  )}
                  </View>
                </View>
              </View>
              <View className='w-full justify-center items-left px-8'>
                <Text className='text-xl text-xl font-normal'>Sobre o que você gostaria de conversar?</Text>
                <FormField
                  title="Descreva em até 5 palavras"
                  value={form.description}
                  handleChangeText={(e: any) => setForm({...form, description: e})}
                  keyboardType="text"
                  otherStyle="border-b border-black items-center w-full"
            />
              </View>
              <View className='w-full justify-center items-left px-8 gap-2'>
                <Text className='text-xl text-xl font-normal'>Quanto tempo você gostaria de conversar?</Text>
                <View className='justify-center items-center flex-row gap-2 mt-2'>
                  <FormField
                    title=""
                    value={form.timing}
                    handleChangeText={(e: any) => setForm({...form, timing: e})}
                    keyboardType="number"
                    otherStyle="bg-gray200 opacity-[.75] rounded-lg border border-gray-700 p-2 h-8 w-8"
                  />
                  <Text className='text-black font-normal text-xl'>Minutos</Text>
                </View>
                <TouchableOpacity className="w-48 bg-black rounded-full h-16 justify-center items-center self-center my-8">
                  <Link href='/'>
                    <Text className="text-2xl font-bold text-white">
                      Iniciar
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PrepareConnection