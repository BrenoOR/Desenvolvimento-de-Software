import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'

import Link from 'expo-router/link'
import FormField from '@/components/FormField.jsx'
import CustomButton from '@/components/CustomButton.jsx'

import icons from '@/constants/icons'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
  if (!form.email || !form.password) {
    setError("Both fields are required!")
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    setError("Email invalido.")
    return;
  }

  try {
    const response = await fetch('YOUR_BACKEND_URL/sign-in', {
      method: 'POST',
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
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]} start={[0, 0]} end={[1, 1]}>
          <View className='h-full w-full justify-center items-center p-8'>
            <Image source={icons.logo} className='h-8 w-40 mb-8'/>
            <Text className='font-bold text-3xl mb-8 self-start'>
              Entre na sua conta {''}
              <Text className='font-normal'>
                 e explore suas conexões!
              </Text>
            </Text>
            <View className='w-full gap-4 mb-8'>
              <FormField
                  title="Email"
                  value={form.email}
                  handleChangeText={(e: any) => setForm({...form, email: e})}
                  keyboardType="email-address"
                  otherStyle="bg-gray200 opacity-[.40] rounded-2xl border border-gray-700 p-2"

                />
              <FormField
                  title="Senha"
                  value={form.password}
                  handleChangeText={(e: any) => setForm({...form, password: e})}
                  keyboardType="password"
                  otherStyle="bg-gray200 opacity-[.40] rounded-2xl border border-gray-700 p-2"

                />
            </View>
            <Pressable className='w-64 h-20' onPress={handleSubmit}>
              <CustomButton
                text='Entrar'
                linkTo={'/new-connection'}
                color='bg-black'
                textColor='text-white'
              />
            </Pressable>
            <Link href={"/sign-up"} className='text-xl m-3'>
              ou criar uma conta
            </Link>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn