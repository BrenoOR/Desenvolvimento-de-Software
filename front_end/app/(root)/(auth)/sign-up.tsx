import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useSignupStore } from "@/stores/signupStore";
import { useRouter } from "expo-router";

import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import Link from "expo-router/link";
import Logo from "@/components/Logo";

import Toast from "react-native-toast-message";

const SignUp = () => {
  const router = useRouter();
  
  const { username, email, password, setForm, nextStep, submitForm } = useSignupStore();

  const handleSubmit = async () => {
    const success = await submitForm(); 
      if (success){
      nextStep();
      router.push('/exhibited-name') }
    }

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#ffffff", "#fbc7a0", "#fda0ec", "#a36ce6", "#39c0fb"]}
        start={[0, 0]}
        end={[1, 1]}
        className="flex-1"
      >
        <View className="flex-1 w-full justify-start items-center p-8 gap-4">
          <Logo />
          <Text className="font-bold text-3xl">
            Crie sua conta{" "}
            <Text className="font-normal">e explore novas conexões!</Text>
          </Text>
          <View className="w-full gap-4">
            <FormField
              title="Nome"
              value={username}
              handleChangeText={(e: string) => setForm("username", e)}
              keyboardType="default"
              otherStyle="bg-gray200 opacity-[.40] rounded-xl border border-gray-700 p-2"
            />
            <FormField
              title="Email"
              value={email}
              handleChangeText={(e: string) => setForm("email", e)}
              keyboardType="email-address"
              otherStyle="bg-gray200 opacity-[.40] rounded-2xl border border-gray-700 p-2"
            />
            <FormField
              title="Senha"
              value={password}
              handleChangeText={(e: string) => setForm("password", e)}
              keyboardType="default"
              secureTextEntry
              otherStyle="bg-gray200 opacity-[.40] rounded-2xl border border-gray-700 p-2"
            />
          </View>

          <Pressable className="w-64 h-20">
            <CustomButton 
            text="Começar" 
            color="bg-black" 
            textColor="text-white" 
            onPress={handleSubmit}
            />
          </Pressable>

          <Link href={"/sign-in"} className="text-xl">
            Já tenho uma conta
          </Link>
          <Text>*Ao se cadastrar, você concorda com os nossos Termos de Uso e Política de Privacidade.</Text>
        </View>
      </LinearGradient>
      <Toast />
    </SafeAreaView>
  );
};

export default SignUp;
