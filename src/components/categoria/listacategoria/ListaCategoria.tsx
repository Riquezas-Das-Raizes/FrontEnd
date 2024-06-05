import { useContext, useEffect, useState } from "react";
import Categoria from "../../../models/Categoria";
import { buscar } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import CardCategoria from "../cardcategoria/CardCategoria";
import { useNavigate } from "react-router-dom"; // Uncomment if navigation is needed

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  let navigate = useNavigate();

  async function listar() {
    try {
      await buscar("/categorias", setCategorias, {
        Authorization: token,
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        alert("O token expirou, favor logar novamente");
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado");
      navigate("/login");
    } else {
      listar();
    }
  }, [token]);

  useEffect(() => {
    listar();
  }, [categorias.length]);

  return (
    <>
      <div className="flex m-2 justify-center align-center">
        {categorias.map((categoria) => (
          <CardCategoria key={categoria.id} categoria={categoria} />
        ))}
      </div>
    </>
  );
}

export default ListaCategoria;
