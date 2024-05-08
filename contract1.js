
import React, { useState, useEffect } from 'react'
import Web3 from "web3";


const Web3Contract3 = () => {
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
                            "internalType": "string[]",
                            "name": "_discription",
                            "type": "string[]"
                        }
                    ],
                    "name": "adminselect",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "string",
                            "name": "_desc",
                            "type": "string"
                        }
                    ],
                    "name": "selectedReport",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
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
                            "name": "_ver",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_dis",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "_tst",
                            "type": "string"
                        },
                        {
                            "internalType": "string[]",
                            "name": "_discription",
                            "type": "string[]"
                        },
                        {
                            "internalType": "uint256[]",
                            "name": "_lablestatus",
                            "type": "uint256[]"
                        }
                    ],
                    "name": "submit",
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
                    "name": "AllArray",
                    "outputs": [
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
                            "name": "ver",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "dis",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lablestatus",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "selectionstatus",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "timestamp",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bugtopatch",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
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
                    "name": "AllArray1",
                    "outputs": [
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
                            "name": "ver",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "dis",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "lablestatus",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "selectionstatus",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "timestamp",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "bugtopatch",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "verify",
                    "outputs": [
                        {
                            "components": [
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
                                    "name": "ver",
                                    "type": "string"
                                },
                                {
                                    "internalType": "string",
                                    "name": "dis",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "lablestatus",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "selectionstatus",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "timestamp",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "bugtopatch",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct report.reportpage[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            const Address = "0x643D8579732a822E86999C3b54E96Fa768B7af3d";
            window.web3 = new Web3(window.ethereum);
            window.contract = await new window.web3.eth.Contract(ABI, Address);
            setContract(window.contract);
        };
        connectMetamask();
    }, []);
    return [account, contract];
}
export default Web3Contract3;