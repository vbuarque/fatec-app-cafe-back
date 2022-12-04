import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Health, { IHealth, THealth } from "../../models/HealthPets";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, money } = req.body;
    try {
      let health: IHealth = await Health.findOne({ name });

      if (health) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Health item already exists",
            },
          ],
        });
      }
      const userFields: THealth = {
        imageUrl,
        name,
        description,
        money
      };

      health = new Health(userFields);

      await health.save();
      res.json(health);
      const payload: Payload = {
        userId: health.id,
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
    const health: IHealth[] = await Health.find({});

    res.json(health);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:healthId", async (req: Request, res: Response) => {
  const { healthId } = req.params;
  try {
    const deleted = await Health.deleteOne({ _id: healthId });

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

router.patch("/:healthId", async (req: Request, res: Response) => {
  try {
    const updated = await Health.findOneAndUpdate({ _id: req.params.healthId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
