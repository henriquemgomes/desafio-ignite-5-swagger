import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const requester: User = this.usersRepository.findById(user_id);
    if (!requester) {
      const error = new Error(
        "Erro ao listar todos os usuários: Usuário que solicitou a ação não existe."
      );
      error.name = "notfound";
      throw error;
    }
    if (!requester.admin) {
      throw new Error(
        "Erro ao listar todos os usuários: Apenas um admin pode listar todos os usuários."
      );
    }
    return this.usersRepository.list();
  }
}

export { ListAllUsersUseCase };
