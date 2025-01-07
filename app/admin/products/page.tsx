import ProductSearchForm from '@/components/products/ProductSearchForm'
import { ProductsPagination } from '@/components/products/ProductsPagination'
import ProductTable from '@/components/products/ProductsTable'
import { Heading } from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function productCount() {
  const  products=await prisma.product.count()
  return products
}
async function getProducts(skip:number) {
  const  products=await prisma.product.findMany({
    take:10,
    skip,
    include:{
      category:true
    }
  })
  return products
}

export type ProductsWithCategory =Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams}:{searchParams:{page:string}})   {
  const url=await searchParams
  const page=+url.page||1 
  const pageSize=10
  const skip=(page-1)*pageSize

  if(page<0)  redirect('/admin/products')

  const productsData = getProducts(skip)
  const totalProductsData = productCount()
  const [products,totalProducts]=await Promise.all([productsData,totalProductsData])
  const totalPages=Math.ceil(totalProducts/pageSize)

  if(page>totalPages) redirect('/admin/products') 

  return (
    <>
      <Heading>
            Administrar Productos
      </Heading> 
      <div className='flex flex-col lg:flex-row lg:justify-between gap-5'>
        <Link 
          className='bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer'
          href={'/admin/products/new'}>
          Crear Producto
        </Link>
        <ProductSearchForm/>
      </div>
      <ProductTable products={products}/>
      <ProductsPagination page={page } totalPages={totalPages}/>
    </>
  )
}
  