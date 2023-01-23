import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      const error = new Error(
        "Erro ao transformar usuário em admin: Usuário não encontrado."
      );
      error.name = "notfound";
      throw error;
    }
    return this.usersRepository.turnAdmin(user);
  }
}

export { TurnUserAdminUseCase };
