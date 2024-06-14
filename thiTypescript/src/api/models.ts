import * as Yup from "yup" 
export interface Iproduct {
    id: number;
    price: number;
    name: string;
    description: string;
    madein: string;
    trademart: string;
}

export const addSchema = Yup.object({
    name: Yup.string().required().trim(),
    price:Yup.number().required(),
    description:Yup.string().min(10).required().trim(),
    madein:Yup.string().required().trim(),
    trademart:Yup.string().required().trim(),
})
export type AddForm = Yup.InferType<typeof addSchema>

export const updateSchema = Yup.object({
    name: Yup.string().required().trim(),
    price:Yup.number().required(),
    description:Yup.string().min(10).required().trim(),
    madein:Yup.string().required().trim(),
    trademart:Yup.string().required().trim(),
})
export type updateForm = Yup.InferType<typeof updateSchema>

export const signupSchema = Yup.object({
    name: Yup.string().required().trim(),
    email:Yup.string().required(),
    password:Yup.string().min(7).required().trim(),
    confirmPassword:Yup.string().oneOf([Yup.ref("password")]).required().trim(),
})
export type signupForm = Yup.InferType<typeof signupSchema>

export const signinSchema = Yup.object({
    email:Yup.string().required(),
    password:Yup.string().min(7).required().trim(),
})
export type signinForm = Yup.InferType<typeof signinSchema>