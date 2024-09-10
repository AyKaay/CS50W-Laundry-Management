import React, { useEffect, useState } from "react";
import { Button as FBButton, Select, Tabs } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as NUIButton,
  useDisclosure,
  Select as SelectNUI,
  SelectItem as SelectItemNUI,
  Input,
  Button,
} from "@nextui-org/react";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  // Auth Token
  const authToken = localStorage.getItem("authToken");

  // GET
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get/products`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setProducts(response.data.data);
      } catch (error) {
        alert("Fetch Error: " + error.message);
      }
    };
    fetchData();
  }, [authToken]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-6 text-6xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Welcome to Enigmatic Laundry Platform!
            </h2>
            <p className="text-2xl pb-0">
              Streamlined and efficient solution designed to simplify and
              enhance the operations of laundry services.
            </p>
          </div>

          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400 text-center">
            Current laundry packages:
          </p>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {products.length > 0 ? (
              products.map((product, index) => (
                <Link to="/products">
                  {/*  Pricing Card */}
                  <div
                    key={index}
                    className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white"
                  >
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <div className="flex justify-center items-baseline my-8">
                      <span className="mr-2 text-5xl font-extrabold">
                        {29} Solaris
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /kg
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div className="my-8 mt-16 border-1 border-gray-500 opacity-50"></div>

          <div className="flex flex-row gap-10 justify-center" >
            <Link to="/register" className="">
              <Button color="primary" variant="shadow" size="lg">
                Register
              </Button>
            </Link>
            <Link to="/login" >
              <Button color="primary" variant="shadow" size="lg">
                Log In
              </Button>
            </Link>          
          </div>
        </div>
      </section>
    </>
  );
}
