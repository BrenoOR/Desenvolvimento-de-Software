import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import Link from 'expo-router/link'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

import icons from '@/constants/icons'

const MAX_INTERESTS = 5

const ChooseTopics = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const interests = [
    "Música",
    "Arte",
    "Viagens",
    "Comida e Gastronomia",
    "Tecnologia",
    "Esportes",
    "Cinema",
    "Literatura",
    "Fotografia",
    "Ciência",
    "História",
    "Dança",
    "Moda e Estilo",
    "Natureza e Sustentabilidade",
    "Jogos",
    "spiritualidade",
    "Bem-Estar e Saúde",
    "Animais e Pets",
    "Empreendedorismo",
    "Astronomia"
  ]
    
  
  const toggleInterest = (interest: string) => {
    selectedInterests.includes(interest)
      ? setSelectedInterests(selectedInterests.filter((item) => item !== interest))
      : selectedInterests.length < MAX_INTERESTS &&
        setSelectedInterests([...selectedInterests, interest])}
  

  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='flex-grow'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
          <View className='flex-1 w-full justify-start items-center p-8'>
            <Image source={icons.logo} className='h-8 w-40 mb-8'/>
            <Text className='text-7xl font-bold'>Escolha até 5 tópicos de interesse</Text>
            <Text className='text-3xl self-start'>{`${selectedInterests.length}/5`}</Text>
            <ScrollView horizontal={true} scrollEnabled={true} contentContainerClassName='h-full'>
              <View className='flex-row flex-wrap items-baseline w-screen'>
                
              {interests.map((myInterest, index) => (
                
                <TouchableOpacity className='m-2 border border-gray-300 rounded-3xl p-3'
                  key={index}
                  onPress={() => toggleInterest(myInterest)}
                  style={{
                   backgroundColor: selectedInterests.includes(myInterest) ? '#DFF5FF' : '#f3f3f3'
                  }}
                >
                  <Text className='text-sm'>{myInterest}</Text>
            </TouchableOpacity>
          ))}
              </View>
            </ScrollView>
            <TouchableOpacity className="w-3/4 bg-primary rounded-full h-24 justify-center items-center">
              <Link href={"/pronouns"}>
                <Text className="text-3xl font-bold text-black">
                  Continuar
                </Text>
              </Link>
            </TouchableOpacity>
            <Link href={"/pronouns"} className='text-xl text-primary mt-4'>Pular</Link>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChooseTopics