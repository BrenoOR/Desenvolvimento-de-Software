import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';


import icons from '@/constants/icons'

const Welcome = () => {
  return (
    <SafeAreaView className='h-full'>
       <ScrollView contentContainerClassName='h-full'>
        <LinearGradient colors={["#ffffff", "#FFE0C9", "#FFC3F4", "#E2CAFF", "#BBEAFF"]} start={[0,0]} end={[1,1]}>
          <View className="h-full w-full justify-center items-center">
            <Image source={icons.prism} className='w-44 h-44' resizeMode='contain'/>
                <Text className='text-4xl text-black font-regular text-center'>
                  BEM VINDO AO
                  {'\n'}
                  <Text className='font-black'>
                    PRISMA
                  </Text>
                </Text>
                <Text className='text-2xl text-center'>
                  Um espaço para conexões {"\n"}
                  <Text>únicas e acolhedoras</Text>
                </Text>
                <View className='p-4'>
                  <TouchableOpacity className="w-64 bg-black rounded-full h-20 justify-center items-center">
                    <Link href="/benefits">
                      <Text className="text-2xl font-bold text-white">
                        Próximo
                      </Text>
                    </Link>
                  </TouchableOpacity>
                </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Welcome