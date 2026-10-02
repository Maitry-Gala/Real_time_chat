import express, {Request, Response} from 'express';
import "dotenv/config";
import { clerkMiddleware, clerkClient, getAuth } from '@clerk/express';
import { connectToMongoDB } from './lib/db.js';
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({origin: FRONTEND_URL, credentials:true}));
app.use(clerkMiddleware());

// app.get("/",async (req:Request, res: Response) => {
//     const { isAuthenticated, userId } = getAuth(req)

//     if(!isAuthenticated) {
//         return res.status(401).json({
//             error: "User not authenticated"
//         })
//     }

//     const user = await clerkClient.users.getUser(userId)
//     return res.json({user})
// });

app.get("/health", (req: Request, res:Response) => {
    res.status(200).json({
        "message": "Server is running"
    })
})

connectToMongoDB().then(() => {
    app.listen(PORT,() => {
        console.log(`Server is on port ${PORT}`);
    });
})

