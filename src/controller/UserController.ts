import { Request, Response, Router } from 'express';
import { UPLOAD_PATH, upload } from '../server';
import User from '../models/User';
import * as path from 'path';
import * as fs from 'fs';
import * as del from 'del';
import * as multer from 'multer';


class UserController {



    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public create(req, res): void {

        var upload = multer().single('image');
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading 
                return
            }

            const userId: string = req.body.userId;
            const userName: string = req.body.userName;
            const phoneNumber: Number = req.body.phoneNumber;
            const image = {
                filename: req.file.filename,
                originalName: req.file.originalname,
                desc: req.body.desc
            };



            const user = new User({
                userId,
                userName,
                phoneNumber,
                image


            });

            user.save()
                .then((data) => {
                    res.status(201).json({ data });
                })
                .catch((error) => {
                    res.status(500).json({ error });
                });
        })

    }

    // set up our routes
    public routes() {
        this.router.post('/', this.create);
    }

}

const userController = new UserController();
userController.routes();

export default userController.router;