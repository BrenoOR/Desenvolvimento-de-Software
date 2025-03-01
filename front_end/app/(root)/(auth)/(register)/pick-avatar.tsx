import {View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { useSignupStore } from "@/stores/signupStore";

import Logo from "@/components/Logo"
import CustomButton from '@/components/CustomButton'

import Toast from "react-native-toast-message"

const PickAvatar = () => {
  const router = useRouter();
  const { avatar_picture, setForm, nextStep, submitForm } = useSignupStore();
    
  const [avatar, setAvatar] = useState({userAvatar:'', picked: false})
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

  const handleSubmit = async () => {
    if (avatar.picked) {
      setForm("avatar_picture", avatar.userAvatar); 
      const success = await submitForm(); 
      if (success) {
        nextStep();
        router.push('/hiperfocus');
      }
    }}
  
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]} 
        locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
        <View className='h-full w-full justify-start items-center p-8'>
          <Logo/>
          <Text className='text-4xl font-bold mb-8'>Escolha seu avatar</Text>
          <View className=" flex flex-row flex-wrap gap-2 justify-between mb-8">
            {avatars.map((item) => (
              <Pressable key={item.id} onPressIn={() => setAvatar({ userAvatar: item.id, picked: true})}>
                <Image source={item.source} className={`h-[90] w-[90] ${ avatar.userAvatar === item.id ? 'opacity-50' : 'opacity-100'}`} resizeMode="contain" />
              </Pressable>
            ))}
          </View>
          <View className='h-40 justify-end items-center'>
          <Pressable className='w-64 h-20'>
              <CustomButton
                text='Próximo'
                color='bg-primary'
                textColor='text-black'
                onPress={handleSubmit}
              />
            </Pressable>
          </View>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default PickAvatar