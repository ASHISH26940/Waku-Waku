export interface SignUpIncomingMessage{
    ip:string;
    publicKey:string;
    signedMessage:string;
    callbackId:string;
    location:string;
}

export interface ValidateIncomingMessage{
    callbackid:string;
    signedMessage:string;
    status:"GOOD"|"BAD";
    latency:number;
    websiteId:string;
    validatorId:string;
}

export interface SignUpOutgoingMessage{
    validatorId:string;
    callbackId:string;
}

export interface validateOutgoingMessage{
    url:string;
    callbackId:string;
    websiteId:string;
}

export type IncomingMessage=
 | {
    type:"signup",
    data:SignUpIncomingMessage
 }
 | {
    type:"validate",
    data:ValidateIncomingMessage
 }

 export type OutgoingMessage={
    type:"signup",
    data:SignUpOutgoingMessage
 } | {
    type:"validate",
    data:validateOutgoingMessage
 }