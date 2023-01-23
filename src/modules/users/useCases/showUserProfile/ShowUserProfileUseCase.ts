import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      const error = new Error(
        "Erro ao exibir perfil de usuário: Usuário não encontrado."
      );
      error.name = "notfound";
      throw error;
    }
    return user;
  }
}

export { ShowUserProfileUseCase };
