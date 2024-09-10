"use client";
import React from "react";
import { List } from "flowbite-react";
import {Snippet} from "@nextui-org/snippet";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="">
        <p className="my-2 text-4xl font-bold">Welkommen!</p>
        <div className="border border-gray-500 my-2 mb-4"></div>
        <p>
          Welcome to our Laundry Management Application. This app was built for
          managing aspect of a laundry business, from customer interactions to
          transaction handling, and everything in between. This project is built
          as a final submission project for Harvard's CS50W which focus on web
          development. For more information, please visit{" "}
          <a href="https://cs50.harvard.edu/web/2020/projects/final/capstone/">
            HERE
          </a>
        </p>
      </div>
      <a className="mt-4" href=" https://github.com/AyKaay?tab=repositories">
        <button
          type="button"
          class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
        >
          <svg
            class="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
              clip-rule="evenodd"
            />
          </svg>
          Made by Farrel A
        </button>
      </a>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">
          Distinctiveness and Complexity
        </p>
        <div className="border border-gray-500 my-2 mb-4"></div>

        <div className="">
          <p className="text-xl font-semibold mb-4">
            Why This Project Satisfies the Distinctiveness and Complexity
            Requirements
          </p>

          <p className="font-semibold">Distinctiveness:</p>
          <List className="list-inside ml-6 ">
            <List.Item>
              This project is distinct due to its comprehensive approach to
              managing a laundry service system. It integrates user
              authentication, product and customer management, and detailed
              transaction handling within a single application. The use of
              Django’s advanced features, such as custom user models and complex
              relationships between models, adds uniqueness. Additionally, the
              integration of frontend with React for user interactions
              and a detailed backend for data management.
            </List.Item>
          </List>

          <p className="font-semibold mt-4">Complexity:</p>
          <List className="list-inside ml-6">
            <List.Item>
              <span className="font-semibold">Custom User Model:</span>{" "}
              Extending <code>AbstractUser</code> to include additional fields
              such as <code>role</code>, <code>updated_at</code>, and{" "}
              <code>created_at</code>.
            </List.Item>
            <List.Item>
              <span className="font-semibold">Complex Data Relationships:</span>{" "}
              Managing products, customers, and bills with foreign key
              relationships, and handling associated details in{" "}
              <code>BillDetail</code>.
            </List.Item>
            <List.Item>
              <span className="font-semibold">CRUD Operations:</span>{" "}
              Implementing create, read, update, and delete operations across
              various models with proper validation and error handling.
            </List.Item>
            <List.Item>
              <span className="font-semibold">
                Frontend and Backend Integration:
              </span>{" "}
              Using React for a dynamic frontend and Django for a robust
              backend, including handling authentication and data
              synchronization.
            </List.Item>
          </List>
        </div>
      </div>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">File Descriptions</p>
        <div className="border border-gray-500 my-2 mb-4"></div>

        <div className="">
          <p className="text-xl font-semibold">What’s Contained in Each File</p>

          <p className="font-semibold">models.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              <span className="font-semibold">User:</span> Extends{" "}
              <code>AbstractUser</code> to include additional fields such as{" "}
              <code>role</code>, <code>updated_at</code>, and{" "}
              <code>created_at</code>.
            </List.Item>
            <List.Item>
              <span className="font-semibold">Products:</span> Defines a model
              for storing product details, including name, price, and
              timestamps.
            </List.Item>
            <List.Item>
              <span className="font-semibold">Customers:</span> Manages customer
              data with fields for name, email, phone number, and address.
            </List.Item>
            <List.Item>
              <span className="font-semibold">Bills:</span> Represents
              individual billing records linked to customers, with timestamps.
            </List.Item>
            <List.Item>
              <span className="font-semibold">BillDetail:</span> Contains
              detailed information about each bill’s products, including
              quantity and related product information.
            </List.Item>
          </List>

          <p className="font-semibold">views.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              <span className="font-semibold">create_bill:</span> Manages the
              creation of new bills and associated bill details, ensuring
              correct data handling and validation.
            </List.Item>
            <List.Item>
              <span className="font-semibold">get_customer_list:</span>{" "}
              Retrieves and returns a list of all customers.
            </List.Item>
            <List.Item>
              <span className="font-semibold">get_customer:</span> Fetches and
              returns details of a specific customer based on the customer ID.
            </List.Item>
            <List.Item>
              <span className="font-semibold">delete_customer:</span> Handles
              the deletion of a customer from the database.
            </List.Item>
            <List.Item>
              <span className="font-semibold">update_customer:</span> Updates
              customer details, including name, email, phone number, and
              address.
            </List.Item>
            <List.Item>
              <span className="font-semibold">create_customer:</span> Creates a
              new customer record with provided details.
            </List.Item>
          </List>

          <p className="font-semibold">serializers.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              Defines serializers for each model to convert between Django
              models and JSON, facilitating API communication and data
              representation.
            </List.Item>
          </List>

          <p className="font-semibold">urls.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              Maps URL endpoints to view functions, enabling access to various
              API endpoints for handling customer and bill data.
            </List.Item>
          </List>

          <p className="font-semibold">settings.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              Configures Django settings, including database connections,
              installed apps, middleware, and other critical settings.
            </List.Item>
          </List>

          <p className="font-semibold">admin.py:</p>
          <List className="list-inside ml-6">
            <List.Item>
              Registers models with the Django admin interface, allowing for
              easy data management through the Django admin panel.
            </List.Item>
          </List>
        </div>
      </div>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">Running the Application</p>
        <div className="border border-gray-500 my-2 mb-4"></div>

        <div className="">
          <p className="text-xl font-semibold">How to Run Django</p>

          <List className="list-inside ml-6">
            <List.Item>
              <span className="font-semibold">Setup Environment:</span>
              <div className="list-inside ml-6">
                <List.Item>
                  Install dependencies:
                  <pre>
                    <Snippet variant="default">pip install -r requirements.txt</Snippet>
                  </pre>
                </List.Item>
                <List.Item>
                  Apply migrations:
                </List.Item>
                <Snippet variant="default">python manage.py migrate</Snippet>
              </div>
            </List.Item>
            <List.Item>
              <span className="font-semibold">Run the Server:</span>
              <div className="list-inside ml-6">
                <List.Item>
                  Start the development server:
                </List.Item>
                <Snippet variant="default">python manage.py runserver</Snippet>
                <List.Item>
                  Access the application at 
                </List.Item>
                  <Snippet variant="default">http://127.0.0.1:8000/</Snippet>
              </div>
            </List.Item>
          </List>
        </div>

        <div className="">
          <p className="text-xl font-semibold">How to Run React</p>
          <List className="list-inside ml-6">
          <List.Item className="font-semibold">Make sure you have Node.js installed. You can download it from nodejs.org.</List.Item>
            <List.Item>
              <span className="font-semibold">Setup Environment:</span>
              <div className="list-inside ml-6">
                <List.Item>
                  Install dependencies:
                  <pre>
                    <Snippet variant="default">npm install</Snippet>
                  </pre>
                </List.Item>
              </div>
            </List.Item>
            <List.Item>
              <span className="font-semibold">Run the Server:</span>
              <div className="list-inside ml-6">
                <List.Item>
                  Start the development server:
                </List.Item>
                <Snippet variant="default">npm run dev</Snippet>
                <List.Item>
                  Access the application at 
                </List.Item>
                  <Snippet variant="default">http://localhost:5173/</Snippet>
              </div>
            </List.Item>
          </List>
        </div>

      </div>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">Key Features</p>
        <div className="border border-gray-500 my-2 mb-4"></div>

        <List className="">
          <List.Item>
            <span className="font-semibold">Product Management:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Create New Products:</span>{" "}
                Easily add new laundry services or products to your inventory,
                complete with pricing and other essential details.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Display Product List:</span>{" "}
                View a complete list of all products offered, ensuring that you
                can manage and access them quickly.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Edit Product Details:</span>{" "}
                Update the details of any existing product, including price
                changes or service modifications.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Delete Products:</span> Remove
                products that are no longer offered, keeping your inventory
                up-to-date and relevant.
              </List.Item>
            </List>
          </List.Item>

          <List.Item>
            <span className="font-semibold">Customer Management:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Create New Customers:</span> Add
                new customers to your database with all their essential
                information, allowing for personalized service and easy
                transaction management.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Display Customer List:</span>{" "}
                Access a complete list of your customers, ensuring you can
                easily manage and track customer interactions.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Edit Customer Details:</span>{" "}
                Update customer information as needed, including address, phone
                number, and other important details.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Delete Customers:</span> Remove
                customers from your database when necessary, ensuring your
                records remain accurate.
              </List.Item>
            </List>
          </List.Item>

          <List.Item>
            <span className="font-semibold">Transaction Management:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Create New Transactions:</span>{" "}
                Initiate and process new transactions with ease, ensuring that
                all details are accurately captured and billed.
              </List.Item>
              <List.Item>
                <span className="font-semibold">Display Transaction List:</span>{" "}
                View a complete list of all transactions, providing a clear
                overview of your business activities.
              </List.Item>
              <List.Item>
                <span className="font-semibold">
                  Display Transaction Details:
                </span>{" "}
                Access detailed information about each transaction, including
                the products involved, quantities, pricing, and customer
                information.
              </List.Item>
            </List>
          </List.Item>
        </List>
      </div>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">Models Used</p>
        <div className="border border-gray-500 my-2 mb-4"></div>

        <List className="">
          <List.Item>
            <span className="font-semibold">User Model:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Enhanced User Management:</span>{" "}
                Extends Django's default user model to include a unique ID,
                role, and timestamps for tracking user creation and updates.
              </List.Item>
            </List>
          </List.Item>

          <List.Item>
            <span className="font-semibold">Products Model:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Product Inventory:</span>{" "}
                Manages products with essential details like name, price, and
                timestamps for efficient inventory management.
              </List.Item>
            </List>
          </List.Item>

          <List.Item>
            <span className="font-semibold">Customers Model:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Customer Records:</span> Stores
                detailed customer information including name, email, phone
                number, and address, along with timestamps for tracking.
              </List.Item>
            </List>
          </List.Item>

          <List.Item>
            <span className="font-semibold">Bills Model:</span>
            <List className="list-inside ml-6">
              <List.Item>
                <span className="font-semibold">Billing System:</span>{" "}
                Represents individual bills linked to customers, with timestamps
                to track the creation and updates of each bill.
              </List.Item>
              <List.Item>
                <span className="font-semibold">
                  Detailed Billing Information:
                </span>{" "}
                Details products and quantities for each bill, providing
                comprehensive billing insights and tracking.
              </List.Item>
            </List>
          </List.Item>
        </List>
      </div>

      <div className="mt-4">
        <p className="my-2 text-2xl font-semibold">Project Dependencies</p>
        <div className="border border-gray-500 my-2 mb-4"></div>
        <List>

          <List.Item>
            <span className="font-semibold text-lg">@nextui-org/react:</span>
            <p className="ml-6">
              A modern UI component library for React, providing ready-to-use
              components for building responsive and interactive UIs.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">axios:</span>
            <p className="ml-6">
              A promise-based HTTP client for making requests to APIs, allowing
              you to easily fetch, post, and manage data.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">django:</span>
            <p className="ml-6">
              A modern python based backend framework and handling of web application.
            </p>
          </List.Item>
          
          <List.Item>
            <span className="font-semibold text-lg"> djangorestframework:</span>
            <p className="ml-6">
              Django REST framework is a powerful and flexible toolkit for building Web APIs.
            </p>
          </List.Item>
          <List.Item>
            <span className="font-semibold text-lg">flowbite:</span>
            <p className="ml-6">
              A utility-first CSS framework that provides components and
              utilities for building responsive and modern web interfaces.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">flowbite-react:</span>
            <p className="ml-6">
              React components built with Flowbite, allowing seamless
              integration of Flowbite's UI components into React applications.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">framer-motion:</span>
            <p className="ml-6">
              A library for creating animations in React, offering a simple and
              flexible API for building interactive and animated user
              interfaces.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">json-server:</span>
            <p className="ml-6">
              A simple mock REST API based on a JSON file, perfect for
              prototyping and testing without needing a full backend setup.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">local-cors-proxy:</span>
            <p className="ml-6">
              A proxy server to bypass CORS issues during development, allowing
              you to work with APIs that may have CORS restrictions.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">react:</span>
            <p className="ml-6">
              The core library for building user interfaces in a component-based
              architecture. React is the foundation of the project.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">react-dom:</span>
            <p className="ml-6">
              Provides DOM-specific methods for React, allowing your app to
              render components to the browser DOM.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">react-hook-form:</span>
            <p className="ml-6">
              A library for managing form state in React, offering a simple API
              to handle form validation and submission efficiently.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">react-router-dom:</span>
            <p className="ml-6">
              Declarative routing for React web applications, allowing you to
              define routes and navigate between different views in your app.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">tailwindcss:</span>
            <p className="ml-6">
              A utility-first CSS framework that provides a wide range of
              classes for building responsive and custom designs directly in
              your markup.
            </p>
          </List.Item>

          <List.Item>
            <span className="font-semibold text-lg">vite:</span>
            <p className="ml-6">
              A fast development server and build tool that provides a quick and
              optimized development experience for modern web projects.
            </p>
          </List.Item>
        </List>
      </div>
    </div>
  );
}
