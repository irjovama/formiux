// Formiux.js
import React, { useState } from 'react';

const Validations = {
    REQUIRED: /^(?!\s*$).+/,
    NUMBER: /^\d$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    URL: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,

}

const Formiux = ({  onSuccess, onError, children }) => {
    let key = -1;
    const aviables = ["input", "select", "textarea"];
    const [formiuxErrors, setFormiuxErrors] = useState(children.map(child => {
            if(child.props?.validate){
                return child.props.validate[1];
            } else {
                return "";
            }
        })
        .filter(error =>  error && error != "")
    );
    const [formiuxData, setFromiuxData] = useState(children.map(child => {
        return { ...child, value: child.value || ""}
    })
    .filter(child =>{
        return aviables.includes(child.type);
    })
    
    );
    function getNormal({key, localKey, child}){
        return { 
            key, 
            value: formiuxData[localKey].value,
            onInput: (e)=> {
                const data = Object.assign([], formiuxData.map( (v, k) => {
                    if(k == localKey){
                        if(child.props?.validate){
                            const error = child.props.validate[1];
                            const errors = Object.assign([], formiuxErrors);
                            const index = errors.findIndex((err)=> err == error);
                            const regex = child.props.validate[0];
                            if(!regex.test(e.target.value)){
                                if(index == -1){
                                    errors.push(error);
                                }
                            } else {
                                
                                errors.splice(index, 1);
                               
                            }
                            setFormiuxErrors(errors);
                        }
                        return  {...v, value: e.target.value};
                    } else {
                        return v;
                    }
                }));
                setFromiuxData(data);
            },
        };
    }
    function handleSubmit(f){
        f.preventDefault();
        if(formiuxErrors.length==0) {
            onSuccess(formiuxData);
        } else {
            onError(formiuxErrors);
        }
    }
    return (
        <form  onSubmit={(f) => handleSubmit(f)}>
        {
            children.map(child =>{
                key++;
                const localKey = key;
                if(aviables.includes(child.type) ) {
                   
                    const content = getNormal({key, localKey, child});

                    const element = React.cloneElement(child, content);
             
                    return <div>
                                {child.props.label}
                                {element}
                            </div>
                } else {
                 
                    return React.cloneElement(child, 
                        { 
                            key, 
                            
                        }
                    )
                    
                    
                            
                }
               
            })
        }
        </form>
    );
};




export default Formiux;
export {Validations};