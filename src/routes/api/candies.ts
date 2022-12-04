import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Candy, { ICandy, TCandy } from "../../models/Candys";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, birthday } = req.body;
    try {
      let candy: ICandy = await Candy.findOne({ name });

      if (candy) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Candy already exists",
            },
          ],
        });
      }
      const userFields: TCandy = {
        imageUrl,
        name,
        description,
        birthday
      };

      candy = new Candy(userFields);

      await candy.save();
      res.json(candy);
      const payload: Payload = {
        userId: candy.id,
      };
    } catch (err) {
      console.error(err.message);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  const { name, imageUrl, description, birthday } = req.body;
  try {
    const candy: ICandy[] = await Candy.find({});

    res.json(candy);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:candyId", async (req: Request, res: Response) => {
  const { candyId } = req.params;
  try {
    const deleted = await Candy.deleteOne({ _id: candyId });

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

router.patch("/:candyId", async (req: Request, res: Response) => {
  try {
    const updated = await Candy.findOneAndUpdate({ _id: req.params.candyId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
