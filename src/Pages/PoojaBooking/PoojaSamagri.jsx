import React,{useState,useEffect} from "react";
import axios from "axios";

const PoojaSamagri = ({poojaId}) =>{
    const id = poojaId;
    console.log(id);
    const ApiUrl = 'http://34.131.10.8:3000/api';
    const tokken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNoaXZhbnNodSIsImlhdCI6MTczMjE2NTMzOX0.YDu6P4alpQB5QL-74z1jO4LGfEwZA_n_Y29o512FrM8";
    const [error, setError] = useState(null);
    const [samagriDetails,setSmagriDetails]=useState(null);
    useEffect(()=>{
        const fetchSamagri  = async () => {
            try{
                const response = await axios.get(`${ApiUrl}/pooja/samagri/${id}`, {
                    headers: { Authorization: tokken },
                });
                setSmagriDetails(response.data.data);
            }
            catch(err){
                setError(err.message);
            }
        };
        fetchSamagri();
    },[id]);
    return(
        <>
        
        </>
    );

}
export default PoojaSamagri;