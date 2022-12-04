import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Coffee, { ICoffee, TCoffee } from "../../models/Coffee";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, money } = req.body;
    try {
      let coffee: ICoffee = await Coffee.findOne({ name });

      if (coffee) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Coffee already exists",
            },
          ],
        });
      }
      const userFields: TCoffee = {
        imageUrl,
        name,
        description,
        money
      };

      coffee = new Coffee(userFields);

      await coffee.save();
      res.json(coffee);
      const payload: Payload = {
        userId: coffee.id,
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
    const coffee: ICoffee[] = await Coffee.find({});

    res.json(coffee);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:coffeeId", async (req: Request, res: Response) => {
  const { coffeeId } = req.params;
  try {
    const deleted = await Coffee.deleteOne({ _id: coffeeId });

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

router.patch("/:coffeeId", async (req: Request, res: Response) => {
  try {
    const updated = await Coffee.findOneAndUpdate({ _id: req.params.coffeeId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
