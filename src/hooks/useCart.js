import React from 'react'
import { db } from '../data/db'
import { useState, useEffect, useMemo } from 'react'

export const useCart = () => {
  
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


     // Derived state
     const isEmpty = useMemo( () => cart.length === 0, [cart])
     const cartTotal = useMemo ( () => cart.reduce( (total, item) => total + item.price * item.quantity, 0), [cart])


    return {
        cart,
        data, 
        addToCart, 
        removeFromCart, 
        increaseQuantity, 
        decreaseQuantity, 
        clearCart,

        isEmpty,
        cartTotal,
    }
}
