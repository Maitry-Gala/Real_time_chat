import express, {Request, Response} from 'express';
import "dotenv/config";
import { clerkMiddleware, clerkClient, getAuth } from '@clerk/express';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware());

app.get("/",async (req:Request, res: Response) => {
    const { isAuthenticated, userId } = getAuth(req)

    if(!isAuthenticated) {
        return res.status(401).json({
            error: "User not authenticated"
        })
    }

    const user = await clerkClient.users.getUser(userId)
    return res.json({user})
    console.log("BE working")
});

app.listen(PORT,() => {
    console.log(`Server is on port ${PORT}`);
});
