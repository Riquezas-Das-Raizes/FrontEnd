import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";
import Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrarCategoria } from "../../../services/Service";
import { hotAlerta } from "../../../util/hotAlerta";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const [isLoading, setLoading] = useState<boolean>(false);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    Authorization: token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('401')) {
                hotAlerta('Token expirado!', 'info');
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            hotAlerta('Você precisa estar logado!', 'sucesso');
            navigate('/login');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);
        }
    }, [id]);

    function stateActually(event: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [event.target.name]: event.target.value
        });
    }

    function retornar() {
        navigate('/categorias');
    }

    async function generationNewCategory(event: React.ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        try {
            if (id !== undefined) {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                });
                hotAlerta('Categoria atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrarCategoria(`/categorias`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                });
                hotAlerta('Categoria cadastrada com sucesso!', 'sucesso');
            }
        } catch (error: any) {
            if (error.toString().includes('401')) {
                hotAlerta('O token expirou!', 'info');
                handleLogout();
            } else {
                hotAlerta('Erro ao processar a solicitação!', 'erro');
            }
        }

        setLoading(false);
        retornar();
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto
        bg-gradient-to-b from-custom-beige to-white rounded-lg
        shadow-lg px-10 py-5 w-[90%] max-w-md">
            <h1 className="text-2xl text-center my-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {id === undefined ? 'Cadastrar Categoria' : 'Editar Categoria'}
            </h1>

            <form className="w-full flex flex-col gap-4" onSubmit={generationNewCategory}>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Nome"
                        name='nome'
                        className="border-2 border-slate-700 rounded p-2 w-full"
                        value={categoria.nome || ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => stateActually(e)}
                    />
                </div>
                <button className="rounded text-slate-100 bg-custom-green hover:bg-custom-emerald w-1/2 py-2 mx-auto flex justify-center" type="submit">
                    {
                        isLoading ? (
                            <RotatingLines strokeColor='white' strokeWidth='5' animationDuration='0.75' width='24' visible={true} />
                        ) : (
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                        )
                    }
                </button>
            </form>
        </div>
    );
}

export default FormCategoria;
