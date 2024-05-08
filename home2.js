import React, { useState, useEffect } from 'react'
import Web3Contract2 from './Web3Contract1';

const AdminTrackingPatches = () => {
    const Web3 = Web3Contract2();
    const contract2 = Web3[1];
    const address = Web3[0];
    const [dataArray, setdataArray] = useState([])
    const getdata = () => {
        try {
            contract2.methods.getdetails().call().then((result) => {
                setdataArray(result);
                console.log(result);
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    const setTime = (timestamp) => {
        const milliseconds = timestamp * 1000;
        const dateObject = new Date(milliseconds);
        const formattedTime = dateObject.toLocaleString();
        return formattedTime;
    }

    useEffect(() => {
        getdata();
    }, [contract2])
    return (
        <div>
            <br /><br />
        </div>
    )
}

// export default AdminTrackingPatches;