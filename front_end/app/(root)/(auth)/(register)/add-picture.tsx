import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { useSignupStore } from "@/stores/signupStore";

import icons from '@/constants/icons'
import Logo from "@/components/Logo"
import Link from 'expo-router/link'
import CustomButton from '@/components/CustomButton'

import * as ImagePicker from 'expo-image-picker';
import Toast from "react-native-toast-message"

const AddPicture = () => {
  const router = useRouter();
  const { profile_picture, setForm, nextStep, submitForm } = useSignupStore();
  
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setForm("profile_picture", result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    const success = await submitForm(); 
      if (success){
      nextStep();
      router.push('/hiperfocus') }
    }
    return (
      <SafeAreaView className="flex-1">
        <LinearGradient 
          colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb", "#201c1b"]}  
          locations={[0.65, 0.68, 0.71, 0.74, 0.77, 0.80]} 
          className="flex-1"
        >
          <View className="flex-1 w-full justify-start items-center px-8 pt-8">
            <Logo />
            <Text className="font-bold text-4xl text-center my-6">Que tal adicionar uma foto?</Text>
  
            <TouchableOpacity onPress={pickImageAsync} className="my-6">
              {profile_picture ? (
                <Image source={{ uri: profile_picture }} className="h-60 w-60 rounded-full" />
              ) : (
                <Image source={icons.image} className="h-60 w-60" />
              )}
            </TouchableOpacity>
  
            <View className="h-40 justify-end items-center">
              <Pressable 
              className="w-64 h-20" >
                <CustomButton 
                text='Próximo' 
                color='bg-primary' 
                textColor='text-black' 
                onPress={handleSubmit}
                />
              </Pressable>
              <Link className='text-primary text-lg font-normal mt-2' href={'/pick-avatar'}>
                Ou escolher um avatar
              </Link>
            </View>
            <Toast/>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  };
  
  export default AddPicture;