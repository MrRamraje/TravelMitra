
# TravelMitra

## Overview
TravelMitra is a web application that emulates the functionality of Airbnb. It allows users to create and manage travel destination listings, add reviews, and search for interesting places to visit. TravelMitra aims to provide a seamless and interactive user experience.

## Features
- User Authentication: Secure login and registration system for users.
- Create Listings: Users can create and share travel destination listings with images and descriptions.
- Reviews: Users can write reviews and rate travel destinations.
- Responsive Design: Mobile-friendly interface for an optimal user experience on any device.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **File Uploads**: Multer and Cloudinary
- **Deployment**: Render

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/TravelMitra.git
   cd TravelMitra
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```dotenv
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_KEY=your_key
   CLOUDINARY_SECRET=your_secret
   DATABASE_URL=mongodb://localhost:27017/TravelMitra
   ```

4. **Start the application:**
   ```sh
   npm start
   ```

## Usage
1. **Navigate to `http://localhost:8080`** to access the application.
2. **Register a new account** or log in with existing credentials.
3. **Create, view, and manage travel listings** and reviews.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

