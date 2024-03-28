'use client'

import styles from '@/public/styles/Home.module.css';
import {FormEvent, useState} from "react";


export default function Home() {
    const [MasterPassword, setMasterPassword] = useState('');

    function submitHandler (e: FormEvent) {
        e.preventDefault();
    }

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <label>Masterpassword</label>
      <input type="password" onChange={(e) => setMasterPassword(e.target.value)} />
    </form>
  );
}
