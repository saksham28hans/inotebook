import React, {useContext} from 'react';
import alertContext from '../context/Alert/alertContext';

export default function Alert(props) {
    const alcontext = useContext(alertContext);
  const { alerts } = alcontext;
    const capitalize = (word)=>{
       let lcase = word.toLowerCase();
       return lcase.charAt(0).toUpperCase() + lcase.slice(1);
    }
    return (
        <div style = {{height : '50px'}}>
      {alerts && <div>
            <div className={`alert alert-${alerts.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(alerts.type)}:</strong> {alerts.message}.
            </div>
        </div>}
        </div>
    );
}
