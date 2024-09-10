import React, { useEffect, useState } from "react";
import { Button as FBButton, Select, Tabs } from "flowbite-react";
// import { useNavigate, Link } from 'react-router-dom';
// import { HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as NUIButton, useDisclosure, Select as SelectNUI, SelectItem as SelectItemNUI, Input } from "@nextui-org/react";

/*
=== :OBJECTS ITEMS: ===
customerId : ,
billDetails: [
    product: 
        id: 
    qty: (int)
]
...,

====]NOTES[====
1. Make GET bill based on ID
*/

export default function Bills() {
    const [selectedBill, setSelectedBill] = useState(null);
    const [bills, setBills] = useState({ data: [] });
    const bill = bills.data[0];

    // Auth Token
    const authToken = localStorage.getItem("authToken");
    const [isEditable, setIsEditable] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [isOpen, setIsOpen] = useState(false);

    // Modal types differentiator
    const [currentModal, setCurrentModal] = useState(null);
    const MODAL_TYPES = {
        BILL_DETAIL : 'BILL_DETAIL',
        BILL_DETAIL_GET : 'BILL_DETAIL_GET',
        CREATE_BILL : 'CREATE_BILL',
    };

    // GET
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8010/proxy/api/v1/bills/`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                });
                setBills(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
        console.log(bills);
    }, [authToken]);

    // (GET) Open modal for bill detail
    const openModal = async (billId) => {
        try {
            // Fetch the bill data based on the billId
            const response = await axios.get(`http://localhost:8010/proxy/api/v1/bills/${billId}`);
            setSelectedBill(response.data);
            setIsOpen(true);
        } 
        catch (error) {
            console.error(error);
            console.log(error)
        }
    };

    // (NOT GET) open modal for detail
    const openModal2 = (modalType) => {
        setCurrentModal(modalType);
        onOpen();
    }

    const closeModal2 = () => {
        setCurrentModal(null);
        onClose();
    }

    // Close modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedBill(null);
    };
    
    return (
    <>  
        <div className="flex flex-row justify-between">
            <h1 className="font-bold place-content-center text-xl ">All Transactions</h1>
            <FBButton onClick={() => openModal2(MODAL_TYPES.CREATE_BILL)} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center" >Create Bill</FBButton> {/* It appears the API is bugged since the postman itself couldnt create a new bill */}
        </div>
        <div for="horizontal separator line" className="border border-gray-500 opacity-50 my-0 mb-6 mt-6"></div>

        <div className="grid grid-cols-6 gap-4 mb-4 justify-items-center font-bold">
            <label className="truncate w-full max-w-xs text-center">Bill Date</label>
            <label className="truncate w-full max-w-xs text-center">Customer</label>
            <label className="truncate w-full max-w-xs text-center">Quantity (kg)</label>
            <label className="truncate w-full max-w-xs text-center">Package Price (Solaris)</label>
            <label className="truncate w-full max-w-xs text-center">Total Price (Solaris)</label>
            {/* <label className="truncate w-full max-w-xs text-center">See details</label> */}
        </div>
        {bill ? (
        <div className="">
            <div className="grid grid-cols-6 gap-4 justify-items-center items-center place-content-center">
                <p className="truncate w-full max-w-xs text-center">{(bill.billDate).slice(0,10)}</p> {/* TBF, i could do tolocaledate() method but couldnt be bothered, TODO future */}
                <p className="truncate w-full max-w-xs text-center">{bill.customer.name}</p>
                <p className="truncate w-full max-w-xs text-center">{bill.billDetails[0].qty}</p>
                <p className="truncate w-full max-w-xs text-center">{bill.billDetails[0].price}</p>
                <p className="truncate w-full max-w-xs text-center">{(bill.billDetails[0].price) * (bill.billDetails[0].qty)}</p>
                {/* <NUIButton XXXonPress={() => openModal(bill.id)} onPress={onOpen} className="py-0 px-4 border border-gray-400 rounded-xl">Details</NUIButton> */}
                <NUIButton color="default" className="rounded-md" onClick={() => openModal2(MODAL_TYPES.BILL_DETAIL)}>Detail</NUIButton>
            </div>
        </div>
        ) : (
            <p>No transaction yet..</p>
        )}

        {/* See bill details modal , NOT GET*/}
        {currentModal === MODAL_TYPES.BILL_DETAIL && (
        <Modal isOpen={isOpen} onClose={closeModal2} className="dark:bg-slate-800 bg-white">
            <ModalContent>
                <ModalHeader className="">
                    Bill detail
                </ModalHeader>

                <ModalBody>
                    <div>
                        <p>Bill ID: {bill.id}</p>
                        <p>Bill Date: {bill.billDate.slice(0,10)}</p>
                        <p>Customer ID: {bill.customer.id}</p>
                        <p>Customer Name: {bill.customer.name}</p>
                        <p>Customer Phone: {bill.customer.phoneNumber}</p>
                        <p>Customer Address: {bill.customer.address}</p>
                        <p>Product Price: {bill.billDetails[0].price}</p>
                        <p>Quantity: {bill.billDetails[0].qty}</p>
                        <p>Total Price: {bill.billDetails[0].price * bill.billDetails[0].qty}</p>            
                    </div>
                </ModalBody>

                <ModalFooter>
                    <NUIButton onClick={closeModal2}>Close</NUIButton>
                </ModalFooter>

            </ModalContent>
        </Modal>
        )}

        {/* Create Bill*/}
        {currentModal === MODAL_TYPES.CREATE_BILL && (
        <Modal isOpen={isOpen} onClose={closeModal2}>
            {/* <form onSubmit={handleSubmit}> */}
            <ModalContent>
                <ModalHeader className="">
                    Create Bill
                </ModalHeader>

                <ModalBody>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="text"
                    name="name"
                    value=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Customer Name
                    </label>
                </div>
                {/* <SelectNUI
                    items={bill.customer}
                    label="Customer Name"
                    placeholder="Select Customer"
                >
                    {(bill) => <SelectItemNUI key={bill.id}>
                        {bill.customer}
                    </SelectItemNUI>}
                </SelectNUI> */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="text"
                    name="product"
                    value=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product
                    </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                    type="number"
                    name="quantity"
                    value=""
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Quantity
                    </label>
                </div>
                </ModalBody>

                <ModalFooter>
                    <NUIButton type="submit" onClick={closeModal2}>Submit</NUIButton>
                </ModalFooter>

            </ModalContent>
            {/* </form> */}
        </Modal>
        )}
    </>
  );
}
