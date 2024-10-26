import express from "express";
import bodyParser from "body-parser";
import main from "./server/routes/main.js";
import methodOverride from 'method-override';
import expressEjsLayouts from "express-ejs-layouts";

const app = express();
const PORT = process.env.PORT || 8080

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

app.use(expressEjsLayouts);

app.use("/", main);


app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
})
