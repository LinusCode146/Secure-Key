'use client'

import React, { createContext, useContext, useState } from 'react';

interface MasterPasswordContextType {
    globalMasterPassword: string | null;
    setGlobalMasterPassword: (password: string) => void;
}

const MasterPasswordContext = createContext<MasterPasswordContextType | undefined>(undefined);

export const useMasterPassword = () => {
    const context = useContext(MasterPasswordContext);
    if (!context) {
        throw new Error('useMasterPassword must be used within a MasterPasswordProvider');
    }
    return context;
};

export const MasterPasswordProvider = ({ children }: {children: React.ReactNode}) => {
    const [globalMasterPassword, setGlobalMasterPassword] = useState<string | null>(null);

    return (
        <MasterPasswordContext.Provider value={{ globalMasterPassword, setGlobalMasterPassword }}>
            {children}
        </MasterPasswordContext.Provider>
    );
};
