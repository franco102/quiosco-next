import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

interface Store {
    order:OrderItem[],
    addToCart:(product:Product)=>void
    increaseQuantity:(id:Product['id'],value:number)=>void
    removeOrder:(id:Product['id'])=>void
    clearOrder:()=>void
}

export const useStore=create<Store>((set,get)=>({
    order:[],
    addToCart:(product)=>{
        const { categoryId, image,...data}=product
        let order:OrderItem[]=[]
        const orderValidate= get().order.find(item=>item.id===product.id)
        if(orderValidate){
            order=get().order.map(item=>
                item.id===product.id?{...item,quantity:item.quantity+1,subtotal:item.quantity*item.price}:item
            )
        }else {
            order=[...get().order,{...data,quantity:1,subtotal:1*product.price}]
        }
        set(state=>({
            order 
        }))
    },
    increaseQuantity:(id,value)=>{
        let order:OrderItem[]=get().order
        const orderValidate= get().order.find(item=>item.id===id)
        if(orderValidate&&(orderValidate.quantity>1||value>0)){
            order=get().order.map(item=>
                item.id===id?{...item,quantity:item.quantity+value,subtotal:(item.quantity+value)*item.price}:item
            )
        } 
        set(()=>({
            order 
        }))
    },
    removeOrder:(id)=>{
        set(()=>({
            order :get().order.filter(item=>item.id!==id) 
        }))
    },
    clearOrder:()=>{
        set(()=>({
            order:[]
        }))
    }
}))