import React, { createContext, ReactNode, useState } from "react";
import { m } from "../plugins/magic";

type WalletContextProps = {
  currentWalletAddress: string;
  initWallet: () => void;
  disconnect: () => void;
  isWalletConnected: boolean;
  email: string;
  initMagicWallet: (email: string, address: string, meterID: string) => void;
  disconnectMagic: () => void;
  setSigner: Function;
  signer: any;
  meterID: string;
};

type WalletProviderProps = {
  children: ReactNode;
};

export const WalletContext = createContext({} as WalletContextProps);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [email, setEmail] = useState<string>("");
  const [meterID, setMeterID] = useState<string>("");

  const initMagicWallet = async (
    email: string,
    address: string,
    meterId: string
  ) => {
    setEmail(email);
    setIsWalletConnected(true);
    setCurrentWalletAddress(address);
    setMeterID(meterId);
  };

  const disconnectMagic = async () => {
    m.user.logout();
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
  };

  const initWallet = async () => {};

  const disconnect = async () => {
    setIsWalletConnected(false);
    setCurrentWalletAddress("");
  };

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        currentWalletAddress,
        initWallet,
        disconnect,
        email,
        initMagicWallet,
        disconnectMagic,
        setSigner,
        signer,
        meterID,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
