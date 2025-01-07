 import ProductSearchForm from '@/components/products/ProductSearchForm'
import ProductTable from '@/components/products/ProductsTable'
import { Heading } from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import React from 'react'
async function searchProducts(searchTerm:string) {
  const products=await prisma.product.findMany({
    where:{
      name:{
        contains:searchTerm,
        mode:'insensitive'
      }
    },
    include:{
      category:true
    }
  })
  return products
}
 
 export default async function  SearchPage({searchParams}:{searchParams:{search:string}}) {
    const url =await searchParams
    const products=await searchProducts(url.search)
   return (
    <>
    <Heading>Resultado de Busqueda: {url.search} </Heading>
    <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
        <ProductSearchForm/>
    </div>
    {
      products.length>0
      ?(<ProductTable products={products}/>)
      :(<p className='text-center text-lg'>No hay resultados</p>)
    }
     
    </>
   )
 }
 