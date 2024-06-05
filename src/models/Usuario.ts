import Produto from "./Produto";

export default interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  admin: boolean;
  produto?: Produto | null;
}
