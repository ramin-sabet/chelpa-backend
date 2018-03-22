import { Request, Response, Router } from 'express';
import Option from '../models/Option';

class OptionController {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public suggestedOptions(req: Request, res: Response): void {
    
    Option.find({ "name": { "$regex": req.query.keyword, "$options": "i" } },{name :1 ,_id:0}).limit(parseInt(req.query.limit))
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  
  }

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
   

    const option = new Option({
      name
    });

    option.save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

  }
  public routes() {
    this.router.get('/', this.suggestedOptions);
    // this.router.get('/:username', this.one);
    this.router.post('/', this.create);
    // this.router.put('/:username', this.update);
    // this.router.delete('/:username', this.delete);
  }

}

const optionController = new OptionController();
optionController.routes();

export default optionController.router;