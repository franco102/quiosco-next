'use client'
import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps ={
    product:Product
}

const AddProductButton = ({product}:AddProductButtonProps) => {
    const addToCart=useStore(state=>state.addToCart)
  return (
    <button 
        onClick={()=>addToCart(product)}
        type="button" 
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer">
        Agregar
    </button>
  )
}

export default AddProductButton