import React, { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import abi from "../abi";
import { EthereumContext } from "../global";

const contractAddress = "0x9DDE5de27904a53767c32fFA462CdBce6F2Faf10";

const Context = createContext<EthereumContext>({
  accessGranted: false,
  providerFound: false,
  loading: true,
  web3: null,
  contract: null,
  account: "",
  requestAccess: () => new Promise((r) => r()),
});

const EthereumProvider: React.FC = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [providerFound, setProviderFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState("");

  const history = useHistory();

  useEffect(() => {
    (async () => {
      let web3: Web3;
      try {
        web3 = new Web3(Web3.givenProvider);
        setWeb3(web3);
      } catch (e) {
        return console.error(
          "No provider was found in your browser. Please, install one. We recommend MetaMask."
        );
      }
      setProviderFound(true);
      try {
        const [accountAddress] = await (web3 as Web3).eth.requestAccounts();
        setAccount(accountAddress);
        setAccessGranted(true);

        const contract = new web3.eth.Contract(abi, contractAddress);
        setContract(contract);
      } catch (e) {
        console.error(
          "You have denied access to our application. In order to use it, please concede acccess."
        );
      }
      setLoading(false);
    })();
  }, []);

  async function requestAccess() {
    try {
      const [address] = await (web3 as Web3).eth.requestAccounts();
      setAccount(address);
      setAccessGranted(true);
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Context.Provider
      value={{
        web3,
        account,
        contract,
        accessGranted,
        providerFound,
        loading,
        requestAccess,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, EthereumProvider };
