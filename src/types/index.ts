export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export interface MessageProps {
  text: string;
  isUser: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (phoneNumber: string) => void;
}

export interface ChatStoreState {
  messages: Message[];
  recipientPhoneNumber: string;
  chatList: string[];
  sendMessage: (text: string) => Promise<void>;
  receiveMessage: () => Promise<void>;
  clearMessages: () => void;
  setRecipientPhoneNumber: (phoneNumber: string) => void;
  addChat: (phoneNumber: string) => void;
  removeChat: (phoneNumber: string) => void;
  updateCredentials: (idInstance: string, apiTokenInstance: string) => void;
  clearAllData: () => void;
}

export interface AuthStoreState {
  idInstance: string;
  apiTokenInstance: string;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  initializeAuth: () => void;
  setCredentials: (
    idInstance: string,
    apiTokenInstance: string,
  ) => Promise<void>;
  logout: () => void;
}
