import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export interface EthereumContext {
  web3: Web3 | null;
  account: string;
  contract: Contract | null;
  accessGranted: boolean;
  loading: boolean;
  providerFound: boolean;
  requestAccess: () => Promise<void>;
}
