'use client'

import React, {createContext, useContext,  useState} from 'react';

// Step 1: Create a context to store the state
const MasterPasswordContext = createContext({
    isMasterPasswordCorrect: false,
    setMasterPasswordCorrect: (isCorrect: boolean) => {},
});

export function useMasterPassword() {
    return useContext(MasterPasswordContext);
}

// Wrap your application in this provider
export function MasterPasswordProvider({children}: {children: React.ReactNode}) {
    const [isMasterPasswordCorrect, setMasterPasswordCorrect] = useState(false);

    return (
        <MasterPasswordContext.Provider value={{ isMasterPasswordCorrect, setMasterPasswordCorrect }}>
            {children}
        </MasterPasswordContext.Provider>
    );
}