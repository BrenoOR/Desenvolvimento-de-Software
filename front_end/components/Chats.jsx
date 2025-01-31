import { View, Text, Image } from 'react-native'
import React from 'react'
import Link from 'expo-router/link'

const Chats = ({ picture, lastMessage, chatName, time}) => {
  return (
      <View className='flex-row items-center gap-3 w-full'>
      <Image source={picture} className='h-14 w-14 rounded-full' resizeMode='contain'/>
        <View className='flex-1 ml-4'>
          <View className='flex-row justify-between items-center w-13/14'>
            <Text className='text-sm font-bold text-black'>{chatName}</Text>
            <Text className='text-sm font-normal text-gray-500'>{time}</Text>
          </View>
          <Text numberOfLines={1} className='max-w-32 truncate'>{lastMessage}</Text>
        </View>
    </View>
  )
}

export default Chats