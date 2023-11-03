/**
 * Import express and store in a constant.
 */
const express = require("express");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); 
const postRoutes = require('./routes/postRoutes');
const PostModel = require("./models/Post"); 
const UserModel = require('./models/User'); 
/**
 * Create an express application by running express as a function,
 * and store it to a constant.
 */

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

/**
 * Define the port number that the express application should use.
 */
const port = 3000;

/**
 * Import the database connection file.
 */
const db = require("./config/database");


/**
 * Create a anonymous function to establish the database connection.
 * After the connection is established, start the server.
 */
const initApp = async () => {
    console.log("Testing the database connection..");
    /**
     * Test the connection.
     * You can use the .authenticate() function to test if the connection works.
     */
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        /**
         * Syncronize the Post model.
         */
        PostModel.sync({
            alter: true,
        });
        UserModel.sync({
            alter: true,
        });
        /**
         * Start the web server on the specified port.
         */
        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

/**
 * Initialize the application.
 */
initApp();