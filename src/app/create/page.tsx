'use client';

import { useState, useRef } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Sparkles, CheckCircle, Wand2, Upload, DollarSign } from 'lucide-react';
import { createDescription, publishProduct } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

const productTypes = [
  { id: 't-shirt', label: 'T-Shirt', description: 'Classic cotton tee' },
  { id: 'hoodie', label: 'Hoodie', description: 'Cozy pullover hoodie' },
  { id: 'mug', label: 'Mug', description: 'Ceramic coffee mug' },
  { id: 'poster', label: 'Poster', description: 'High-quality art print' },
];

const formSchema = z.object({
  productName: z.string().min(3, 'Product name is required'),
  productCategory: z.string().min(3, 'Product category is required'),
  productFeatures: z.string().min(10, 'Please list some key features'),
  brandIdentity: z.string().min(5, 'Brand identity is required'),
  targetAudience: z.string().min(5, 'Target audience is required'),
  keywords: z.string().min(3, 'Keywords are required'),
});

type FormValues = z.infer<typeof formSchema>;

const steps = [
  { id: 1, name: 'Choose Product' },
  { id: 2, name: 'Brand Identity' },
  { id: 3, name: 'Product Details' },
  { id: 4, name: 'Generate Description' },
  { id: 5, name: 'Publish' },
];

