import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import icons from '@/constants/icons'

const Privacy = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-screen'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]} start={[0,0]} end={[1,1]}>
          <View className='h-full w-full justify-center items-center p-8'>
            <Image source={icons.safetyMark} className='h-40 w-40' resizeMode='contain'/>
            <View className='items-baseline my-8'>
              <Text className='text-5xl font-extrabold'>
                Privacidade é prioridade!
                </Text>
                <Text className='text-2xl font-normal'>Você escolhe o que compartilhar e conversa com segurança em um ambiente acolhedor.</Text>
                
            </View>
            <TouchableOpacity className="w-64 bg-black rounded-full h-20 justify-center items-center">
                <Link href={"/customize"}>
                  <Text className="text-2xl font-bold text-white">
                    Próximo
                  </Text>
                </Link>
              </TouchableOpacity>
            <Link href={"/sign-up"} className='text-xl mt-2'>Pular</Link>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Privacy