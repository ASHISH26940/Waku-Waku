import type { Request, Response } from "express";
import { prismaClient } from "@repo/db/client";

interface RegisterUserType extends Request {
    body:{
        id:string;
        email:string;
    }
}

export const registerUser=async (req:RegisterUserType,res:Response)=>{
    try{
        const {id,email}=req.body;
        if(!id || !email){
            res.status(400).json({
                message:"Please provide id and email",
                success:false
            })
            return;
        }
        const user=await prismaClient.user.findFirst({
            where:{
                id,
            },
        });
        if(user){
            res.json({
                success:true,
                message:"User already exists",
                user,
            })
        }
        const newUser=await prismaClient.user.upsert({
            where:{
                id,
                email,
            },
            update:{
                id,
                email,
            },
            create:{
                id,
                email,
            }
        });
        res.status(200).json({
            success:true,
            message:"User created successfully",
            user:newUser,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}