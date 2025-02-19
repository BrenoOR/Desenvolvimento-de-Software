import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

import React from 'react'
import icons from '@/constants/icons'
import CustomButton from '@/components/CustomButton.jsx'


const Privacy = () => {
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]} 
        start={[0,0]} 
        end={[1,1]}
        >
          <View className='h-full w-full justify-center items-center p-8'>
            <Image 
            source={icons.safetyMark} 
            className='h-40 w-40' 
            resizeMode='contain'
            />
            <View className='items-baseline my-8'>
              <Text className='text-5xl font-extrabold'>
                Privacidade é prioridade!
                </Text>
                <Text className='text-2xl font-normal'>
                  Você escolhe o que compartilhar e conversa com segurança em um ambiente acolhedor.
                </Text>
                
            </View>
            <Pressable className='w-64 h-20'>
              <CustomButton
                text='Próximo'
                linkTo={'/customize'}
                color='bg-black'
                textColor='text-white'
              />
            </Pressable>
            <Link href={"/sign-up"} className='text-xl mt-2'>Pular</Link>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Privacy