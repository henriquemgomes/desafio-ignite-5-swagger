import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const userProfile = this.showUserProfileUseCase.execute({
        user_id: request.params.user_id as string,
      });
      return response.json(userProfile);
    } catch (error) {
      if (error.name === "notfound") {
        return response.status(404).json({ error: error.message });
      }
      return response.status(400).json({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
