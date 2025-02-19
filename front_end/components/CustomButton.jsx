import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Link from 'expo-router/link'



const CustomButton = ({text, linkTo, color, textColor}) => {
  return (
    <TouchableOpacity className={`${color} w-full h-full justify-center items-center rounded-full`}>
      <Link href={linkTo}>
        <Text className={`${textColor} text-2xl font-bold`}>
        {text}
        </Text>
      </Link>
    </TouchableOpacity>
  )
}

export default CustomButton