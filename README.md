# ShopEase

ShopEase is a single-page e-commerce web application that allows users to search, filter, and view a wide variety of products. The app includes pagination to navigate through multiple pages of products, with filters for brand, category, and price range.

## Features

- **Product Search**: Search for products by name.
- **Filtering**: Filter products by brand, category, and price range.
- **Pagination**: Navigate through products with pagination, displaying 10 products per page.
- **Product Display**: View product details including image, description, price, category, and ratings.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Icons**: React Icons

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account for database access

### Installation

1. **Clone the repository**:
   ```bash
   git clone (this repo)
   cd shopease
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory and add your MongoDB credentials:
   ```env
   DB_USER=yourMongoDBUser
   DB_PASS=yourMongoDBPassword
   PORT=3000
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Open the application**:
   - Open your browser and go to `http://localhost:3000`.

## API Endpoints

- **GET /products**: Fetches products with pagination support.
  - Query Parameters:
    - `page`: Page number (default: 1)
    - `limit`: Number of products per page (default: 10)

## Project Structure

- **/client**: React frontend code.
- **/server**: Node.js and Express backend code.
- **/server/.env**: Environment variables for MongoDB connection.

## Future Enhancements

- User authentication for personalized shopping experience.
- Product reviews and ratings system.
- Advanced filtering options.

## License

This project is licensed under the MIT License.
```

This `README.md` provides an overview of the project, explains how to set it up, and gives an outline of the features and technologies used.
