import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
