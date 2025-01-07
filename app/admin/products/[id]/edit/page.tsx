import { EditProductForm } from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import { GoBackButton } from "@/components/ui/GoBackButton";
import { Heading } from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma" 
import { notFound } from "next/navigation";

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

export default async function EditProductPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  // Convertir el ID de los parámetros de búsqueda a número
  const productId = parseInt(searchParams.id, 10);
  if (isNaN(productId)) {
    notFound(); // Manejo de error si no es un número válido
  }
    const product=await getProductById(productId) 
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
