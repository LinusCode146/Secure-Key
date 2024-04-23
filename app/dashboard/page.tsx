'use client'

import {redirect} from "next/navigation";
import UserPasswords from "@/components/UserPasswords";
import {useEffect} from "react";
import {useMasterPassword} from "@/context/MasterPasswordContext";
import styles from '@/public/styles/LoadingSpinner.module.css';


export default function Dashboard() {
    const { globalMasterPassword } = useMasterPassword();

    useEffect(() => {
        if (!globalMasterPassword) {
            redirect('/')
        }
    }, [globalMasterPassword]);


    if (!globalMasterPassword) {
        return (
            <main className={styles.wrapper}>
                <div className={styles.ellips}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </main>
        );
    }


    return (
        <main>
            <UserPasswords globalMasterPassword={globalMasterPassword}/>
        </main>
    )
}