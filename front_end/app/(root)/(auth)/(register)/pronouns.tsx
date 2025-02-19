import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Link from 'expo-router/link'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton'
import Logo from "@/components/Logo"

const MAX_PRONOUNS = 1

const Pronouns = () => {
  const [selectPronouns, setSelectPronouns] = useState<string[]>([])
  const pronouns = [
    "Ela/dela",
    "Ele/dele",
    "Não-binário"
  ]
      
  const togglepronoun = (pronoun: string) => {
    selectPronouns.includes(pronoun)
      ? setSelectPronouns(selectPronouns.filter((item) => item !== pronoun))
      : selectPronouns.length < MAX_PRONOUNS &&
        setSelectPronouns([...selectPronouns, pronoun])}
  
  //Add lógica para salvar pronomes.
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
          <View className='h-full w-full justify-start items-center p-8'>
              <Logo/>
             <Text className='text-6xl font-bold mb-4 self-start'>Quais seus pronomes?</Text>
             <View className='h-24'>
             <ScrollView horizontal={true} scrollEnabled={true} contentContainerClassName='overflow-hidden'>
                <View className='flex-row items-baseline'>
                  
                {pronouns.map((myPronoun, index) => (
                  
                  <TouchableOpacity className='m-2 border border-gray-300 rounded-3xl p-2'
                    key={index}
                    onPress={() => togglepronoun(myPronoun)}
                    style={{
                    backgroundColor: selectPronouns.includes(myPronoun) ? '#DFF5FF' : '#f3f3f3'
                    }}
                    
                  >
                    <Text className='text-xl'>{myPronoun}</Text>
              </TouchableOpacity>
              ))}
              </View>
              </ScrollView>
             </View>
             <View className='h-1/2 justify-end items-center'>
            <Pressable className='w-64 h-20' >
                <CustomButton
                  text='Próximo'
                  linkTo={'/new-connection'}
                  color='bg-primary'
                  textColor='text-black'
                />
              </Pressable>
          </View>
          </View>
        </LinearGradient>
    </SafeAreaView>
)}

export default Pronouns