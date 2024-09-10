import React, { useEffect, useState } from "react";
import { Button as FBButton, Select, Tabs } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { GiAbstract042 } from "react-icons/gi";
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
} from "@nextui-org/react";

/*
=== :OBJECTS ITEMS: ===
name : ,
price: (in int), 
type: ,
...,

====]NOTES[====
1. TODO fix: auto update without refreshing after sending PUT data
2. TODO add: Submit DELETE request after clicking submit button not after choosing product
*/

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState({
    id: "",
    name: "",
    price: 0,
    type: "",
  });
  const [products, setProducts] = useState([]);

  const [isEditable, setIsEditable] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  // Auth Token
  const authToken = localStorage.getItem("authToken");

  // Modal types differentiator
  const [currentModal, setCurrentModal] = useState(null);
  const MODAL_TYPES = {
    ADD_PRODUCT: "ADD_PRODUCT",
    // DELETE_CONFIRMATION: 'DELETE_CONFIRMATION',
    DELETE_PRODUCT: "DELETE_PRODUCT",
    EDIT_PRODUCT: "EDIT_PRODUCT",
    // Add more as needed
  };

  // GET lists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/get/products",
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

  // POST (Add products) dev
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: name === "price" ? Number(value) : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/post/product",
        selectedProduct,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const newProduct = response.data.data;
      setProducts([...products, newProduct]);
      setSelectedProduct({
        name: "",
        price: 0,
        type: "",
      });
    } catch (error) {
      console.error("POST error:", error);
      alert("POST error: " + error.message);
    }
    closeModal();
  };

  // PUT (Select product)
  const handleProductSelect = (product) => {
    // Take anchorKey or currentKey from SelectNUI
    const selectedKey = product.currentKey || product.anchorKey || product.id;
    const updatedProduct = {
      ...product,
      id: selectedKey, // Explicitly set the `id`
    };
    setSelectedProduct(updatedProduct);
  };
  // (Edit the selected product)
  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      const updatedData = {
        id:
          selectedProduct.id ||
          selectedProduct.anchorKey ||
          selectedProduct.currentKey,
        name: selectedProduct.name,
        price: selectedProduct.price,
        // type: selectedProduct.type,
      };
      updateProduct(updatedData);
    }
  };
  const updateProduct = async (updatedData) => {
    console.log("Sending data:", updatedData); // Log the data before sending
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/put/product/${updatedData.id}`,
        updatedData, // Pass the correct data object
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Response:", response.data); // Log the response
      // TODO later: add realtime update after submitting PUT
      setSelectedProduct({
        name: "",
        price: 0,
        // type: "",
      });
    } catch (error) {
      console.error(error);
      alert(error);
    }
    closeModal();
  };

  // DELETE
  const deleteProducts = async (products) => {
    const selectedKey =
      products.currentKey || products.anchorKey || products.id;
    console.log(selectedKey);
    if (!selectedKey) {
      alert("No product selected.");
      return;
    }
    console.log(selectedKey);
    try {
      await axios.delete(
        `http://127.0.0.1:8000/delete/product/${selectedKey}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedKey)
      );
      navigate("/products");
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
    onClose();
  };

  // Allow Editing Button (unused)
  const handleEditClick = () => {
    setIsEditable(true);
  };

  // Open modal by type
  const openModal = (modalType) => {
    setCurrentModal(modalType);
    onOpen();
  };
  
  // Close modal
  const closeModal = () => {
    setCurrentModal(null);
    onClose();
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <p className="text-xl font-bold">Products list</p>
        {/* CRUD Button options */}
        <div
          className="flex flex-row justify-items-center items-center place-content-center gap-4"
          role="group"
        >
          <FBButton
            onClick={() => openModal(MODAL_TYPES.ADD_PRODUCT)}
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm text-center"
          >
            Add Product
          </FBButton>
          <FBButton
            onClick={() => openModal(MODAL_TYPES.EDIT_PRODUCT)}
            className=" bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-700 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-700/80 font-medium rounded-lg text-sm text-center"
          >
            Edit Product
          </FBButton>
          <FBButton
            color="failure"
            onClick={() => openModal(MODAL_TYPES.DELETE_PRODUCT)}
            className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm text-center"
          >
            Delete Product
          </FBButton>
        </div>
      </div>

      <Tabs aria-label="Tabs with underline" variant="underline">
        {products.length > 0 ? (
          products.map((product) => (
            <Tabs.Item
              key={product.id}
              active
              title={product.name}
              icon={GiAbstract042}
              onClick={() => handleProductSelect(product)}
            >
              <div className="">
                <form onSubmit={handleUpdate}>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      placeholder="Name"
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      readOnly={!isEditable}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Package Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="price"
                      value={product.price}
                      placeholder="Price"
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      readOnly={!isEditable}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Price
                    </label>
                  </div>
                  {/* <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="type"
                      value={product.type}
                      placeholder="Type"
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      readOnly={!isEditable}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          type: e.target.value,
                        })
                      }
                    />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Type
                    </label>
                  </div> */}
                </form>
              </div>
            </Tabs.Item>
          ))
        ) : (
          <Tabs.Item>No Product Available</Tabs.Item>
        )}
      </Tabs>

      {/* (PUT) edit products modal */}
      {currentModal === MODAL_TYPES.EDIT_PRODUCT && (
        <Modal isOpen={isOpen} onClose={closeModal} className="dark:bg-slate-800 bg-white dark:text-white text-black">
          <ModalContent>
            <ModalHeader className="">Edit Products Package</ModalHeader>
            <ModalBody>
              <div className="relative z-0 w-full mb-5 group">
                <SelectNUI
                  items={products}
                  label="Products to Edit"
                  placeholder="Select a product"
                  selectedKeys={products.id}
                  onSelectionChange={handleProductSelect}
                  
                >
                  {(product) => (
                    <SelectItemNUI key={product.id} >
                      {product.name}
                    </SelectItemNUI>
                  )}
                </SelectNUI>
              </div>
              {selectedProduct && (
                <div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="name"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      New Product Name
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="price"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: Number(e.target.value),
                        })
                      }
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Product Price
                    </label>
                  </div>
                  {/* <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      value={selectedProduct.type}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          type: e.target.value,
                        })
                      }
                      className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Product Type
                    </label>
                  </div> */}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <NUIButton color="primary" variant="light" onClick={onClose}>
                Cancel
              </NUIButton>
              <NUIButton
                color="primary"
                onClick={() => updateProduct(selectedProduct)}
                disabled={!selectedProduct} // Disable confirm button if no product is selected
              >
                Confirm
              </NUIButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* (POST) Add Product */}
      {currentModal === MODAL_TYPES.ADD_PRODUCT && (
        <Modal isOpen={isOpen} onClose={onClose} className="dark:bg-slate-800 bg-white dark:text-white text-black">
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Register New Product
              </ModalHeader>

              <ModalBody>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="name"
                    value={products.name}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Name
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="number"
                    name="price"
                    value={products.price}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Price
                  </label>
                </div>
                {/* <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="type"
                    value={products.type}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label className="peer-focus:font-medium absolute text-md  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Product Type
                  </label>
                </div> */}
              </ModalBody>

              <ModalFooter>
                <NUIButton type="submit">Register</NUIButton>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
      )}

      {/* (DELETE) delete product */}
      {currentModal === MODAL_TYPES.DELETE_PRODUCT && (
        <Modal isOpen={isOpen} onClose={onClose} className="dark:bg-slate-800 bg-white dark:text-white text-black">
          <ModalContent>
            <ModalHeader>Delete Product</ModalHeader>
            <ModalBody>
              <SelectNUI
                items={products}
                label="Products"
                placeholder="Select a product"
                className="max-w-xs"
                selectedKeys={products.id}
                onSelectionChange={deleteProducts}
              >
                {(product) => (
                  <SelectItemNUI key={product.id}>{product.name}</SelectItemNUI>
                )}
              </SelectNUI>
            </ModalBody>
            <ModalFooter>
              <NUIButton onClick={onClose}>Register</NUIButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
