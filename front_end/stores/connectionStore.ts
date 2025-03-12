import { create } from 'zustand';
import { API_KEY } from '@/apiConfig';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface ConnectionState {
  userHiperfocus: string;
  description: string;
  timing: string;
  connectionType: string; 
  errors: { [key: string]: string };

  setForm: (field: string, value: string) => void;
  setConnectionType: (myType: string) => void;
  prepareConnection: () => Promise<boolean>;
}

export const useConnectionStore = create<ConnectionState>((set, get) => ({
  userHiperfocus: '',
  description: '',
  timing: '',
  connectionType: '', 
  errors: {},

  setForm: (field, value) => set((state) => ({
    ...state,
    [field]: value,
    errors: { ...state.errors, [field]: '' },
  })),

  setConnectionType: (myType) => set((state) => ({
    ...state,
    connectionType: myType, 
  })),

  prepareConnection: async () => {
    const { userHiperfocus, connectionType, description, timing } = get();
    let valid = true;
    let errorMessages: { [key: string]: string } = {};
    
    if (!connectionType) {
      errorMessages.connectionType = 'Selecione um tipo de conexão.';
      valid = false;
    }
    if (!description) {
      errorMessages.description = 'A descrição é obrigatória.';
      valid = false;
    }
    if (!timing) {
      errorMessages.timing = 'O tempo é obrigatório.';
      valid = false;
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
      const payload = { hiperfocus: userHiperfocus, description, timing, connectionType };
      const response = await axios.post(`${API_KEY}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: payload,
      });

      if (response.status === 200) {
        return true;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Erro ao preparar a conexão.',
          position: 'top',
        });
        return false;
      }
    } catch (error: any) {
      console.log('Erro: ' + error)
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error || 'Erro de conexão.',
        position: 'top',
      });
      return false;
    }
  },
}));
