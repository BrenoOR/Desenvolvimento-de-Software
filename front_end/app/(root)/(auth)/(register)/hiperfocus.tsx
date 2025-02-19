import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useUser } from '@/components/UserContext'

import CustomButton from '@/components/CustomButton'
import Logo from "@/components/Logo"
import FormField from '@/components/FormField.jsx'

const Hiperfocus = () => {
  const [form, setForm] = useState({
      hiperfocus: ''
    })
  const [error, setError] = useState('')
  const { userId } = useUser()
  const handleSubmit = async () => {
    setError('')
    if (!form.hiperfocus) {
      setError("Insira seu hiperfoco")
      return
    }
    try {
      const response = await fetch(`localhost:8081/local/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
  
      if (response.ok) {
        const data = await response.json()
        console.log("Logged in successfully:", data)
      } else {
        const data = await response.json()
        setError(data.error || "Algo deu errado.")
      }
    } catch (err) {
      setError("Erro de conexão, por favor tente novamente.")
    }

  }
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
              value={form.hiperfocus}
              handleChangeText={(e: any) => setForm({...form, hiperfocus: e})}
              keyboardType="text"
              otherStyle="border-b-2 border-black items-center"
            />
            </View>
          </View>
          <View className='h-40 justify-end items-center'>
          <Pressable className='w-64 h-20' onPress={handleSubmit}>
              <CustomButton
                text='Próximo'
                linkTo={'/pronouns'}
                color='bg-primary'
                textColor='text-black'
              />
            </Pressable>
          </View>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default Hiperfocus