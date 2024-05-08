import React, { useState, useEffect } from 'react'
import Web3 from "web3";


const Web3Contract2 = () => {
    const { ethereum } = window;
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    useEffect(() => {
        const connectMetamask = async () => {
            if (window.ethereum !== "undefined") {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);
            }
            const ABI = [
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patchname",
                            "type": "string"
                        }
                    ],
                    "name": "Deployed",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patchname",
                            "type": "string"
                        }
                    ],
                    "name": "findandreply",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patchname",
                            "type": "string"
                        }
                    ],
                    "name": "findandreplynotverified",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_patchname",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_os",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_app",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_version",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "_file",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string",
                            "name": "_dis",
                            "type": "string"
                        }
                    ],
                    "name": "registered",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "data",
                    "outputs": [
                        {
                            "internalType": "string",
                            "name": "patchname",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "os",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "app",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "version",
                            "type": "string"
                        },
                        {
                            "internalType": "bytes",
                            "name": "file",
                            "type": "bytes"
                        },
                        {
                            "internalType": "string",
                            "name": "dis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "verificationstatus",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "deploymentstatus",
                            "type": "string"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "show",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "string",
                                    "name": "patchname",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "os",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "app",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "version",
                                    "type": "string"
                                },
                                {
                                    "internalType": "bytes",
                                    "name": "file",
                                    "type": "bytes"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dis",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "verificationstatus",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "deploymentstatus",
                                    "type": "string"
                                }
                            ],
                            "internalType": "struct register.registerpage[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            const Address = "put your deployed address here";
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            setContract(window.contract);
        };
        connectMetamask();
    }, []);
    return [account, contract];
}
export default Web3Contract2;