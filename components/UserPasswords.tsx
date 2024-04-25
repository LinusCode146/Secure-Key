'use client'

import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import styles from '@/public/styles/UserPasswords.module.css';
import {useRef, useState} from "react";
import toast from "react-hot-toast";
import useCopyToClipboard from "@hooks/useCopyToClipboard";
import {decrypt} from "@/util/cipher";
import {Masterpassword} from "@/public/types/main";
import {Password} from "@/public/types/main";


export default function UserPasswords({globalMasterPassword}: Masterpassword) {
    const [description, setDescription] = useState<string>('');
    const [passwordField, setPasswordField] = useState<string>('');
    const descRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();
    const [ _,copy] = useCopyToClipboard();

    const {data, error, isLoading} = useQuery<Password[]>({
        queryFn: getUserPasswords,
        queryKey: ['user-passwords'],
    })

    const addPassword = useMutation({
        mutationFn: async (data: Password) => {
            return await axios.post('api/passwords/addPassword', data);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user-passwords"]});
            toast.success("Added password to your list");
        },
        onError: (error) => {
            if (error instanceof AxiosError) toast.error(error?.response?.data.message);
        }
    });

    const deletePassword = useMutation({
        mutationFn: async (data: {id: string | undefined}) => {
            return await axios.delete('api/passwords/deletePassword', {data});
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["user-passwords"]});
            toast.success("Deleted password")
        },
        onError: (error) => {
            if (error instanceof AxiosError) toast.error(error?.response?.data.message);
        }
    })

    if (error) return <div>error</div>;
    if (isLoading) return <div>Loading</div>;
    if (data) console.log(data)

    function submitHandler() {
        addPassword.mutate({password: passwordField, description: description, masterPassword: globalMasterPassword});
        if (descRef.current) descRef.current.value = "";
        if (passRef.current) passRef.current.value = "";
    }

    return (
        <div className={styles.container}>
            <div className={styles.createPassword}>
                <input type={"text"} ref={descRef} placeholder={"Description for password"}
                       onChange={(e) => setDescription(e.target.value)}/>
                <input type={"password"} ref={passRef} placeholder={"Enter password (at least 5 characters)"}
                       onChange={(e) => setPasswordField(e.target.value)}/>
                <button onClick={submitHandler} type={"button"}>Add</button>
            </div>

            <h1>Your Passwords</h1>


            <div className={styles.psList}>
                {data?.map((password: Password) => (
                    <ul className={styles.password} id={password.id}>
                        <div className={styles.description}>{password.description}</div>
                        <input onClick={() => {
                            copy(decrypt(password.password, globalMasterPassword)).then();
                            toast.success("Copied password to clipboard");
                           }}
                           readOnly
                           type="password"
                           value={"aaaaaaaaaaaa"}
                           className={styles.ps}/>
                        <img onClick={() => deletePassword.mutate({id: password.id})} src="/img/trash_can.png" alt={"Trash can"} />
                    </ul>
                ))}
            </div>
        </div>

    );
}

async function getUserPasswords() {
    const res = await axios.get('api/passwords/getUserPasswords')
    return res.data;
}