import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Food, { IFood,TFood } from "../../models/FoodPets";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, money } = req.body;
    try {
      let food: IFood = await Food.findOne({ name });

      if (food) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Food item already exists",
            },
          ],
        });
      }
      const userFields: TFood = {
        imageUrl,
        name,
        description,
        money
      };

      food = new Food(userFields);

      await food.save();
      res.json(food);
      const payload: Payload = {
        userId: food.id,
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
    const food: IFood[] = await Food.find({});

    res.json(food);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:foodId", async (req: Request, res: Response) => {
  const { foodId } = req.params;
  try {
    const deleted = await Food.deleteOne({ _id: foodId });

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

router.patch("/:foodId", async (req: Request, res: Response) => {
  try {
    const updated = await Food.findOneAndUpdate({ _id: req.params.foodId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
