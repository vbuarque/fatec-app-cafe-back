import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Cats, { ICats, TCats } from "../../models/Cats";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, birthday } = req.body;
    try {
      let cat: ICats = await Cats.findOne({ name });

      if (cat) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Cat already exists",
            },
          ],
        });
      }
      const userFields: TCats = {
        imageUrl,
        name,
        description,
        birthday
      };

      cat = new Cats(userFields);

      await cat.save();
      res.json(cat);
      const payload: Payload = {
        userId: cat.id,
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
    const cats: ICats[] = await Cats.find({});

    res.json(cats);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:catId", async (req: Request, res: Response) => {
  const { catId } = req.params;
  try {
    const deleted = await Cats.deleteOne({ _id: catId });

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

router.patch("/:catId", async (req: Request, res: Response) => {
  try {
    const updated = await Cats.findOneAndUpdate({ _id: req.params.catId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
