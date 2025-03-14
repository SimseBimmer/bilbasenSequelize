import express from "express";
import { config } from "dotenv";
import dotenv from "dotenv";
import dbConfig from "./config/dbConfig.js";
import carController from "./controllers/carController.js";
import dbController from "./controllers/dbcontroller.js";
import brandController from "./controllers/brandController.js";
import categoryController from "./controllers/categoryController.js";
import userController from "./controllers/userController.js"; 
dotenv.config();

config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: 'velkommen'
    });
});

app.get("/test", async (req, res) => {
    try {
        await dbConfig.authenticate();
        res.status(200).send({
            message: 'Database Successfully Connected'
        });
    } catch (error) {
        res.status(501).send({
            message: `Database Connection Failed: ${error}`
        });
    }
});

// Route to synchronize the database
app.get('/sync', async (req, res) => {
  try {
    const resp = await dbConfig.sync({ force: true }); // Use { force: true } to force sync
    res.send('Data successfully synchronized');
  } catch (err) {
    res.send(err);
  }
});

// Include carController for handling car-related routes
app.use("/cars", carController);

// Include dbController for handling database synchronization
app.use("/db", dbController);

// Include brandController for handling brand-related routes
app.use("/brands", brandController);

// Include categoryController for handling category-related routes
app.use("/categories", categoryController);

// Include userController for handling user-related routes
app.use("/users", userController); // Ensure this line is correct

app.get("*", (req, res) => {
    res.json({
        message: '404'
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});