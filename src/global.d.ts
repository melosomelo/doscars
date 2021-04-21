import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export type ContractState = "enlisting" | "voting" | "wfw" | "over";
export interface EthereumContext {
  web3: Web3 | null;
  account: string;
  contract: Contract | null;
  accessGranted: boolean;
  loading: boolean;
  providerFound: boolean;
  state: ContractState;
  requestAccess: () => Promise<void>;
  participate: () => void;
}
