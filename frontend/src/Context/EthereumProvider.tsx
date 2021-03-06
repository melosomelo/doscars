import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import abi from "../abi";
import { EthereumContext, ContractState } from "../global";
import { EventData } from "web3-eth-contract";
import { Context as ErrorContext } from "./SnackbarProvider";

const contractAddress = "0x71EEe57902d93982DFDe8A7C34b5d0C12B6958dF";

const Context = createContext<EthereumContext>({
  accessGranted: false,
  providerFound: false,
  loading: true,
  web3: null,
  contract: null,
  account: "",
  requestAccess: () => new Promise((r) => r()),
  participate: () => {},
  state: "enlisting",
  enlistMovie: (n, s) => new Promise((r) => r()),
  voteForMovie: (id) => new Promise((r) => r()),
});

const EthereumProvider: React.FC = ({ children }) => {
  const [accessGranted, setAccessGranted] = useState(false);
  const [providerFound, setProviderFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [account, setAccount] = useState("");
  const [state, setState] = useState<ContractState>("enlisting");
  const { setMessage } = useContext(ErrorContext);

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
        setState(await contract.methods.state().call());
        setContract(contract);
      } catch (e) {
        console.error(
          "You have denied access to our application. In order to use it, please concede acccess."
        );
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (contract) {
      contract.events
        .EnlistingOver()
        .on("data", (e: EventData) => setState("voting"));
      contract.events
        .VotingOver()
        .on("data", (e: EventData) => setState("wfw"));
      contract.events
        .WinnerDeclared()
        .on("data", (e: EventData) => setState("over"));
    }
  }, [contract]);

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

  async function participate() {
    switch (state) {
      case "enlisting":
        history.push("/enlist");
        break;
      case "voting":
        history.push("/enlisted");
        break;
      case "wfw":
        history.push("/wfw");
        break;
      default:
        history.push("/over");
        break;
    }
  }

  async function enlistMovie(movieID: number, posterPath: string) {
    try {
      await (contract as Contract).methods
        .enlistMovie(movieID, posterPath)
        .send({ from: account, value: "100000000000000000" });
      setMessage("Movie was enlisted!", "success");
    } catch (e) {
      setMessage(
        "It was not possible to enlist this movie. It maybe have been already enlisted."
      );
    }
  }

  async function voteForMovie(movieID: number) {
    try {
      await (contract as Contract).methods
        .voteForMovie(movieID)
        .send({ from: account, value: "100000000000000000" });
      setMessage("Vote registered!", "success");
    } catch (e) {
      setMessage(
        "It was not possible to register your vote for this movie. Please, try again."
      );
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
        participate,
        state,
        enlistMovie,
        voteForMovie,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, EthereumProvider };