export default function CreatePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({ price: 50 });
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleNext = (data?: any) => {
    setFormData((prev: any) => ({ ...prev, ...data }));
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        setFormData({ ...formData, imageUrl: dataUri });
      };
      reader.readAsDataURL(file);
    }
  };

  const onGenerate: SubmitHandler<FormValues> = async (data) => {
    setIsGenerating(true);
    setGeneratedDescription('');
    handleNext(data);

    const result = await createDescription({
      ...formData,
      ...data
    });

    setIsGenerating(false);
    if (result.success && result.description) {
      setGeneratedDescription(result.description);
      toast({
        title: 'Description Generated!',
        description: 'Your unique product description is ready.',
        variant: 'default'
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Could not generate description.',
        variant: 'destructive',
      });
      setStep(4); // Go back to the form if generation fails
    }
  };
  
  const handlePublish = async () => {
    setIsPublishing(true);
    const productData = {
      brandName: formData.brandName,
      tagline: formData.tagline,
      price: formData.price,
      storySnippet: generatedDescription.substring(0, 100) + '...',
      imageUrl: formData.imageUrl,
    };
    
    const result = await publishProduct(productData);
    setIsPublishing(false);

    if(result.success) {
        toast({
            title: 'Product Published!',
            description: 'Your product is now live in the marketplace.',
        });
        router.push('/');
    } else {
        toast({
            title: 'Error',
            description: result.error || 'Could not publish product.',
            variant: 'destructive',
        });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <CardContent>
            <RadioGroup onValueChange={(val) => handleNext({ productType: val })} defaultValue={formData.productType}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {productTypes.map((product) => (
                  <Label key={product.id} htmlFor={product.id} className="block cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm p-4 has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-colors">
                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value={product.id} id={product.id} />
                      <div>
                        <p className="font-semibold">{product.label}</p>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        );
      case 2:
        return (
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input id="brandName" defaultValue={formData.brandName} onChange={e => setFormData({...formData, brandName: e.target.value})} placeholder="e.g., Cosmic Weavers" />
            </div>
            <div>
              <Label htmlFor="tagline">Brand Tagline</Label>
              <Input id="tagline" defaultValue={formData.tagline} onChange={e => setFormData({...formData, tagline: e.target.value})} placeholder="e.g., Threads of the universe, woven for you." />
            </div>
          </CardContent>
        );
      case 3:
        return (
          <CardContent className="space-y-6">
            <div>
                <Label>Product Image</Label>
                <div 
                    className="mt-2 flex justify-center items-center w-full h-64 border-2 border-dashed rounded-md cursor-pointer hover:border-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg, image/gif" className="hidden" />
                    {imagePreview ? (
                        <Image src={imagePreview} alt="Product preview" width={256} height={256} className="object-contain h-full w-full"/>
                    ) : (
                        <div className="text-center text-muted-foreground">
                            <Upload className="mx-auto h-12 w-12" />
                            <p>Click to upload an image</p>
                            <p className="text-xs">PNG, JPG, GIF up to 10MB</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <Label>Product Price</Label>
                <div className="flex items-center gap-4 mt-2">
                    <DollarSign className="h-6 w-6 text-muted-foreground" />
                    <Slider
                        defaultValue={[formData.price]}
                        min={3}
                        max={500}
                        step={1}
                        onValueChange={(value) => setFormData({...formData, price: value[0]})}
                    />
                    <span className="font-bold text-lg w-24 text-right">${formData.price.toFixed(2)}</span>
                </div>
            </div>
          </CardContent>
        );
      case 4:
        return (
          <form onSubmit={handleSubmit(onGenerate)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input id="productName" {...register('productName')} placeholder="e.g., Orion Nebula T-Shirt" />
                  {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName.message}</p>}
                </div>
                <div>
                  <Label htmlFor="productCategory">Product Category</Label>
                  <Input id="productCategory" {...register('productCategory')} placeholder="e.g., Space-themed Apparel" />
                   {errors.productCategory && <p className="text-red-500 text-sm mt-1">{errors.productCategory.message}</p>}
                </div>
              </div>
              <div>
                <Label htmlFor="productFeatures">Key Features</Label>
                <Textarea id="productFeatures" {...register('productFeatures')} placeholder="e.g., 100% organic cotton, glow-in-the-dark ink, athletic fit..." />
                 {errors.productFeatures && <p className="text-red-500 text-sm mt-1">{errors.productFeatures.message}</p>}
              </div>
              <div>
                <Label htmlFor="brandIdentity">Brand Identity</Label>
                <Input id="brandIdentity" {...register('brandIdentity')} placeholder="e.g., Mysterious, awe-inspiring, high-quality" />
                 {errors.brandIdentity && <p className="text-red-500 text-sm mt-1">{errors.brandIdentity.message}</p>}
              </div>
              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Input id="targetAudience" {...register('targetAudience')} placeholder="e.g., Stargazers, sci-fi lovers, artists" />
                {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience.message}</p>}
              </div>
               <div>
                <Label htmlFor="keywords">SEO Keywords</Label>
                <Input id="keywords" {...register('keywords')} placeholder="e.g., galaxy, space, nebula, stars, astronomy" />
                {errors.keywords && <p className="text-red-500 text-sm mt-1">{errors.keywords.message}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90" disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Generate with AI
              </Button>
            </CardFooter>
          </form>
        );
      case 5:
        return (
           <CardContent className="space-y-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-center p-8 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h3 className="text-xl font-headline">Generating your masterpiece...</h3>
                <p className="text-muted-foreground">Our AI is weaving words from cosmic dust. Please wait.</p>
              </div>
            ) : (
              <div>
                <Label>Generated Product Description</Label>
                <Textarea value={generatedDescription} onChange={(e) => setGeneratedDescription(e.target.value)} rows={10} className="font-body text-base" />
              </div>
            )}
          </CardContent>
        );
        default: return null;
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl md:text-5xl font-headline text-center mb-2">Creator Journey</h1>
      <p className="text-center text-lg text-muted-foreground mb-8">Bring your vision to life, step by step.</p>
      
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between mb-8">
            {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}>
                        {step > s.id ? <CheckCircle size={16}/> : s.id}
                    </div>
                    <p className={`ml-2 font-medium ${step >= s.id ? 'text-foreground' : 'text-muted-foreground'}`}>{s.name}</p>
                    {index < steps.length - 1 && <div className={`flex-1 h-0.5 ml-4 ${step > s.id ? 'bg-primary' : 'bg-secondary'}`} />}
                </div>
            ))}
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl text-primary">{steps[step-1].name}</CardTitle>
                        <CardDescription>
                            {
                                step === 1 ? "Start by selecting a base product to customize." :
                                step === 2 ? "Define what makes your brand unique." :
                                step === 3 ? "Upload an image and set your price." :
                                step === 4 ? "Provide details for our AI to craft a compelling story." :
                                "Review your AI-generated description and publish!"
                            }
                        </CardDescription>
                    </CardHeader>
                    
                    {renderStep()}

                    {step !== 4 && (
                        <CardFooter className="flex justify-between">
                            <Button variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
                            {step < steps.length ?
                                <Button onClick={() => handleNext()}>Next</Button> :
                                <Button onClick={handlePublish} disabled={isPublishing || !formData.imageUrl} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> :<Sparkles className="mr-2 h-4 w-4" />} 
                                    Publish to Marketplace
                                </Button>
                            }
                        </CardFooter>
                    )}
                </Card>
            </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
