'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { MinusCircle, PlusCircle, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MyCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const taxes = subtotal * 0.085;
  const total = subtotal + shipping + taxes;

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left Side: Cart Items */}
        <div className="lg:col-span-2">
           <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center text-2xl">
                        <ShoppingBag className="mr-2" /> Your Cart
                    </CardTitle>
                    <CardDescription>{cart.length} item(s) in your cart</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
                            <Link href="/">
                                <Button>Continue Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <Image src={item.imageUrl} alt={item.brandName} width={100} height={100} className="rounded-md border" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.brandName}</p>
                                        <p className="text-sm text-muted-foreground">{item.tagline}</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <MinusCircle className="h-4 w-4" />
                                            </Button>
                                            <span>{item.quantity}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <PlusCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8 mt-2" onClick={() => removeFromCart(item.id)}>
                                          <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Right Side: Order Summary */}
        <div className="row-start-1 lg:row-start-auto">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Taxes</span>
                            <span>${taxes.toFixed(2)}</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={cart.length === 0}>Proceed to Checkout</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}