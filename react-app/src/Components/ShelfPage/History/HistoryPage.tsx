import { useOktaAuth } from "@okta/okta-react"
import {useEffect, useState} from "react";
import HistoryModel from "../../../Models/HistoryModel";

export const HistoryPage = () =>{

    const{authState} = useOktaAuth();

    const [historyContent , setHistoryContent] = useState<HistoryModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] =useState(null);

    useEffect(() => {

        if (authState && authState?.isAuthenticated){
            const url : string = ''
        }

    }, [authState]);

    return null;
}