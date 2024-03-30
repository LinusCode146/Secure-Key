'use client'

import {useMutation} from "@tanstack/react-query";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";


//Set the index of the navbar container to a negative value to access the button
export default function DeletePage () {

    const mutation = useMutation({
        mutationFn: () => {
            return axios.delete('/api/passwords/deleteUser');
        },
        onSuccess: () => {
            toast.success("Deleted the user")
        },
        onError: error => {
            if (error instanceof AxiosError) toast.error(error?.response?.data.error);
        }
    })
    return (
        <button onClick={() => mutation.mutate()}>Delete</button>
    )
}