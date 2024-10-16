import { useEffect, useState } from "react";
import { FakestoreContract } from "../../contracts/FakestoreContract";
import axios from "axios";


export function APIDemo(){

    const [categories, setCategories] = useState<string[]>(['']);
    const [products, setProducts] = useState<FakestoreContract[]>();

    function LoadCategories():void
    {
        axios.get(`http://fakestoreapi.com/products/categories`)
        .then(response => {
            response.data.unshift("ALL");
            setCategories(response.data);
        })
    }

    function LoadProducts(url:string):void
    {
        axios.get(url)
        .then(response => {
            setProducts(response.data);
        })
    }

    useEffect(()=>{

        LoadCategories();
        LoadProducts(`http://fakestoreapi.com/products`)

    },[])

    function handleCAtegoryChange(e:any):void
    {
        if(e.target.value === 'all'){
            LoadProducts('http://fakestoreapi.com/products')
        } else {
            LoadProducts(`http://fakestoreapi.com/products/category/${e.target.value}`)
        }
    }

    return(
        <div className="container-fluid">
            <header>
                <div className="bg-dark p-3 text-white fw-bold text-center fs-5">Fakestore API</div>
            </header>
            <section className="row">
                <nav className="col-2">
                    <label className="form-label fw-bold">Select Category</label>
                    <div>
                        <select className="form-select" onChange={handleCAtegoryChange}>
                            {
                                categories?.map(category=> 
                                    <option value={category} key={category}>{category.toUpperCase()}</option>
                                )
                            }
                        </select>
                    </div>
                </nav>
                <main className="col-10 d-flex flex-wrap overflow-auto" style={{height:'500px'}}>
                    {
                        products?.map(product => 
                            <div key={product.id} className="card m-2 p-2" style={{width:'200px'}}>
                                <img src={product.image} className="card-img-top" height='140px'/>
                                <div className="card-header" style={{height:'150px'}}>
                                    {product.title}
                                </div>
                            </div>
                        )
                    }
                </main>
            </section>
        </div>
    );
}