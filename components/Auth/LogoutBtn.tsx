"use client"

import {signOut} from "next-auth/react";
import styles from '@/public/styles/LoginBtn.module.css';
import Image from "next/image";

export default function LogoutBTN ({image}: {image: string}) {


    return (
        <div className={styles.container}>
            <button onClick={() => signOut()} className={styles.btn}>Sign Out</button>
            <Image src={image} width={50} height={50} alt="avatar" priority className={styles.profileImg}/>
        </div>
    )
}