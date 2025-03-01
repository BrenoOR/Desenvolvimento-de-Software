import { create } from 'zustand';
import { API_KEY } from '@/apiConfig';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface SignupState {
  user_id: string;
  username: string;
  email: string;
  pronouns: string;
  profile_picture?: string | null;
  avatar_picture?: string | null;
  password: string;
  hiperfocus: string;

  currentStep: number;
  errors: { [key: string]: string };

  setForm: (field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  submitForm: () => Promise<boolean>;
}

export const useSignupStore = create<SignupState>((set, get) => ({
  user_id: '',
  username: '',
  email: '',
  pronouns: '',
  profile_picture: '',
  avatar_picture: '',
  password: '',
  hiperfocus: '',
  currentStep: 1,
  errors: {},

  setForm: (field, value) => set((state) => ({
    ...state,
    [field]: value,
    errors: { ...state.errors, [field]: '' }, 
  })),

  nextStep: () => {
    const { currentStep } = get();
    set({ currentStep: currentStep + 1 });
  },

  prevStep: () => {
    const { currentStep } = get();
    set({ currentStep: currentStep - 1 });
  },

  submitForm: async () => {
    const { user_id, username, email, pronouns, profile_picture, password, avatar_picture, hiperfocus } = get();
    let valid = true;
    let errorMessages: { [key: string]: string } = {};
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    switch (get().currentStep) {
      case 1:
        if (!user_id || !email || !password) {
          errorMessages.user_id = 'Preencha todos os campos obrigatórios.';
          valid = false;
        }
        if (email && !isValidEmail(email)) {
          errorMessages.email = 'Digite um e-mail válido.';
          valid = false;
        }
        break;
      case 2:
        if (!username) {
          errorMessages.username = 'Por favor, insira um nome de usuário.';
          valid = false;
        }
        break;
      case 4:
        if (!profile_picture && !avatar_picture) {
          errorMessages.avatar_picture = 'Adicione uma foto de avatar ou uma foto de perfil.';
          valid = false;
        }
        break;
      case 5:
        if (!hiperfocus) {
          errorMessages.hiperfocus = 'Informe seu hiperfoco.';
          valid = false;
        }
        break;
      case 6:
        if (!pronouns) {
          errorMessages.pronouns = 'Informe seus pronomes.';
          valid = false;
        }
        break;
      default:
        return false;
    }

    if (!valid) {
      for (const key in errorMessages) {
        Toast.show({
          type: 'error',
          text1: errorMessages[key],
          position: 'top',
        });
      }
      set({ errors: errorMessages });
      return false;
    }

    try {
      const payload = { user_id, username, email, pronouns, profile_picture, avatar_picture, password, hiperfocus };
      const response = await axios.post(`${API_KEY}`, payload);

      if (response.status === 200) {
        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado com sucesso!',
          position: 'top',
        });
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao finalizar cadastro.',
          position: 'top',
        });
        return false;
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error || 'Erro de conexão.',
        position: 'top',
      });
      return false;
    }
  },
}));
