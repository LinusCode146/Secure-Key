'use client'

import {redirect} from "next/navigation";
import UserPasswords from "@/components/UserPasswords";
import {useEffect} from "react";
import {useMasterPassword} from "@/components/MasterPasswordContext";



export default function Dashboard() {
    const { isMasterPasswordCorrect } = useMasterPassword();

    useEffect(() => {
        if (!isMasterPasswordCorrect) {
            redirect('/')
        }
    }, [isMasterPasswordCorrect]);


    if (!isMasterPasswordCorrect) {
        return <div>Loading...</div>; // Or return a loading spinner
    }


    return (
        <main>
           <UserPasswords />
        </main>
    )
}