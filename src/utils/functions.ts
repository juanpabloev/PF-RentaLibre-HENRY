import { trpc } from "../utils/trpc";  
import { ChangeEvent, FormEvent,} from "react";

//aclaracion: estas funciones fueron creadas con el 
//proposito de evaluar el funcionamiento de la base de datos


// los mutate que no tienen parametros es porque en el back esta todo hardcodeado
export const createRatingProduct = trpc.rating.createRatingProduct.useMutation()
export const createRatingUser = trpc.rating.createRatingUser.useMutation()
export const deleteU = trpc.user.userDelete.useMutation()
export const createUser = trpc.user.createUser.useMutation()
export const createProduct = trpc.product.createProducts.useMutation()
export const deleteP = trpc.product.deleteProduct.useMutation()
export const updateP = trpc.product.updateProduct.useMutation()
export const updateR = trpc.rating.updateRating.useMutation()
export const deleteR = trpc.rating.deleteRating.useMutation()
export const addF= trpc.user.addFavorite.useMutation()
export const deleteF = trpc.user.deleteFavorite.useMutation()
export const makeTransaction = trpc.user.makeTransaction.useMutation()
export const createPayment= trpc.user.createPaymentMethod.useMutation()


export function handleSubmitUser (e: FormEvent<HTMLFormElement>,state:any) {
 e.preventDefault()
 createUser.mutate(state)
}

//al invocar las funciones: como segundo parametro le deben pasar la funcion que es para cambiar 
// su estado de react. A el tercer parametro tenes que pasarle el estado de react.
//ejemplo: handleSubmitUser(e,setEstado,estado)    
export function handleChangeUser (e: ChangeEvent<HTMLInputElement>,changeState: any,state: any) {
 changeState({
   ...state,
   [e.target.name]: e.target.value
 })
}

export function handleSubmitProduct (e: FormEvent<HTMLFormElement>,state: any) {
 e.preventDefault()
 createProduct.mutate(state)
}


export function handleChangeProduct (e: ChangeEvent<HTMLInputElement>,changeState:any,state: any) {
 if (e.target.name === 'availability1') {
    const dateToString1 = e.target.value + ''
    state.availability.dateAvailable[0]=dateToString1
   }
   if (e.target.name === 'availability2') {
     const dateToString2 = e.target.value + ''
     state.availability.dateAvailable[1]=dateToString2
    }
 changeState({
   ...state,
   [e.target.name]: e.target.value
 })
}

export function handleSubmitRating (e: FormEvent<HTMLFormElement>,state:any) {
 e.preventDefault()
 createRatingUser.mutate(state)
}


export function handleChangeRating (e: ChangeEvent<HTMLInputElement>,changeState:any,state:any) {
 changeState({
   ...state,
   [e.target.name]: e.target.value
 })
}

export function handleSubmitRatingProduct (e: FormEvent<HTMLFormElement>,state:any) {
 e.preventDefault()
 createRatingProduct.mutate(state)
}


export function handleChangeRatingProduct (e: ChangeEvent<HTMLInputElement>,changeState:any,state:any) {
 changeState({
   ...state,
   [e.target.name]: e.target.value
 })
}

export function createPaymentmethod (){
  createPayment.mutate()
 makeTransaction.mutate()
}

export function deleteProduct () {
  deleteP.mutate()
  deleteR.mutate()
}

export function updateProduct () {
 updateP.mutate()
 updateR.mutate()
}

export function deleteUser () {
 deleteU.mutate()
}

// export function addFavorite () {
//  addF.mutate()
// }

// export function deleteFavorite () {
//  deleteF.mutate()
// }