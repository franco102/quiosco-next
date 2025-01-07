import { EditProductForm } from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { Heading } from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma"
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

async function getProductById(id:number) {
    const product=await prisma.product.findUnique({
            where:{
                id
            }
        }
    )
    if(!product){
        notFound()
    }
    return product
}

export default async function EditProductPage({params}:{params:{id:string}})  {
    const productParam=await params;
    const product=await getProductById(+productParam.id)
    console.log(product)
  return (
    <>
          <Heading>Editar Producto: {product.name}</Heading>
          <GoBackButton/>
          <EditProductForm>
            <ProductForm  product={product}/>  
          </EditProductForm>
        </>
  )
}
