import { View, Image } from 'react-native'
import React from 'react'

import icons from '@/constants/icons'

const Logo = () => {
  return (
    <View>
      <Image source={icons.logo} className='h-8 w-40 mb-8'/>
    </View>
  )
}

export default Logo