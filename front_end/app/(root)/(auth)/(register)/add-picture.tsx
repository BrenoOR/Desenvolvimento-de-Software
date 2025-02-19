import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

import icons from '@/constants/icons'
import Logo from "@/components/Logo"
import Link from 'expo-router/link'
import CustomButton from '@/components/CustomButton'

const AddPicture = () => {
  //Add lógica para adicionar fotos
  
  return (
    <SafeAreaView className="flex-1">
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]} className="flex-1">
          <View className="flex-1 w-full justify-start items-center px-8">
            <Logo/>
            <Text className="font-bold text-4xl max-w-5xl">Que tal adicionar uma foto?</Text>
            <TouchableOpacity>
              <Image source={icons.image} className='h-60 w-60 m-16'/>
            </TouchableOpacity>
            <View className='h-40 justify-end items-center'>
            <Pressable className='w-64 h-20'>
                <CustomButton
                  text='Próximo'
                  linkTo={'/hiperfocus'}
                  color='bg-primary'
                  textColor='text-black'
                />
              </Pressable>
              <Link className='text-primary text-lg font-normal mt-2' href={'/pick-avatar'}>Ou escolher um avatar</Link>
            </View>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default AddPicture