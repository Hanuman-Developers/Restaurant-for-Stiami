import React, { useState, useContext } from "react";

const VerticalNavContext = React.createContext();

const VerticalNavProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <VerticalNavProvider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </VerticalNavProvider>
  );
};

export const useNavGlobalContext = () => {
  return useContext(VerticalNavContext);
};

export { VerticalNavContext, VerticalNavProvider };
