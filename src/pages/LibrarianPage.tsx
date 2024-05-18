import { useEffect, useState } from "react";
import ErrorToast from "../components/ErrorToast";
import { GetLibrarianResponse, getLibrarians } from "../api/LibrarianApi";
import LibrariansTable from "../components/Librarian/LibrariansTable";

export default function LibrarianPage(){
    const [stateResponse, setStateResponse] = useState<GetLibrarianResponse[]>();    

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
        getLibrarians()
            .then((res) =>{
                if (stateResponse != res.data){
                    setStateResponse(res.data);
                }
            })
            .catch((error) => {
                setShowToast(true);
                if (error.response) {
                    setError(error.response.data);
                } else if (error.request) {
                    setError(error.request);
                } else {
                    setError(error.message);
                }
            })
    }, []);  

    return(
        <>
            {LibrariansTable(stateResponse!)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}