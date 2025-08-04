'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, CreditCard, Send, ShoppingBag, Truck } from 'lucide-react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const checkoutSteps = [
  { id: 1, name: 'Shipping', icon: Truck },
  { id: 2, name: 'Payment', icon: CreditCard },
  { id: 3, name: 'Confirmation', icon: CheckCircle },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Cosmic Lane" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Starfield" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="state">State / Province</Label>
                        <Input id="state" placeholder="CA" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">ZIP / Postal Code</Label>
                        <Input id="zip" placeholder="90210" />
                    </div>
                </div>
            </div>
        );
      case 2:
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="**** **** **** 1234" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="card-name">Name on Card</Label>
                    <Input id="card-name" placeholder="Jane M. Doe" />
                </div>
            </div>
        );
      case 3:
        return (
            <div className="text-center p-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-headline text-primary">Thank you for your order!</h2>
                <p className="text-muted-foreground mt-2">Your order #ART12345 has been placed. A confirmation email is on its way.</p>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Left Side: Form */}
        <div>
          <div className="mb-8">
            <ol className="flex items-center w-full">
              {checkoutSteps.map((s, index) => (
                <li
                  key={s.id}
                  className={`flex w-full items-center ${index < checkoutSteps.length -1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${step >= s.id ? 'after:border-primary' : 'after:border-muted'}`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 transition-colors ${step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <s.icon className="w-5 h-5" />
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <Card>
                    <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{checkoutSteps[step - 1].name}</CardTitle>
                    <CardDescription>
                        {step === 1 ? 'Please enter your shipping details.' : step === 2 ? 'Enter your payment information.' : 'Your order is complete!'}
                    </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {renderStepContent()}
                    </CardContent>
                    {step < 3 && (
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
                            <Button onClick={handleNext} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                {step === 1 ? 'Proceed to Payment' : 'Place Order'}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    )}
                </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Order Summary */}
        <div className="row-start-1 lg:row-start-auto">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center">
                        <ShoppingBag className="mr-2" /> Order Summary
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                    <div className="flex items-center space-x-4">
                        <Image src="https://firebasestorage.googleapis.com/v0/b/artiflex-37b58.appspot.com/o/cosmic-weavers.png?alt=media&token=16a342a3-5c73-41c6-991c-7a72ce243734" alt="Orion Nebula T-Shirt" width={100} height={100} className="rounded-md border" data-ai-hint="galaxy t-shirt" />
                        <div>
                            <p className="font-semibold">Orion Nebula T-Shirt</p>
                            <p className="text-sm text-muted-foreground">Qty: 1</p>
                        </div>
                        <p className="ml-auto font-semibold">$35.00</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$35.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Taxes</span>
                            <span>$2.98</span>
                        </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>$42.98</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
