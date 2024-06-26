import Categoria from "./Categoria";
import Usuario from "./Usuario";

export default interface Product {
  id: number,
  nome: string,
  preco: number,
  imagem: string,
  descricao: string,
  categoria?: Categoria | null,
  usuario?: Usuario | null
}