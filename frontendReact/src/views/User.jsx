import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Button as FBButton, Select, Tabs } from "flowbite-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button as NUIButton, useDisclosure, Input } from "@nextui-org/react";
import axios from 'axios';

/*
=== :OBJECTS ITEMS: ===
id : auto build,
customer name : ,
phone_number: (in str), 
address: ,
...,

====]NOTES[====
*/

export default function User() {
  const [users, setUsers] = useState([]); // Store the list of users
  const [userData, setUserData] = useState({
    name: '',
    phone_number: '',
    address: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  // Auth Token
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // GET lists
  const getData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/get/customers`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUsers(response.data.data);
    } catch (error) {
      alert("Fetching error: " + error.message);
    }
  };

  // POST (add user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://127.0.0.1:8000/post/customer`, userData, {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const newUser = response.data.data;
      setUsers([...users, newUser]);
      setUserData({
        name: "",
        phone_number: "",
        address: "",
      });
    } catch (error) {
      console.error("POST error:", error);
      alert("POST error: " + error.message);
    }
    onClose(); // Close the modal
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mb-4">
        <p className="font-bold place-content-center text-xl">Customer list</p>
        <FBButton onClick={onOpen} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center" >Register User</FBButton>
      </div>

      <div className="border border-gray-500 opacity-50 my-0 mb-6"></div>
      <ol className="grid grid-cols-4 gap-4 mb-4 justify-items-center font-bold">
        <li> Name</li>
        <li> Address</li>
        <li> Phone Number</li>
        <li> User Details</li>
      </ol>

      {/* Show users list with conditional rendering */}
      <ol className="">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="grid grid-cols-4 gap-4 mb-4 justify-items-center items-center place-content-center">
              <p>{user.name}</p>
              <p>{user.address}</p>
              <p>{user.phone_number}</p>
              <Link to={`/user/${user.id}`}><NUIButton color="default" className="rounded-md" >Detail</NUIButton></Link>
            </li>
          ))
        ) : (
          <li>No users available</li>
        )}
      </ol>

      {/* Register User */}
      <Modal isOpen={isOpen} onClose={onClose} className="dark:bg-slate-800 bg-white dark:text-white text-black" >
        <form onSubmit={handleSubmit}>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1 dark:text-white text-black">
              Register New Customer
            </ModalHeader>

            <ModalBody>
              <div className="relative z-0 w-full mb-5 group dark:text-white text-black">
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm dark:text-gray-100 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Customer Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  name="phone_number"
                  type="text"
                  value={userData.phone_number}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm dark:text-gray-100 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Customer Phone Number
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  name="address"
                  type="text"
                  value={userData.address}
                  onChange={handleChange}
                  className="block py-2.5 px-0 w-full text-sm dark:text-gray-100 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
                <label className="peer-focus:font-medium absolute text-md text-gray-700 dark:text-gray-100 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Customer Adress
                </label>
              </div>
            </ModalBody>

            <ModalFooter>
              <NUIButton type="submit">Register</NUIButton>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </div>
  );
}
