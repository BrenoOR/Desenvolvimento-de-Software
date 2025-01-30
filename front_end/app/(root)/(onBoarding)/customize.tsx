import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';


const Customize = () => {
  return (
    <SafeAreaView className='h-full'>
      <ScrollView contentContainerClassName='h-screen'>
        <LinearGradient colors={["#1e1d1d", "#39c0fb", "#a36ce6", "#fda0ec", "#fbc7a0"]}  locations={[0.4, 0.6, 0.7, 0.8, 1]}>
          <View className='h-full w-full justify-center items-center p-8'>
              <MaskedView
                  maskElement={
                    <View>
                      <Text className="text-6xl font-black">
                        Personalize
                      </Text>
                    </View>
                  }
                  style={{ width: "100%", height: 50}} 
                >
                  <LinearGradient
                    colors={["#39c0fb", "#a36ce6", "#fda0ec", "#fbc7a0", "#ffffff"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={{ flex: 1 }} 
                  />
                </MaskedView>
                <Text className='text-primary font-normal text-4xl self-start'>
                sua experiência:
                </Text>
                <View className='gap-8 text-left mt-8 w-full'>
                  <Text className='text-primary text-2xl'>
                  Escolha como interagir:{'\n'}guiado ou livre.
                  </Text>
                  <Text className='text-primary text-2xl'>
                  Conecte-se no seu ritmo e explore interesses únicos.
                  </Text>
                </View>
                <TouchableOpacity className="w-64 bg-black rounded-full h-20 justify-center items-center self-center mt-16">
                  <Link href={"/sign-up"}>
                    <Text className="text-2xl font-bold text-white">
                      Começar
                    </Text>
                  </Link>
                </TouchableOpacity>
              <Link href={"/sign-in"} className='text-xl mt-2'>Ou fazer login</Link>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Customize