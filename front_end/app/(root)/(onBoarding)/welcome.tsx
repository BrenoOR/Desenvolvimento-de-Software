import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'

import React from 'react'

import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton.jsx'


const Welcome = () => {
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#ffffff", "#FFE0C9", "#FFC3F4", "#E2CAFF", "#BBEAFF"]} 
        start={[0,0]} 
        end={[1,1]}
        style={{ flex: 1 }}
        >
          
          <View className="flex-1 w-full justify-center items-center p-4">
            <Image 
            source={icons.prism} 
            className='w-44 h-44' 
            resizeMode='contain'
            />
            <Text className='text-4xl text-black font-regular text-center'>
              BEM VINDO AO
              {'\n'}
              <Text className='font-black'>
                PRISMA
              </Text>
            </Text>
            <Text className='text-2xl text-center mb-8'>
              Um espaço para conexões {"\n"}
              <Text>únicas e acolhedoras</Text>
            </Text>
            <Pressable className='w-64 h-20'>
              <CustomButton
                text='Entrar'
                linkTo={'/benefits'}
                color='bg-black'
                textColor='text-white'
              />
            </Pressable>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Welcome