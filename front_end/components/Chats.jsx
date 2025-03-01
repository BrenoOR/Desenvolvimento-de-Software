import { View, Text, Image } from 'react-native'
import React from 'react'
import Link from 'expo-router/link'

const Chats = ({ picture, lastMessage, chatName, time, linkTo}) => {
  return (
      <Link href={linkTo} className='flex items-center'>
      <View className='h-24 flex-row'>
      <Image source={picture} className='h-16 w-16 rounded-full' resizeMode='contain'/>
        <View className='flex-1 ml-4'>
          <View className='flex-row justify-between items-center w-13/14'>
            <Text className='text-sm font-bold text-black'>{chatName}</Text>
            <Text className='text-sm font-normal text-gray-500'>{time}</Text>
          </View>
          <Text numberOfLines={1} className='max-w-32 truncate'>{lastMessage}</Text>
        </View>
      </View>
    </Link>
  )
}

export default Chats