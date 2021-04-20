import { AbiItem } from "web3-utils";

const abi: AbiItem[] = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EnlistingOver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "movieID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "enlister",
        type: "address",
      },
    ],
    name: "MovieEnlisted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "movieID",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "Vote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "VotingOver",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "movieID",
        type: "uint256",
      },
    ],
    name: "WinnerDeclared",
    type: "event",
  },
  {
    inputs: [],
    name: "declareWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "movieID",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "posterPath",
        type: "string",
      },
    ],
    name: "enlistMovie",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "finishEnlisting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "finishVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMovies",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "movies",
    outputs: [
      {
        internalType: "uint256",
        name: "votes",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "enlister",
        type: "address",
      },
      {
        internalType: "string",
        name: "posterPath",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "state",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "movieID",
        type: "uint256",
      },
    ],
    name: "voteForMovie",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export default abi;
