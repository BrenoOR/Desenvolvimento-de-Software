import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import Link from 'expo-router/link'

const AddPicture = () => {
  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerClassName="flex-grow">
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]} className="flex-1">
          <View className="flex-1 w-full justify-start items-center px-8">
            <Image source={icons.logo} className='h-8 w-40 mb-8'/>
            <Text className="font-bold text-4xl max-w-5xl">Que tal adicionar uma foto?</Text>
            <TouchableOpacity>
              <Image source={icons.image} className='h-60 w-60 m-16'/>
            </TouchableOpacity>
            <TouchableOpacity className="w-64 bg-primary rounded-full h-24 justify-center items-center mt-16">
              <Link href={"/hiperfocus"}>
                <Text className="text-3xl font-bold text-black">
                  Continuar
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddPicture