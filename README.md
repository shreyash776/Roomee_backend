# Roomee Backend

## Project Overview

This project provides the backend API for the Roomee application, built with Node.js and Express. It handles user authentication, data management, and other server-side functionalities.

## Tech Stack & Tools

*   **JavaScript:** Primary programming language.
*   **Node.js:** Runtime environment.
*   **Express:** Web application framework.
*   **MongoDB:** Database.
*   **Mongoose:** MongoDB object modeling tool.
*   **bcryptjs:** Password hashing.
*   **jsonwebtoken:** JSON Web Token implementation for authentication.
*   **cloudinary:** Cloudinary SDK for image and video management.
*   **cors:** Cross-Origin Resource Sharing middleware.
*   **dotenv:** Loads environment variables from a `.env` file.
*   **express-validator:** Middleware for data validation.
*   **multer:** Middleware for handling `multipart/form-data`.
*   **multer-storage-cloudinary:** Cloudinary storage engine for Multer.
*   **nodemailer:** Module for sending emails.
*   **otp-generator:** Generates one-time passwords.
*   **Docker:** Containerization platform.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/shreyash776/Roomee_backend.git
    cd Roomee_backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure environment variables:**

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    MONGO_URI=<Your MongoDB Connection String>
    JWT_SECRET=<Your JWT Secret Key>
    CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUDINARY_API_KEY=<Your Cloudinary API Key>
    CLOUDINARY_API_SECRET=<Your Cloudinary API Secret>
    ```

4.  **Start the server:**

    ```bash
    node server.js
    ```

## Docker Usage

A `Dockerfile` is provided to containerize the application.

1.  **Build the Docker image:**

    ```bash
    docker build -t roomee-backend .
    ```

2.  **Run the Docker container:**

    ```bash
    docker run -d -p 3000:3000 \
      -e PORT=3000 \
      -e MONGO_URI=<Your MongoDB Connection String> \
      -e JWT_SECRET=<Your JWT Secret Key> \
      -e CLOUDINARY_CLOUD_NAME=<Your Cloudinary Cloud Name> \
      -e CLOUDINARY_API_KEY=<Your Cloudinary API Key> \
      -e CLOUDINARY_API_SECRET=<Your Cloudinary API Secret> \
      --name roomee-backend-container roomee-backend
    ```

A `docker-compose.yml` file is also included for easier management of the Docker container.

## CI/CD

This project uses GitHub Actions for Continuous Integration and Continuous Deployment. The workflow is defined in `.github/workflows/cicd-workflow.yml`.

The workflow performs the following steps:

*   Builds a Docker image.
*   Publishes the image to Docker Hub.
*   Deploys the image to a self-hosted runner.

**Secrets Required:**

The following secrets must be configured in your GitHub repository settings:

*   `DOCKER_USERNAME`: Your Docker Hub username.
*   `DOCKER_PASSWORD`: Your Docker Hub password.
*   `PORT`: The port the application will run on.
*   `MONGO_URI`: Your MongoDB connection string.
*   `JWT_SECRET`: Your JWT secret key.
*   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
*   `CLOUDINARY_API_KEY`: Your Cloudinary API key.
*   `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

## Configuration

The application is configured using environment variables. See the "Getting Started" section for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.