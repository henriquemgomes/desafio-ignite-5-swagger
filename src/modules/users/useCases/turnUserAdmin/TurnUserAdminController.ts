import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const user = this.turnUserAdminUseCase.execute({
        user_id: request.params.user_id as string,
      });
      return response.json(user);
    } catch (error) {
      if (error.name === "notfound") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}

export { TurnUserAdminController };
