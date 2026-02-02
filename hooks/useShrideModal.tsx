"use client";

import { createContext, useState, useContext, useEffect } from "react";

interface ModalContextType {
  showModal: (content: any) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Modal Component
const Modal = ({ children }: any) => {
  return (
    <div className="w-full relative">
      <div className="modal-wrapper z-30">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export const ShrideModalProvider = ({ children }: any) => {
  const [modalContent, setModalContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      document.body.style.cssText =
        ";overflow: hidden;height:100%; width: 100%;";
    } else {
      document.body.style.cssText = "";
    }
  }, [isVisible]);

  const showModal = (content: any) => {
    setModalContent(content);
    setIsVisible(true);
  };

  const hideModal = () => {
    setModalContent(null);
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, hideModal}}
    >
      {children}
      {isVisible && <Modal>{modalContent}</Modal>}
    </ModalContext.Provider>
  );
};

// export const useShrideModal = () => useContext(ModalContext);

export function useShrideModal(){
  const context = useContext(ModalContext);

  if(context == undefined){
    throw new Error("useShrideModal must be inside ShrideModalProvider");
  }

  return context;
}