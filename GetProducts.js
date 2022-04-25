import React from 'react'
import Axios from "axios"
import "./style.css"

function GetProducts() {

    const [products, setProducts] = React.useState([])

    React.useEffect(function()
    {
        Axios.get("https://fakestoreapi.com/products").then(function(output)
        {
            const myArr = output.data
            setProducts(myArr)
        })
    }, [])


    function addToCart(event)
    {
        if(localStorage.getItem("cart") == null)
        {
            //If the condition is true, it means cart is not created in the local storage
            //To create that cart
            // var item_id = event.target.id
            // var productName = document.getElementById("name"+item_id).innerText
            // var productPrice = document.getElementById("price"+item_id).innerText
            // localStorage.setItem("cart", [item_id, productName, productPrice])
            //Create a simple javascript variable cart
            var cart = {}//2 informations, id and quantity.....{id: quantity}
        }
        else
        {
            cart = JSON.parse(localStorage.getItem("cart"))   
        }

        // var cart = {1: 4}

        var item_id = event.target.id//1
        if(cart[item_id] != undefined)
        {
            //Product is there in the cart
            cart[item_id] = cart[item_id] + 1
        }
        else
        {
            cart[item_id] = 1
        }

        //Javascript Object Cart --> Local Storage Cart
        localStorage.setItem("cart", JSON.stringify(cart))

    }

  return (
    <div className='complete'>
        <div className='row' style={{display: "flex"}}>
        {
            products.map(function(i)
            {
                return( 
                 <div className='col-md-4' key={i.id}>
                        <div className='card-deck'>
                        <div className="card" >
                            <h3>ID:{i.id}</h3>
                            <img className="card-img-top" src={i.image} alt="Card image cap" width="150px" height="350px"/>
                            <div className="card-body">
                            <h5 className="card-titlee" id={"name"+i.id}>{i.title}</h5>
                            <h5 className="card-title"><b id={"price"+i.id}>{i.price}</b></h5>
                            <p className="card-text"><b>Description:</b>{i.description}</p>
                           <div style={{display: "flex", justifyContent: "space-evenly"}}>
                            <button className='btn btn-success'>Buy Now</button>
                            <button className='btn btn-primary' onClick={addToCart} id={i.id}>Add to Cart</button>
                           </div>
                        </div>
                    </div>
                        </div>
                </div>
                )
            })
        }
        </div>
    </div>
  )
}

export default GetProducts

// localStorage --> container (Hold Some Information)
// Inside localStorage(Browser) --> Create the Cart --> Products Information
// create cart --> setItem()
// get info from the cart --> getItem()


// Local Storage --> JSON format

// JAVASCRIPT OBJECT
// var cart = {1: 3, 3: 5}

// JSON
// var cart = {"1": 3, "3": 5}