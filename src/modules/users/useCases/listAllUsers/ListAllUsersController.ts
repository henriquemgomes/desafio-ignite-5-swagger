import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      return response.json(
        this.listAllUsersUseCase.execute({
          user_id: request.headers.user_id as string,
        })
      );
    } catch (error) {
      if (error.name === "notfound") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ListAllUsersController };
