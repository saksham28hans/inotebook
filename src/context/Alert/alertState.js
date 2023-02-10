import { useState } from "react";
import alertContext from "./alertContext";

const AlertState = (props)=>{
    
    const [alerts, setalerts] = useState(null);

    const showAlert = (message,type)=>{
        setalerts({message : message,
        type : type});
     
        setTimeout(() => {
          setalerts(null);
        }, 3000);
       }

       return (
        <alertContext.Provider value={{ alerts,showAlert }}>
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;

