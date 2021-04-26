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
  enlistMovie: (number, string) => Promise<void>;
}

type variant = "error" | "success";

export interface SnackbarContext {
  hasMessage: boolean;
  value: string;
  setMessage: (string: string, variant?: variant) => void;
}

export interface Movie {
  id: number;
  overview: string;
  title: string;
  poster_path: string;
}

// there are a lot more of fields, but these are the ones that
// matter here
export interface MovieDetailed extends Movie {
  genres: {
    id: number;
    name: string;
  }[];
  release_date: string; //2020-01-01
  credits: {
    crew: {
      name: string;
      job: string;
    }[];
  };
}

export interface SearchQueryResult {
  page: number;
  total_pages: number;
  total_results: number;
  results: Movie[];
}
