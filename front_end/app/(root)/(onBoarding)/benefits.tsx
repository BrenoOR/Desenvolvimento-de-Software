import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'

import React from 'react'

import icons from '@/constants/icons'
import Link from 'expo-router/link'
import CustomButton from '@/components/CustomButton.jsx'



const Benefits = () => {
  return (
    <SafeAreaView className="bg-black flex-1">
        <View className="flex-1 w-full justify-center items-center p-4">
          <View className="h-full w-full justify-center items-center mt-16">
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

            <View className='h-5/6 w-full max-w-80 rounded-t-3xl overflow-hidden border-blue border-2 justify-center items-center'>
              <LinearGradient 
              colors={["#ffffff", "#ffefe3", "#ffe0f9", "#eee0ff", "#dff5ff"]} 
              start={[0, 0]}
              end={[1, 1]}
              style={{ flex: 1}}>
                  <View className='p-16 w-5/6 justify-center items-center gap-2'>
                    <View className='flex-row gap-2 justify-between'>
                      <Image 
                      source={icons.swipe} 
                      resizeMode='contain'
                      />
                      <Text className='text-xl font-semibold'>
                        Fazer amizades no seu ritmo.
                      </Text>
                    </View>
                    <View className='flex-row gap-2 justify-between '>
                        <Image 
                        source={icons.hobbies} 
                        resizeMode='contain'
                        />
                        <Text className='text-xl font-semibold'>
                          Explorar interesses e hiperfocos.
                        </Text>
                    </View>
                    <View className='flex-row gap-2 justify-between '>
                        <Image source={icons.trust}/>
                        <Text className='text-xl font-semibold'>Interagir com segurança e privacidade.</Text>
                    </View>
                    <Pressable className='w-64 h-20'>
                      <CustomButton
                        text='Próximo'
                        linkTo={'/privacy'}
                        color='bg-black'
                        textColor='text-white'
                      />
                    </Pressable>
                    <Link 
                    href={"/sign-up"} className='text-xl'>Pular</Link>
                    
                  </View>
              </LinearGradient>

            </View>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Benefits
