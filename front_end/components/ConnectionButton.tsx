import { View, Text, Image } from 'react-native'
import React from 'react'
import Link from "expo-router/link"
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native'
import { useConnectionStore } from '@/stores/connectionStore'

const ConnectionButton = ({textH1, textH3, icon, linkTo, type}: any) => {
  const { setConnectionType } = useConnectionStore()
  setConnectionType(type)
  return (
    <View className='h-24 w-full rounded-2xl border border-gray-400 overflow-hidden items-left mt-4'>
    <LinearGradient 
    colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]} 
    start={[1,1]} 
    end={[0,0]} 
    className='flex-1'>
        <TouchableOpacity className='justify-center items-left'>
        <Link href={linkTo}>
        <View className='flex-row p-4 justify-between w-full'>
            <Text className='text-2xl font-bold'>
                {textH1}
                {'\n'}
            <Text className='text-lg font-normal'>
                {textH3}
            </Text>
            </Text>
            <Image source={icon} className='h-12 w-12' resizeMode='contain'/>
        </View>
        </Link>
        </TouchableOpacity> 
    </LinearGradient>
    </View>
  )
}

export default ConnectionButton