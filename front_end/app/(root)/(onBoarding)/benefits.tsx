import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import icons from '@/constants/icons'
import Link from 'expo-router/link'


const Benefits = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerClassName="h-screen">
        <View className="h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center mt-32">
            <MaskedView
              maskElement={
                <View className="justify-center items-center">
                  <Text className="text-6xl font-black">
                    No Prisma,
                    {'\n'}
                    <Text className="text-4xl font-normal">
                      você pode:
                    </Text>
                  </Text>
                </View>
              }
              style={{ width: '100%', height: 102}} 
            >
              <LinearGradient
                colors={["#39c0fb", "#a36ce6", "#fda0ec", "#fbc7a0", "#ffffff"]}
                start={[0, 0]}
                end={[1, 1]}
                style={{ flex: 1 }} 
              />
            </MaskedView>
            <View className='flex-1 rounded-t-3xl overflow-hidden h-3/4 w-5/6 border-blue border-2 justify-center items-center'>
              
              <LinearGradient colors={["#ffffff", "#ffefe3", "#ffe0f9", "#eee0ff", "#dff5ff"]} start={[0, 0]}
                end={[1, 1]}
                style={{ 
                  flex: 1,
                }}>
                  <View className='p-16 w-5/6 justify-center items-center gap-2'>
                    <View className='flex flex-row gap-2 justify-between'>
                      <Image source={icons.swipe} resizeMode='contain'/>
                      <Text className='text-2xl font-semibold'>Fazer amizades no seu ritmo.</Text>
                    </View>
                    <View className='flex flex-row gap-2 justify-between '>
                        <Image source={icons.hobbies} resizeMode='contain'/>
                        <Text className='text-2xl font-semibold'>Explorar interesses e hiperfocos.</Text>
                    </View>
                    <View className='flex flex-row gap-2 justify-between '>
                        <Image source={icons.trust}/>
                        <Text className='text-2xl font-semibold'>Interagir com segurança e privacidade.</Text>
                    </View>
                      <TouchableOpacity className="w-64 bg-black rounded-full h-20 justify-center items-center mt-2">
                        <Link href={"/privacy"}>
                          <Text className="text-2xl font-bold text-white">
                            Próximo
                          </Text>
                        </Link>
                      </TouchableOpacity>
                    <Link href={"/sign-up"} className='text-xl mb-16'>Pular</Link>
                    
                  </View>
              </LinearGradient>

            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Benefits
