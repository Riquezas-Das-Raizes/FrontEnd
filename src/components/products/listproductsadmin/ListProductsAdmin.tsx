import { useState, useContext, useEffect } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Product from "../../../models/Produto";
import { buscar } from "../../../services/Service";
import CardProductsAdmin from "../cardproductsadmin/CardProductsAdmin";
import { hotAlerta } from "../../../util/hotAlerta";


function ListProductsAdmin() {

    const navigate = useNavigate();

    const [products, setProducts] = useState<Product[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarProducts() {
        try {
            await buscar('/produtos', setProducts, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            hotAlerta('Você precisa estar logado', 'info')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarProducts()
    }, [products.length])

    return (
        <>
            {products.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-20'
            >
                {products.map((product) => (
                    <CardProductsAdmin key={product.id} product={product} />
                ))}

            </div>
        </>
    );
}

export default ListProductsAdmin;