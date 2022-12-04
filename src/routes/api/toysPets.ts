import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Toys, { IToys,TToys } from "../../models/ToysPets";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, money } = req.body;
    try {
      let toys: IToys = await Toys.findOne({ name });

      if (toys) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Toy item already exists",
            },
          ],
        });
      }
      const userFields: TToys = {
        imageUrl,
        name,
        description,
        money
      };

      toys = new Toys(userFields);

      await toys.save();
      res.json(toys);
      const payload: Payload = {
        userId: toys.id,
      };
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  const { name, imageUrl, description, money } = req.body;
  try {
    const toys: IToys[] = await Toys.find({});

    res.json(toys);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:toysId", async (req: Request, res: Response) => {
  const { toysId } = req.params;
  try {
    const deleted = await Toys.deleteOne({ _id: toysId });

    if(deleted.deletedCount) {
      res.status(200)
      res.send()
    }
    else {
      res.status(404);
      res.send()
    }
    
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.patch("/:toysId", async (req: Request, res: Response) => {
  try {
    const updated = await Toys.findOneAndUpdate({ _id: req.params.toysId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
