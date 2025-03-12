import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useSignupStore } from "@/stores/signupStore";
import { useRouter } from "expo-router";

import CustomButton from '@/components/CustomButton'
import Logo from "@/components/Logo"
import FormField from '@/components/FormField.jsx'

import Toast from "react-native-toast-message";

const Hiperfocus = () => {
  const router = useRouter();
  const { hiperfocus, setForm, nextStep, submitForm } = useSignupStore();

  const handleSubmit = async () => {
    const success = await submitForm(); 
      if (success){
      nextStep();
      router.push('/pronouns') }}
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  
        locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
          <View className='h-full w-full justify-start items-center p-4'>
            <Logo/>
            <View className='mb-16'>
            <Text className='text-6xl font-bold'>Qual seu hiperfoco?</Text>
            <View className='h-60'>
            <FormField
              title="Descreva em até 5 palavras"
              value={hiperfocus}
              handleChangeText={
                (e: string) => {
                  const words = e.trim().split(/\s+/);  
                  if (words.length <= 5) {
                    setForm("hiperfocus", e);  
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Máximo de 5 palavras',
                      text2: 'Por favor, descreva seu hiperfoco com no máximo 5 palavras.',
                    });
                  }
              }}
              keyboardType="text"
              otherStyle="border-b-2 border-black items-center"
            />
            </View>
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
          <Toast/>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Hiperfocus