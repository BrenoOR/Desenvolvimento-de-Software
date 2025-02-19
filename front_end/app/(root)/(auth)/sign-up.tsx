import { View, Text, ScrollView, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { UserProvider, useUser } from '@/components/UserContext'
import React, { useState, createContext, useContext } from 'react'

import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import Link from "expo-router/link"
import Logo from "@/components/Logo"


const SignUp = () => {
  const { setUserId } = useUser()
  const [form, setForm] = useState({
    user_id: '',
    email: '',
    password: '',
    hiperfocus: ''
  })

  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')

    if (!form.user_id || !form.email || !form.password) {
      setError('Preencha todos os campos.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      setError('Email invalido.')
      return
    }
    try {
      const response = await fetch('localhost:8000/local/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Credenciais:', data)
        setUserId(form.user_id)
      } else {
        const data = await response.json()
        setError(data.error || 'Algo deu errado.')
      }
    } catch (err) {
      setError('Erro de conexão, por favor tente novamente.')
    }

  }
  return (
    <SafeAreaView className='flex-1'>
        <LinearGradient 
        colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]} 
        start={[0, 0]} 
        end={[1, 1]}
        className="flex-1"
        >
          <View className='flex-1 w-full justify-start items-center p-8 gap-4'>
            <Logo/>
            <Text className='font-bold text-3xl'>
              Crie sua conta {''}
              <Text className='font-normal'>
                 e explore novas conexões!
              </Text>
            </Text>
            <View className='w-full gap-4'>
              <FormField
                title="Nome"
                value={form.user_id}
                handleChangeText={(e: any) => setForm({...form, user_id: e})}
                keyboardType="name"
                otherStyle="bg-gray200 opacity-[.40] rounded-xl border border-gray-700 p-2"
              />
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
                text='Começar'
                linkTo={'/exhibited-name'}
                color='bg-black'
                textColor='text-white'
              />
            </Pressable>
            <Link href={"/sign-in"} className='text-xl'>
              Já tenho uma conta
            </Link>
            <Text>
            *Ao se cadastrar, você concorda com os nossos Termos de Uso e Política de Privacidade.
            </Text>
          </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

export default SignUp