# Laundry Management Application

## Welcome!

Welcome to our Laundry Management Application. This app was built for managing aspects of a laundry business, from customer interactions to transaction handling, and everything in between. This project is built as a final submission project for Harvard's CS50W, which focuses on web development. For more information, please visit [HERE](https://cs50.harvard.edu/web/2020/projects/final/capstone/).

Made by Farrel A

## Distinctiveness and Complexity

### Why This Project Satisfies the Distinctiveness and Complexity Requirements

#### Distinctiveness:

- **Comprehensive Management:** Integrates user authentication, product and customer management, and detailed transaction handling within a single application.
- **Advanced Django Features:** Uses custom user models and complex relationships between models.
- **Frontend and Backend Integration:** Combines React for dynamic user interactions with Django for robust backend data management.

#### Complexity:

- **Custom User Model:** Extends `AbstractUser` to include additional fields such as `role`, `updated_at`, and `created_at`.
- **Complex Data Relationships:** Manages products, customers, and bills with foreign key relationships and associated details in `BillDetail`.
- **CRUD Operations:** Implements create, read, update, and delete operations with proper validation and error handling.
- **Frontend and Backend Integration:** Utilizes React for frontend and Django for backend, handling authentication and data synchronization.

## File Descriptions

### What’s Contained in Each File

#### `models.py`:

- **User:** Extends `AbstractUser` to include additional fields such as `role`, `updated_at`, and `created_at`.
- **Products:** Defines a model for storing product details including `name`, `price`, and timestamps.
- **Customers:** Manages customer data with fields for `name`, `email`, `phone_number`, and `address`.
- **Bills:** Represents individual billing records linked to customers, with timestamps.
- **BillDetail:** Contains detailed information about each bill’s products, including `quantity` and related product information.

#### `views.py`:

- **create_bill:** Manages the creation of new bills and associated bill details, ensuring correct data handling and validation.
- **get_customer_list:** Retrieves and returns a list of all customers.
- **get_customer:** Fetches and returns details of a specific customer based on the customer ID.
- **delete_customer:** Handles the deletion of a customer from the database.
- **update_customer:** Updates customer details including `name`, `email`, `phone_number`, and `address`.
- **create_customer:** Creates a new customer record with provided details.

#### `serializers.py`:

- Defines serializers for each model to convert between Django models and JSON, facilitating API communication and data representation.

#### `urls.py`:

- Maps URL endpoints to view functions, enabling access to various API endpoints for handling customer and bill data.

#### `settings.py`:

- Configures Django settings including database connections, installed apps, middleware, and other critical settings.

#### `admin.py`:

- Registers models with the Django admin interface, allowing for easy data management through the Django admin panel.

## Running the Application

### How to Run Django

#### Setup Environment: -
**Move to django dir:**
`./capstone2` \*
**Install dependencies:**
`pip install -r requirements.txt` \*
**Apply migrations:**
`python manage.py migrate`
#### Run the Server: \* 
**Start the development server:**
`python manage.py runserver` \*
**Access the application at:**
[http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### How to Run React \*

**Make sure you have Node.js installed.** You can download it from [nodejs.org](https://nodejs.org/). 
#### Setup Environment: _ 
**Move to django dir:**
`./frontendReact` \*
**Install dependencies:**
`npm install` 
#### Run the Server: _ 
**Start the development server:** 
`npm run dev` \* 
**Access the application at:** 
[http://localhost:5173/](http://localhost:5173/)

## Key Features

### Product Management

- **Create New Products:** Seamlessly add new laundry services or products to your inventory with detailed pricing and essential information.
- **Display Product List:** View an organized list of all available products, making management and access straightforward.
- **Edit Product Details:** Modify existing product details, including price adjustments and service updates.
- **Delete Products:** Remove outdated products from your inventory, ensuring that your offerings are current and relevant.

### Customer Management

- **Create New Customers:** Add new customer records with comprehensive information to enable personalized service and efficient transaction handling.
- **Display Customer List:** Access a detailed list of customers for effective management and tracking of interactions.
- **Edit Customer Details:** Update customer information as required, including changes to address, phone number, and other crucial details.
- **Delete Customers:** Remove customer records when necessary to maintain accurate and up-to-date information.

### Transaction Management

- **Create New Transactions:** Easily initiate and process transactions, ensuring that all details are accurately recorded and billed.
- **Display Transaction List:** Review a comprehensive list of transactions to monitor and analyze business activities.
- **Display Transaction Details:** Access detailed information about each transaction, including involved products, quantities, pricing, and customer details.

## Models Used

### User Model

- **Enhanced User Management:** Extends Django's default user model to include a unique ID, `role`, and timestamps for tracking user creation and updates.

### Products Model

- **Product Inventory:** Manages product data with essential details such as `name`, `price`, and timestamps to facilitate efficient inventory management.

### Customers Model

- **Customer Records:** Stores in-depth customer information, including `name`, `email`, `phone_number`, and `address`, with timestamps for tracking.

### Bills Model

- **Billing System:** Represents individual bills associated with customers, including timestamps to monitor the creation and updates of each bill.
- **Detailed Billing Information:** Provides comprehensive details on products and quantities within each bill, offering insights and tracking capabilities.

## Project Dependencies

- **@nextui-org/react:** A modern UI component library for React, offering pre-built components for creating responsive and interactive UIs.
- **axios:** A promise-based HTTP client for making API requests, simplifying data fetching, posting, and management.
- **django:** A robust Python-based framework for developing web applications.
- **djangorestframework:** A powerful toolkit for building Web APIs with Django, enabling flexible and efficient API creation.
- **flowbite:** A utility-first CSS framework providing components and utilities for building responsive and contemporary web interfaces.
- **flowbite-react:** React components based on Flowbite, facilitating seamless integration of Flowbite's UI components into React applications.
- **framer-motion:** A library for creating animations in React, providing a flexible API for developing interactive and animated UIs.
- **json-server:** A mock REST API based on a JSON file, ideal for prototyping and testing without a full backend setup.
- **local-cors-proxy:** A proxy server to address CORS issues during development, enabling interaction with APIs that may have CORS restrictions.
- **react:** The core library for building user interfaces in a component-based architecture, forming the foundation of the project.
- **react-dom:** Provides methods for rendering React components to the browser DOM.
- **react-hook-form:** A library for managing form state in React, offering a simple API for form validation and submission.
- **react-router-dom:** Declarative routing library for React applications, allowing route definition and navigation between views.
- **tailwindcss:** A utility-first CSS framework with a comprehensive set of classes for building responsive and customizable designs directly in markup.
- **vite:** A fast build tool and development server providing an optimized experience for modern web projects.
