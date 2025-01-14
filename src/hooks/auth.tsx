import React, {createContext, useContext, useState} from 'react';

interface IAuthContext {
  logged: boolean;

  signIn(email: string, password: string): void;

  signOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC = ({children}) => {
  const [logged, setLogged] = useState<boolean>(() => {
    const isLogged = localStorage.getItem('@my-wallet:logged');

    return !!isLogged;
  });

  const signIn = (email: string, password: string) => {
    if (email === 'admin@email.com' && password === '123') {
      localStorage.setItem('@my-wallet:logged', 'true');
      setLogged(true);
    } else {
      alert('email is admin@email.com and password is 123!');
    }
  }

  const signOut = () => {
    localStorage.removeItem('@my-wallet:logged');
    setLogged(false);
  }

  return (
    <AuthContext.Provider value={{logged, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export {AuthProvider, useAuth};
