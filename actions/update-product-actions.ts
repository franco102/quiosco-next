"use server"

import { prisma } from "@/src/lib/prisma"
import {  ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data:unknown,id:number) {
    const result=ProductSchema.safeParse(data)
    if (!result.success){
          return {
            errors:result.error.issues
          } 
    }
    try {
        await prisma.product.update({
            where:{
                id
            },
            data:{
                name:result.data.name,
                image:result.data.image,
                categoryId:result.data.categoryId,
                price:result.data.price, 
                }
        })
        revalidatePath('/admin/products')
    } catch (error) {
        console.log(error)
    }
}