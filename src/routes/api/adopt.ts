import { Router, Response } from "express";
import HttpStatusCodes from "http-status-codes";

import Payload from "../../types/Payload";
import Request from "../../types/Request";
import Adopt, { IAdopt, TAdopt } from "../../models/Adopt";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { name, imageUrl, description, birthday } = req.body;
    try {
      let adopt: IAdopt = await Adopt.findOne({ name });

      if (adopt) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: "Cat already exists",
            },
          ],
        });
      }
      const userFields: TAdopt = {
        imageUrl,
        name,
        description
      };

      adopt = new Adopt(userFields);

      await adopt.save();
      res.json(adopt);
      const payload: Payload = {
        userId: adopt.id,
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
    const adopt: IAdopt[] = await Adopt.find({});

    res.json(adopt);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

router.delete("/:adoptId", async (req: Request, res: Response) => {
  const { adoptId } = req.params;
  try {
    const deleted = await Adopt.deleteOne({ _id: adoptId });

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

router.patch("/:adoptId", async (req: Request, res: Response) => {
  try {
    const updated = await Adopt.findOneAndUpdate({ _id: req.params.adoptId }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
  }
}
);

export default router;
