"use client"

import {signIn} from "next-auth/react";
import styles from '@/public/styles/LoginBtn.module.css';

export default function LoginBtn () {
    return (
        <button onClick={() => signIn()} className={styles.btn}>Sign In</button>
    )
}