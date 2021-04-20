interface Dapp {
  web3: Web3;
  account: string;
  contract: Contract;
}

interface EthereumContext {
  dapp: Dapp | null;
  accessGranted: boolean;
  loading: boolean;
  providerFound: boolean;
}
