"use client"
import { useCartStore } from '@/store/useCartStore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef } from 'react'

export default function CartSyncProvider() {
    const {status}=useSession();
    console.log({status})
    const setAuthStatus=useCartStore(state=>state.setAuthStatus)
    const hasMerged=useRef(false)
    useEffect(()=>{
        if(status==="authenticated"){
            setAuthStatus(true)
            if(!hasMerged.current){
                hasMerged.current=true
            }
        }else if(status==="unauthenticated"){
            setAuthStatus(false)
            hasMerged.current=false;
        }
    },[status,setAuthStatus])
  return null;
}
