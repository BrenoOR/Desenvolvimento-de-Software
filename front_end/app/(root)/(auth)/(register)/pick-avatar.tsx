import {View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import Link from "expo-router/link"
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native';


import icons from '@/constants/icons'

const PickAvatar = () => {
  
  const [avatar, setAvatar] = useState({userAvatar:''})
  const avatars = [

    { id: 'avatar1', source: require('@/assets/icons/avatar1.png') },
    { id: 'avatar2', source: require('@/assets/icons/avatar2.png') },
    { id: 'avatar3', source: require('@/assets/icons/avatar3.png') },
    { id: 'avatar4', source: require('@/assets/icons/avatar4.png') },
    { id: 'avatar5', source: require('@/assets/icons/avatar5.png') },
    { id: 'avatar6', source: require('@/assets/icons/avatar6.png') },
    { id: 'avatar7', source: require('@/assets/icons/avatar7.png') },
    { id: 'avatar8', source: require('@/assets/icons/avatar8.png') },
    { id: 'avatar9', source: require('@/assets/icons/avatar9.png') }

  ];
  
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]} locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
        <View className='h-full w-full justify-start items-center p-8'>
          <Image source={icons.logo} className='h-8 w-40 mb-16'/>
          <Text className='text-4xl font-bold mb-8'>Escolha seu avatar</Text>
          <View className=" flex flex-row flex-wrap gap-2 justify-between mb-56">
            {avatars.map((item) => (
              <Pressable key={item.id} onPressIn={() => setAvatar({ userAvatar: item.id })}>
                <Image source={item.source} className={`h-[90] w-[90] ${ avatar.userAvatar === item.id ? 'opacity-50' : 'opacity-100'}`} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
          <TouchableOpacity className="w-3/4 bg-primary rounded-full h-24 justify-center items-center">
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

export default PickAvatar