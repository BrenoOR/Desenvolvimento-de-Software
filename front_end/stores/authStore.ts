import { create } from "zustand";
import { API_KEY } from '@/apiConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Toast from 'react-native-toast-message';

interface AuthState {
  isAuthenticated: boolean;
  email: string;
  password: string;
  errors: { [key: string]: string };

  setForm: (field: string, value: string) => void;
  login: () => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  email: "",
  password: "",
  errors: {},

  setForm: (field, value) => set((state) => ({
    ...state,
    [field]: value,
    errors: { ...state.errors, [field]: "" },
  })),

  login: async () => {
    const { email, password } = get();
    let errors: { [key: string]: string } = {};

    if (!email.includes("@")) {
      errors.email = "E-mail inválido.";
    }

    if (Object.keys(errors).length > 0) {
      set({ errors });
      Object.values(errors).forEach((msg) =>
        Toast.show({ type: "error", text1: msg })
      );
      return false;
    }

    try {
      const url = `${API_KEY}` + '/auth/login'
      const headers = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
      const body = { 'grant_type': 'password', 'username': email, 'password': password }
      const response = await axios.post(url, body, headers);
      console.log(response.status)
      console.log(response.data)

      if (response.status !== 200) throw new Error("Credenciais inválidas");

      const { token } = response.data.message.access_token;
      await AsyncStorage.setItem("token", token);

      set({ isAuthenticated: true });

      Toast.show({ type: "success", text1: "Login bem-sucedido!" });

      return true;
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: error.response?.data?.error || "Verifique suas credenciais.",
      });

      return false;
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({ isAuthenticated: false, email: "", password: "" });

    Toast.show({
      type: "success",
      text1: "Logout realizado",
      text2: "Você saiu da sua conta com sucesso.",
    });
  },
}));
