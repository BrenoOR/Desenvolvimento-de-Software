import { View, Text, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { useSignupStore } from "@/stores/signupStore";

import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton.jsx'

import Logo from '@/components/Logo'
import FormField from '@/components/FormField'
import Checkbox from 'expo-checkbox'

import Toast from "react-native-toast-message"

const ExhibitedName = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const { username, setForm, nextStep, submitForm } = useSignupStore();

  const handleSubmit = async () => {
    const success = await submitForm(); 
      if (success){
      nextStep();
      router.push('/add-picture') }
    }
  return (
  <SafeAreaView className='flex-1'>
      <LinearGradient 
      colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  
      locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}
      className="flex-1"
      >
        <View className='flex-1 w-full justify-start items-center px-8'>
          <Logo/>
          <Text className='text-5xl max-w-5xl font-bold'>
          Personalize sua experiência no Prisma! {"\n"}
          <Text className='text-2xl font-normal'>
          Escolha como quer ser visto e compartilhe seus interesses.
          </Text>
          </Text>
          <View className='w-full gap-4 mt-8'>
            <Text className='text-3xl font-bold self-start'>
              Nome de exibição
            </Text>
            <FormField
              title="Escolha algo legal"
              value={username}
              handleChangeText={(e: string) => setForm("username", e)}
              keyboardType="default"
              otherStyle="bg-gray200 opacity-[.75] rounded-2xl border border-gray-700 p-2"
            />
          </View>
          <View className='w-full flex flex-row gap-3 items-center justify-start mt-2'>
            <Checkbox className='justify-self-start h-10 w-10' value={isChecked} onValueChange={setIsChecked} color={"black"}/>
            <Text className='text-2xl font-normal'>
            Quero permanecer anônimo.
            </Text>
          </View>
          <Text className='text-sm self-start mb-2'>
            *Seu nome e foto não serão visíveis para outros usuários no modo anônimo.
          </Text>
          <View className='h-40 justify-end items-center'>
          <Pressable className='w-64 h-20' onPress={handleSubmit}>
              <CustomButton
                text='Próximo'
                color='bg-primary'
                textColor='text-black'
              />
            </Pressable>
          </View>
          <Toast/>
        </View>
      </LinearGradient>
  </SafeAreaView>
  )
}

export default ExhibitedName