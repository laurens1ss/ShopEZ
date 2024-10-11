"use client"

import { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CreateAccount } from '../components/menu/create-account'
import { CheckoutMenu } from '../components/menu/checkout-menu'

type Product = {
  id: number
  name: string
  price: number
  image: string
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, image: "/images/laptop.jpg?height=200&width=300" },
  { id: 2, name: "Smartphone", price: 499.99, image: "/images/smartphone.jpg?height=200&width=300" },
  { id: 3, name: "Headphones", price: 99.99, image: "/images/headphones.jpg?height=200&width=300" },
]

export default function Component() {
  const [cart, setCart] = useState<Product[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const totalItems = cart.length
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  const handleAccountCreated = (newUsername: string) => {
    setIsLoggedIn(true)
    setUsername(newUsername)
  }

  const handleCheckout = () => {
    setIsCheckoutOpen(true)
  }

  if (!isLoggedIn) {
    return <CreateAccount onAccountCreated={handleAccountCreated} />
  }

  if (isCheckoutOpen) {
    return <CheckoutMenu cart={cart} totalPrice={totalPrice} onClose={() => setIsCheckoutOpen(false)} />
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto mb-4">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">ShopEZ</CardTitle>
        </CardHeader>
      </Card>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {username}!</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <h3 className="font-semibold mb-2">Shopping Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="mt-4 font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </div>
                <Button className="w-full mt-4" onClick={handleCheckout}>
                  Checkout
                </Button>
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="cursor-pointer" onClick={() => addToCart(product)}>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover mb-4 rounded-md"
              />
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{product.name}</h3>
                <span className="text-primary">${product.price.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}