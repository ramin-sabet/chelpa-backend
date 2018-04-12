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
            // const image = {
            //     filename: req.file.filename,
            //     originalName: req.file.originalname,
            //     desc: req.body.desc
            // };



            const user = new User({
                userId,
                userName,
                phoneNumber,
                // image


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


    public getUser(req: Request, res: Response): void {
        const userId: string = req.params._id;

        User.findOne({ userId })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }


    public updateUser(req: Request, res: Response): void {
        const userId: string = req.params._id;

        User.findOneAndUpdate({ userId }, {
            $set: {
                maleFemale: req.body.maleFemale,
                studyWork: req.body.studyWork,
                study: req.body.study,
                studyField: req.body.studyField,
                work: req.body.work,
                workField: req.body.workField,
                interests: req.body.interests,
            }
        })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // set up our routes
    public routes() {
        this.router.post('/', this.create);
        this.router.get('/:_id', this.getUser);
        this.router.put('/:_id', this.updateUser);
    }

}

const userController = new UserController();
userController.routes();

export default userController.router;