import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Clothes, { IClothes,TClothes } from "../../models/ClothesPets";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, money } = req.body;
    try {
      let clothes: IClothes = await Clothes.findOne({ name });

      if (clothes) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Clothes item already exists",
            },
          ],
        });
      }
      const userFields: TClothes = {
        imageUrl,
        name,
        description,
        money
      };

      clothes = new Clothes(userFields);

      await clothes.save();
      res.json(clothes);
      const payload: Payload = {
        userId: clothes.id,
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
    const clothes: IClothes[] = await Clothes.find({});

    res.json(clothes);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:clothesId", async (req: Request, res: Response) => {
  const { clothesId } = req.params;
  try {
    const deleted = await Clothes.deleteOne({ _id: clothesId });

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

router.patch("/:clothesId", async (req: Request, res: Response) => {
  try {
    const updated = await Clothes.findOneAndUpdate({ _id: req.params.clothesId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
