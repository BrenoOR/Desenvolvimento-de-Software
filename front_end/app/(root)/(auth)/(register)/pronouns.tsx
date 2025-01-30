import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';

import icons from '@/constants/icons'
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import FormField from '@/components/FormField';

const MAX_PRONOUNS = 1

const Pronouns = () => {
  const [selectPronouns, setSelectPronouns] = useState<string[]>([])
  const pronouns = [
    "Ela/dela",
    "Ele/dele",
    "Não-binário"
  ]
      
  const togglepronoun = (pronoun: string) => {
    selectPronouns.includes(pronoun)
      ? setSelectPronouns(selectPronouns.filter((item) => item !== pronoun))
      : selectPronouns.length < MAX_PRONOUNS &&
        setSelectPronouns([...selectPronouns, pronoun])}
  
  const [form, setForm] = useState(
    {date: ''}
  )
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <LinearGradient colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]}>
          <View className='h-full w-full justify-start items-center p-8'>
             <Image source={icons.logo} className='h-8 w-40 mb-8'/>
             <Text className='text-7xl font-bold mb-4'>Quais seus pronomes?</Text>
             <View className='h-24'>
             <ScrollView horizontal={true} scrollEnabled={true}>
                <View className='flex-row items-baseline w-screen'>
                  
                {pronouns.map((myPronoun, index) => (
                  
                  <TouchableOpacity className='m-2 border border-gray-300 rounded-3xl p-3'
                    key={index}
                    onPress={() => togglepronoun(myPronoun)}
                    style={{
                    backgroundColor: selectPronouns.includes(myPronoun) ? '#DFF5FF' : '#f3f3f3'
                    }}
                    
                  >
                    <Text className='text-2xl'>{myPronoun}</Text>
              </TouchableOpacity>
              ))}
              </View>
              </ScrollView>
             </View>
             <View className='w-screen mx-8 p-8'>
             <Text className='text-4xl font-bold mb-4 self-start p-2'>Data de nascimento</Text>
              <FormField
              title={"DD/MM/YYYY"}
              value={form.date}
              handleChangeText={(e: any) => setForm({...form, date: e})}
              keyboardType="date"
              otherStyle="bg-gray200 opacity-[.75] rounded-2xl border border-gray-700"
              />
             </View>
              <TouchableOpacity className="w-3/4 bg-primary rounded-full h-24 justify-center items-center mt-48">
                <Link href={"/home"}>
                  <Text className="text-3xl font-bold text-black">
                    Concluir
                  </Text>
                </Link>
              </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
)}

export default Pronouns