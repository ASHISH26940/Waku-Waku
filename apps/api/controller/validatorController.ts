import type { Request,Response } from "express";
import { prismaClient } from "@repo/db/client";
import sendBalanceToUser from "../utils/sendBalanceToUser";

import {LAMPORTS_PER_SOL} from "@solana/web3.js";

interface ValidatorRequest extends Request {
    body:{
        publicKey:string;
        ip:string;
        location:string;
    }
}

interface withdrawAmount extends Request {
    body:{
        validatorId:string;
    }
}
export const getValidator=async (req:ValidatorRequest,res:Response)=>{
    try{
        const {publicKey,ip,location}=req.body;
        if(!publicKey || !ip || !location){
            res.status(400).json({
                message:"Please provide publicKey, ip and location"
            });
        }
        const validator=await prismaClient.validator.findFirst({
            where:{
                publicKey,
            },
            include:{
                ticks:true
            }
        });
        if (validator) {
            res.json({
              success: true,
              message: "Validator found",
              validator,
            });
            return;
        }
        const newValidator=await prismaClient.validator.create({
            data:{
                publicKey,
                ip,
                location,
            },
            include:{
                ticks:true
            }
        });
        res.json({
            success:true,
            message:"Validator created successfully",
            validator:newValidator,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error",
            success:false,
            error:err
        })
    }
}

export const withdrawAmount=async (req:withdrawAmount,res:Response)=>{
    try{
        const {validatorId}=req.body;
        const validator=await prismaClient.validator.findUnique({
            where:{
                id:validatorId
            },
        })
        if(!validator){
            res.json({
                message:"validator not found",
                success:"false"
            })
            return;
        }
        const toAddress=validator.publicKey;
        const amount:number =validator.pendingPayouts / LAMPORTS_PER_SOL;
        if(amount<=0){
            res.status(400).json({
                message:"Insufficient balance",
                sucess:"false"
            });
        }
        const transactionSignature=await sendBalanceToUser(amount,toAddress);
        const transaction={
            amount,
            signature:transactionSignature,
            timestamp:new Date()
        };
        const updatedHistory=Array.isArray(validator.history)
        ?[...validator.history,transaction]
        :[transaction];
        await prismaClient.validator.update({
            where:{
                id:validatorId,
            },
            data:{
                pendingPayouts:0,
                history:updatedHistory
            }
        })
        res.json({
            success:true,
            message:`balance of ${amount} SOL deposited successfully`,
            signature:transactionSignature
        })


    }catch(err){
        console.log(err);
        res.json({
        success: false,
        message: "Internal server error",
        });
    }
}