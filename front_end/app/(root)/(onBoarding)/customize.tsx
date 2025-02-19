import { View, Text, Pressable} from 'react-native'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import CustomButton from '@/components/CustomButton.jsx'

const Customize = () => {
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#1e1d1d", "#39c0fb", "#a36ce6", "#fda0ec", "#fbc7a0"]}  
        locations={[0.4, 0.6, 0.7, 0.8, 1]}
        >
          <View className='h-full w-full justify-center items-center p-8'>
              <MaskedView
                      maskElement={
                        <View>
                          <Text className="text-6xl font-black">
                            Personalize
                          </Text>
                        </View>
                      }
                      style={{ width: "100%", height: 50}}>
                      <LinearGradient
                        colors={["#39c0fb", "#a36ce6", "#fda0ec", "#fbc7a0", "#ffffff"]}
                        start={[0, 0]}
                        end={[1, 0]}
                        style={{ flex: 1 }} 
                      />
                </MaskedView>
                <Text className='text-primary font-normal text-4xl self-start'>
                sua experiência:
                </Text>
                <View className='gap-8 text-left mt-12 w-full'>
                  <Text className='text-primary text-2xl'>
                  Escolha como interagir:{'\n'}guiado ou livre.
                  </Text>
                  <Text className='text-primary text-2xl'>
                  Conecte-se no seu ritmo e explore interesses únicos.
                  </Text>
                </View>
            <View className='h-64 justify-end items-center'>
              <Pressable className='w-64 h-20'>
                <CustomButton
                  text='Começar'
                  linkTo={'/sign-up'}
                  color='bg-black'
                  textColor='text-white'
                />
              </Pressable>
              <Link href={"/sign-in"} className='text-xl mt-2'>Ou fazer login</Link>
            </View>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Customize