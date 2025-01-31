import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import Link from 'expo-router/link'
import FormField from '@/components/FormField.jsx'


const SignIn = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

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
            <TouchableOpacity className="w-64 bg-black rounded-full h-20 justify-center items-center">
              <Link href={"/new-connection"}>
                <Text className="text-2xl font-bold text-white">
                  Entrar
                </Text>
              </Link>
            </TouchableOpacity>
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