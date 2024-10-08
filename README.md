# 🌎 Welcome to the Store Manager Repository

***This is a RESTFul API project***

## ℹ️ Summary
  
***This is a RESTful API using the layered architecture where I developed it during the [Trybe](https://www.betrybe.com/) backend module. This API is a sales management system, allowing you to create, view, delete and update products and sales using a MySQL database for data management.***

## 🚀 Technology Used

[![Technology](https://skillicons.dev/icons?i=docker,nodejs,mysql,express,js)](https://skillicons.dev)

## 💻 Opening API

<details> 
  <summary><strong>Docker</strong></summary>
  
- copy the repository to a local folder using the terminal and passing the command:
  ```bash
  git clone git@github.com:juliocmatias/store-manager.git
  ```

  If you don't have git installed, you can install it using this command in the shell and bash terminal:

  Debian/Ubuntu bash:
  ```bash
  apt-get install git
  ```

  other kernel follow the instructions on the website [Git](https://git-scm.com/download/linux).

  windows/powershell:
  ```shell
  winget install --id Git.Git -e --source winget
  ```

  Or you can follow the website [git](https://git-scm.com/downloads) documentation for more installation means.

> ## 🔍️ navigate to the folder created in the clone, and open the terminal.

- install the dependencies:
  ```bash
  npm install
  ```
  > This method of installing pending issues only works if the node installation package is npm, if you use another one, just switch to npm for the package used

  you need to have node installed to be able to install the dependency packages
  If you don't have it, you can run the command if your operating system is Linux:
  ```bash
  sudo apt update sudo apt install nodejs sudo apt install npm
  ```

  If not, follow the installation instructions on the [Node.js](https://nodejs.org/en/download) website.

<a id="compose"></a>

- For the API to start working, you first have to run docker-compose:

  ```bash
  docker-compose up -d
  ```

  By running this command the API is functional and can receive requests

- If you need to reset the database, run the command:

  ```bash
  npm run db:reset
  ```

> ⚠️ WARING: It's important to note that the containers will run on port 3001 for the API and 3306 for the MySQL database. Therefore, if you're using them, make sure to first terminate any apps or processes that utilize these ports.
>
>  ⚠️  It's also important to remember that to run an API using Docker, you'll need to have it installed and configured on your machine. Consult the documentation to learn more about [Docker](https://docs.docker.com/get-docker/).

</details>

<details>
  <summary><strong>Terminal</strong></summary>

*After cloning and accessing the project directory. Install the dependencies with `npm install` if you don't have Node.js installed, just follow the instructions in Docker.*

- Run `docker-compose up -d` in the terminal and stop the API container with `docker stop store_manager`. After this step:

  ```bash
  # access access the API with this command in the terminal
  npm start
  # or to start with live-reload
  npm run dev
  ```
  
</details>

## 📚 API Documentation

<details>
  <summary><strong>Swagger</strong></summary>

  
- *To access the API documentation, you can use Swagger. Swagger is a powerful tool that allows you to visualize and interact with APIs. It provides a user-friendly interface where you can explore the available endpoints, view request and response examples, and even test the API directly from the documentation.*

  <strong>To use the Swagger documentation for this API, follow these steps:</strong>

  >1. Start the API server by uploading the containers with `docker-compose up -d` in the terminal.
  >
  >2. Open your web browser and navigate to http://localhost:3001/api-doc/.
  >
  >3. You will see the Swagger UI interface, which displays all the available endpoints and their details.
  >
  >4. Explore the different endpoints, request parameters, and response schemas to understand how to interact with the API.
  >
  >5. You can also try out the API directly from the documentation by clicking on the "Try it out" button and providing the required input data.
  >
  >6. Swagger will generate the request URL and show the response data, making it easy to test and validate the API's functionality.

  Using Swagger documentation is a great way to understand and utilize the features of this API. It provides a comprehensive overview of the available endpoints and their functionalities, making it easier for developers to integrate and work with the API.

</details>

## 🧪 Tests

<details>
  <summary><strong>See about</strong></summary>

- *The API has unit testing coverage using mocha, with chai to requet the api and sinon to simulate returns. If you want to see, just run the command after uploading the containers:*

  ```bash
  npm run test
  ```
  *It is also possible to see test coverage using the command:*

  ```bash
  npm run coverage
  ```

</details>

## 👊 Authors and acknowledgment

*This project was followed by requirements pre-established by [Trybe](https://www.betrybe.com/), only the implementations are my own.*

## 🔒️ License ©️

[ISC](https://choosealicense.com/licenses/isc/)
