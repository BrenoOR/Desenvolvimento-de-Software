import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import icons from '@/constants/icons'
import { Link } from 'expo-router'
import FormField from '@/components/FormField.jsx'

const Hiperfocus = () => {
  const [form, setForm] = useState({
      hiperfocus: ''
    })
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
          <View className='h-full w-full justify-start items-center p-8'>
            <View className='mb-24'>
            <Image source={icons.logo} className='h-8 w-40 mb-16 self-center'/>
            <Text className='text-7xl font-bold'>Qual seu hiperfoco?</Text>
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
          <TouchableOpacity className="w-3/4 bg-primary rounded-full h-24 justify-center items-center mt-40">
            <Link href={"/choose-topics"}>
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

export default Hiperfocus