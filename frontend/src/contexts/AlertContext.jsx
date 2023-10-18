import { createContext, useContext, useEffect, useState } from 'react';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert debe ser usado dentro de un AlertProvider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
  const defaultValues = {
    show: false,
    status: '',
    title: '',
    message: '',
    timeOff:3000
  }
  const [alertConfig, setAlertInternalConfig] = useState(defaultValues);

  const setAlertConfig= (config) => {
    setAlertInternalConfig({ ...alertConfig, ...config });
  }

  useEffect(() => {
    if (alertConfig.show) {
      const timeout = setTimeout(() => {
        setAlertInternalConfig(defaultValues);
      }, alertConfig.timeOff);

      return () => {
        clearTimeout(timeout);
      };
    }
  },[alertConfig])
  
  return (
    <AlertContext.Provider value={{ setAlertConfig, alertConfig }}>
      {children}
    </AlertContext.Provider>
  );
};
