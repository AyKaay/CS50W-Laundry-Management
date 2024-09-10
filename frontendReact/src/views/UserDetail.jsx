import React, { useEffect, useState } from "react";
import { Button as FBButton, Tabs } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalFooter, Button as NUIButton, useDisclosure } from "@nextui-org/react";

/*
=== :OBJECTS ITEMS: ===
id : auto build,
name : ,
phone_number: (in str), 
address: ,

====]NOTES[====
*/

export default function UserDetail() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({    
    name: '',
    phone_number: '',
    address: '',
  });

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isEditable, setIsEditable] = useState(false); // Manage readOnly state
  const navigate = useNavigate();

  // Auth Token
  const authToken = localStorage.getItem("authToken");

  // GET based on Id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/get/customer/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUserData(response.data.data);
      } catch (error) {
        alert("Fetch Error: " + error.message);
      }
    };
    fetchData();
  }, [userId, authToken]);

  // PUT (Edit profile)
  const updateUser = async (updatedData) => {
    try {
      await axios.put(`http://127.0.0.1:8000/put/customer/${userId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } 
    catch (error) {
      alert("Failed updating: " + error.message);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedData = {
      id: userId,
      name: userData.name,
      phone_number: userData.phone_number,
      address: userData.address,
    };
    updateUser(updatedData);
    setIsEditable(false);
  };

  // DELETE
  const deleteUser = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/delete/customer/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      navigate('/user');
    }
    catch (error) {
      alert("Request error: " + error.message);
    }
    onClose(); // Close the modal after deletion
  };  

  // Allow Editing Button
  const handleEditClick = () => {
    setIsEditable(true); 
  }

  return (
    <>
      <Tabs aria-label="Tabs with underline" variant="underline">
        {/* USER PROFILE */}
        <Tabs.Item active title="Profile" icon={HiUserCircle}>
          <div className="">
            <div className="pb-6 flex flex-row justify-between">
              <p className="font-extrabold text-xl justify-items-center items-center place-content-center">User Profile</p>
              <FBButton onClick={handleEditClick} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center" >Edit Profile</FBButton>
            </div>
            <div className="">
              <form onSubmit={handleUpdate}>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    value={userData.name}
                    placeholder="Name"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    readOnly={!isEditable}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                  <label className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="phone_number"
                    value={userData.phone_number}
                    placeholder="Phone Number"
                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    readOnly={!isEditable}
                    onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    placeholder="Address"
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    readOnly={!isEditable}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                  />
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                </div>
                
                <div className="flex flex-start gap-6">
                  {isEditable && <FBButton  className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-lg text-sm text-center" type="submit">Update</FBButton>}
                  {isEditable && <FBButton onClick={onOpen} color="failure">Delete User</FBButton>}
                </div>
              </form>
            </div>
          </div>
        </Tabs.Item>

        {/* USER TRANSACTIONS */}
        <Tabs.Item title="Transaction" icon={MdDashboard}>
          {/* TODO Add: user transactions and history */}
          <p>No Transaction yet</p>
        </Tabs.Item>

      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="">
            Confirm Delete User
          </ModalHeader>
          <ModalFooter>
            <FBButton color="blue" variant="light" onClick={onClose}>
              Cancel
            </FBButton>
            <FBButton color="failure" onClick={deleteUser}>
              Confirm
            </FBButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
