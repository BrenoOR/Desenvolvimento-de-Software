import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

import icons from '@/constants/icons'
import FormField from '@/components/FormField';
import Checkbox from 'expo-checkbox';


const ExhibitedName = () => {
  const [form, setForm] = useState({
      username: ''
    })

  const [isChecked, setIsChecked] = useState(false)
  return (
  <SafeAreaView className='h-full'>
    <ScrollView contentContainerClassName='h-full'>
      <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
        <View className='h-full w-full justify-start items-center p-8'>
          <Image source={icons.logo} className='h-8 w-40 mb-8'/>
          <Text className='text-5xl font-bold'>
          Personalize sua experiência no Prisma! {"\n"}
          <Text className='text-4xl font-normal'>
          Escolha como quer ser visto e compartilhe seus interesses.
          </Text>
          </Text>
          <View className='h-60 w-full gap-4'>
            <Text className='text-3xl font-bold self-start mt-16'>
              Nome de exibição
            </Text>
            <FormField
              title="Escolha algo legal"
              value={form.username}
              handleChangeText={(e: any) => setForm({...form, username: e})}
              keyboardType="username"
              otherStyle="bg-gray200 opacity-[.75] rounded-2xl border border-gray-700"
            />
          </View>
          <View className='w-full flex flex-row gap-3 items-center justify-start'>
            <Checkbox className='justify-self-start h-10 w-10' value={isChecked} onValueChange={setIsChecked} color={"black"}/>
            <Text className='text-2xl font-normal'>
            Quero permanecer anônimo.
            </Text>
          </View>
          <Text className='text-sm self-start'>
            *Seu nome e foto não serão visíveis para outros usuários no modo anônimo.
          </Text>
          <TouchableOpacity className="w-3/4 bg-primary rounded-full h-24 justify-center items-center mt-24">
            <Link href={isChecked ? "/pick-avatar" : "/add-picture"}>
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

export default ExhibitedName