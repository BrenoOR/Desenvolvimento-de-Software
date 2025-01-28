import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'


const FormField = ({title, value, handleChangeText, keyboardType, otherStyle, ...props}) => {
    
    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className={`${otherStyle}`}>
            <TextInput 
                className='text-black text-xl font-normal m-4' 
                value={value} 
                placeholder={title} 
                placeholderTextColor="gray" 
                onChangeText={handleChangeText}
                secureTextEntry={keyboardType === 'password' && !showPassword}
            />
        </View>
    )
}


export default FormField