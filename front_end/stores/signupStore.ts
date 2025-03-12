import { create } from 'zustand';
import { API_KEY } from '@/apiConfig';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface SignupState {
  user_id: string;
  username: string;
  nickname: string;
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
  nickname: '',
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
    console.log(get().currentStep)
  },

  prevStep: () => {
    const { currentStep } = get();
    set({ currentStep: currentStep - 1 });
  },

  submitForm: async () => {
    const { user_id, username, nickname, email, pronouns, profile_picture, password, avatar_picture, hiperfocus } = get();
    let valid = true;
    let errorMessages: { [key: string]: string } = {};
    let completed = false;
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    console.log(get().currentStep)

    switch (get().currentStep) {
      case 1:
        if (!username || !email || !password) {
          errorMessages.user_id = 'Preencha todos os campos obrigatórios.';
          valid = false;
        }
        if (email && !isValidEmail(email)) {
          errorMessages.email = 'Digite um e-mail válido.';
          valid = false;
        }
        break;
      case 2:
        if (!nickname) {
          errorMessages.nickname = 'Por favor, insira um nome de usuário.';
          valid = false;
        }
        break;
      case 3:
        if (!profile_picture && !avatar_picture) {
          errorMessages.avatar_picture = 'Adicione uma foto de avatar ou uma foto de perfil.';
          valid = false;
        }
        break;
      case 4:
        if (!hiperfocus) {
          errorMessages.hiperfocus = 'Informe seu hiperfoco.';
          valid = false;
        }
        break;
      case 5:
        if (!pronouns) {
          errorMessages.pronouns = 'Informe seus pronomes.';
          valid = false;
        }
        completed = true
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
      if (completed) {
        const payload = { username, nickname, email, pronouns, profile_picture, avatar_picture, password, hiperfocus };
        console.log(payload)
        const url = `${API_KEY}` + '/users'

        console.log("Getting response from " + url)
        const response = await axios.post(url, payload);
        console.log(response.data)

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
      } else {
          return true;
      }
    } catch (error: any) {
      console.log(error)
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error || 'Erro de conexão.',
        position: 'top',
      });
      return false;
    }
  },
}));
