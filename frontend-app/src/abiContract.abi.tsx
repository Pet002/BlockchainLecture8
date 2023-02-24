export const abi: any = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "hash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "time",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "owner",
        type: "string",
      },
    ],
    name: "NameAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "purchaseError",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "character",
        type: "string",
      },
    ],
    name: "checkCharacter",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwnerCharacter",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "owner",
            type: "string",
          },
          {
            internalType: "string",
            name: "character",
            type: "string",
          },
          {
            internalType: "string",
            name: "time",
            type: "string",
          },
        ],
        internalType: "struct ProofOfCharacter.Owner[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "character",
        type: "string",
      },
      {
        internalType: "string",
        name: "owner",
        type: "string",
      },
      {
        internalType: "string",
        name: "time",
        type: "string",
      },
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
