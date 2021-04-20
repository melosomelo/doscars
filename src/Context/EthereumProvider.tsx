import React, { createContext, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import abi from "../abi";

const contractAddress = "0x9DDE5de27904a53767c32fFA462CdBce6F2Faf10";

const Context = createContext<EthereumContext | null>(null);

const EthereumProvider: React.FC = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [providerFound, setProviderFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dapp, setDapp] = useState<Dapp | null>(null);

  useEffect(() => {
    (async () => {
      let web3;
      try {
        web3 = new Web3(Web3.givenProvider);
      } catch (e) {
        return console.error(
          "No provider was found in your browser. Please, install one. We recommend MetaMask."
        );
      }
      setProviderFound(true);
      try {
        const [accountAddress] = await (web3 as Web3).eth.requestAccounts();
        const contract = new web3.eth.Contract(abi, contractAddress);
        setAccessGranted(true);
        setDapp({ web3, account: accountAddress, contract });
      } catch (e) {
        console.error(
          "You have denied access to our application. In order to use it, please concede acccess."
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Context.Provider value={{ dapp, accessGranted, providerFound, loading }}>
      {children}
    </Context.Provider>
  );
};

export { Context, EthereumProvider };
