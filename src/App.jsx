import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from './data/db'
import { useState, useEffect } from 'react'


function App() {
  
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    const [cart, setCart] = useState(initialCart)
    const [data] = useState(db)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    const addToCart = (item) => {

      const itemExists = cart.findIndex((i) => i.id === item.id)
        if(itemExists >=0) {
            if(cart[itemExists].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }else{
            item.quantity = 1
            setCart([...cart, item])
        }
        // saveLocalStorage  
    }
    
    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter((i) => i.id !== id))
    }

    const increaseQuantity = (id) => {
        const updatedCart =  cart.map((item) => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                quantity: item.quantity + 1
                }
            }
            return item
        }) 
        setCart(updatedCart)  
    }
    
    const decreaseQuantity = (id) => {
        const updatedCart =  cart.map((item) => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                quantity: item.quantity - 1
                }
            }
            return item
        }) 
        setCart(updatedCart)  
    }

    const clearCart = () => {
        setCart([])
    }
    
    /* const saveLocalStorage = (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart))
    } */
    
    return (
        <>
        <Header 
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            setCart={setCart}
            clearCart={clearCart}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Our Collection</h2>

            <div className="row mt-5">
                
                {data.map((guitar) => (
                    <Guitar 
                        key={guitar.id} 
                        guitar={guitar} 
                        setCart={setCart}
                        addToCart={addToCart}
                        />
                ))    
                }
                
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - All Rights Reserved</p>
            </div>
        </footer>
        </>
    )
}

export default App
