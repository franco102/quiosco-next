"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data:unknown) {
    const result=OrderSchema.safeParse(data)
    if (!result.success){
          return {
            erros:result.error.issues
          } 
    }
    try {
        const resultOrder =await prisma.order.create({
            data:{
                name:result.data.name,
                total:result.data.total,
                orderProducts:{
                    create:result.data.order.map(product=>({
                        productId:product.id,
                        quantity:product.quantity
                    }))
                }
            }
        })
        console.log(resultOrder)
    } catch (error) {
        console.log(error)
    }
}