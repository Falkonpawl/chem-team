import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  modalSource: string;
  modalChoice: string;
  openModal: (source?: string, choice?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSource, setModalSource] = useState('');
  const [modalChoice, setModalChoice] = useState('');

  const openModal = (source: string = 'Общая заявка', choice: string = '') => {
    setModalSource(source);
    setModalChoice(choice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalSource('');
    setModalChoice('');
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, modalSource, modalChoice, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
