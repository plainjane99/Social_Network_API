# Social_Network_API

## Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [License](#license)
* [Questions](#questions)

## Description <a name="description"></a>
This is the back-end of a social network application that utilizes Node.js and Express.js to create the API, Mongoose for the Object-Document Mapper, and MondoDB for the database.  This back-end provides the models for "users" and "thoughts" as well as the schema for "reactions".  The "user" model normalizes "user" data with username, user email, their associated "thoughts" and a friends list.  The "thought" model normalizes "thought" data with the text of the thought, the user that created that thought, the date in which the thought was created, and "reactions" to that thought.  CRUD functionality for "user" includes:  add user, get all/single user, update user, remove user, add friend, and delete friend.  CRUD functionality for "thought" includes:  add thought, get all/single thought, update thought, remove thought, add reaction, and remove reaction.

## Installation <a name="installation"></a>
To run this application, please do the following: 

1. Clone the application's respository from GitHub onto your local drive.  The GitHub URL is: https://github.com/plainjane99/Social_Network_API.

2. Set up the ```npm``` package by running the following command in the root directory of the application: 
    
    ```
    npm install
    ```
    
    This will download the application's dependencies into your root directory.  You should now have a folder called ```node_modules``` and a file called ```package-lock.json```.  The ```package-lock.json``` file should include ```express``` and ```mongoose```.
3. A ```.gitignore``` file should be created to include:
    ```
    node_modules
    .env
    .DS_Store
    ```
    if you intend to push your code to a public repository.

## Usage <a name="usage"></a>
Once installation is complete:
1.  Run the application by typing the following into the command line at the root directory of the application:

    ```
    npm start
    ```
    
The application will start and indicate the server is running.

2. Once the server is running, route testing can be completed through Insomnia Core to test out the API routes in the ```/routes``` folder.  Per ```./server.js``` and ```/routes/index.js```, all routes will be located at ```localhost:3001/api```.  See ```/routes/api/index.js``` for applicable paths to CRUD functionality.

3.  A walk-through video demonstrating all functionality is located at the following link:
https://drive.google.com/file/d/1PVITT_94G2f2_xRDP963NwnSUnf5yNno/view?usp=sharing

## Contributing <a name="contributing"></a>
Contributions are welcome.  Please contact me regarding improvements, questions, or comments you would like to make.

## Tests <a name="tests"></a>
This application uses Insomnia Core as a testing method for all API routes.

## License <a name="license"></a>
This application is covered under the ISC license.

## Questions <a name="questions"></a>
My GitHub username is ```plainjane99```.  Please feel free to peruse my other projects.

If you have any questions regarding this application, please contact me via email at ```jane99hsu@gmail.com```.
  