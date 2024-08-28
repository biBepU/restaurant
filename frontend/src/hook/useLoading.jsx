import { useState,createContext,useContext } from "react";

const loadingContext = createContext({});


export const LoadingProvider =({children})=>{
    const [loading,setLoading] = useState(false);

    const showLoading = ()=>setLoading(true);
    const hideLoading = ()=>setLoading(false);

    return(
        <loadingContext.Provider value={{loading,showLoading,hideLoading}}>
            {children}
        </loadingContext.Provider>
    );
};

export const useLoading =()=> useContext(loadingContext)
