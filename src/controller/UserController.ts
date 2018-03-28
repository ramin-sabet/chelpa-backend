import { Request, Response, Router } from 'express';
import User from '../models/User';

class UserController {

    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public create(req: Request, res: Response): void {
        
        const userId: string = req.body.userId;
        const username: string = req.body.username;


        const user = new User({
            userId,
            username
        });

        user.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });

    }

    // set up our routes
    public routes() {
        this.router.post('/', this.create);
    }

}

const userController = new UserController();
userController.routes();

export default userController.router;