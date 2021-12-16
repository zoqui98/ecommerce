import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/Dataprovider";
import { useParams } from "react-router-dom/";
import { ProductoItem } from "./ProductsItem";

export const ProductDetails = () =>{
    const value = useContext(DataContext)
    const [productos] = value.productos;
    const addCarrito = value.addCarrito;
    const [detalle,setDetalle] = useState([])
    const [url, setUrl] = useState(0);
    const [images, setImages] = useState('')
    const params = useParams();
    let item = 0;

    useEffect(()=>{
        productos.forEach(producto => {
            if(producto.id === parseInt(params.id)){
                setDetalle(producto)
                setUrl(0)
            }
        })
    },[params.id,productos])

    useEffect(()=>{
        const values = `${detalle.img1}${url}${detalle.img2}`
        setImages(values);
    },[url, params.id])


    const handleInput = e =>{
        const number = e.target.value.toString().padStart(2,'01');
        setUrl(number)        
    }

    if(detalle.length < 1) return null;

    return(
        <>
            {
                <div className="detalles">
                    <h2>{detalle.title}</h2>
                    <p className="price">${detalle.price}</p>
                    <div className="grid">
                        <p className="nuevo">Nuevo</p>
                        <div className="size">
                            <select placeholder="Tamaño">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                <option value='9'>9</option>
                            </select>
                            <p>Tamaño</p>
                        </div>
                    </div>
                    <button onClick={()=>addCarrito(detalle.id)}>Agregar al carrito</button>
                    {
                        url ? <img src={images} alt={detalle.title}/> : <img src={detalle.image} alt={detalle.title}/>
                    }
                    <input type='range' min='1' max='36' value={url} onChange={handleInput}/>
                    <div className="description">
                        <p><b> Description: </b>
                        The icons (.svg) files are free to download and are licensed under CC 4.0 By downloading it is assumed that you agree with the terms mentioned in CC 4.0.
                        The fonts files are licensed under SIL OFL 1.1.
                        Attribution is not required but is appreciated.
                        Other files which are not fonts or icons are licensed under the MIT License.
                        </p>
                    </div>
                </div>
            }
            
    <h2 className="relacionados">Productos relacionados</h2>
    <div className="productos">
      {
        productos.map((producto)=>{
          if((item < 6)&&(detalle.category === producto.category)){
            item++;
          return <ProductoItem 
          key={producto.id}
          title={producto.title}
          image={producto.image}
          category={producto.category}
          price={producto.price}
          id={producto.id}
          />
          }
          
        
        })
      }
     
    </div>
    </>
  )
}