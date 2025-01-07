"use server"

import { prisma } from "@/src/lib/prisma"
import {  ProductSchema } from "@/src/schema"

export async function createProduct(data:unknown) {
    const result=ProductSchema.safeParse(data)
    if (!result.success){
          return {
            errors:result.error.issues
          } 
    }
    try {
        await prisma.product.create({
            data:{
                name:result.data.name,
                image:result.data.image,
                categoryId:result.data.categoryId,
                price:result.data.price, 
                }
        })
        
    } catch (error) {
        console.log(error)
    }
}