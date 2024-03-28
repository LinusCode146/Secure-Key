"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from "react-hot-toast";
import React from "react";


const queryClient: QueryClient = new QueryClient()

const QueryWrapper = ({children}: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
    </QueryClientProvider>
)

export default QueryWrapper;