import { useEffect, useState } from "react"


export default function Products() {

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=5')
        .then(res => res.json())
        .then(data => setProducts(data.products))
        .finally(() => {
            setLoading(false);
        })
    },[])

    if(loading) return "Loading..."

    return (
        <div>
            <h1>Products</h1>
            <div> 
                {products.map((product) => 
                    <p>{product.title}</p>
                )}
            </div>
        </div>
    )
}