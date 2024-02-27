import React, { createContext, useState } from 'react'

//create context -addResponse
export const addResponseContext = createContext()
export const editResponseContext = createContext()
export const deleteResponseContext = createContext()
export const addcartResponseContext = createContext()
export const deletecartResponseContext = createContext()



function ContextShare({ children }) {
    const [addUpdate, setAddUpdate] = useState([])
    const [editUpdate, setEditUpdate] = useState([])
    const [deleteUpdate, setDeleteUpdate] = useState([])
    const [addCart, setAddCart] = useState([])
    const [deleteCart, setDeleteCart] = useState([])


    return (
        <>
            <addResponseContext.Provider value={{ addUpdate, setAddUpdate }}>
                <editResponseContext.Provider value={{editUpdate, setEditUpdate}}>
                  <deleteResponseContext.Provider value={{deleteUpdate, setDeleteUpdate}}>  
                 <addcartResponseContext.Provider value={{addCart, setAddCart}}>   
                   <deletecartResponseContext.Provider value={{deleteCart, setDeleteCart}}> 
                    {children}
                    </deletecartResponseContext.Provider>
                    </addcartResponseContext.Provider>
                    </deleteResponseContext.Provider>
                </editResponseContext.Provider>
            </addResponseContext.Provider>
        </>
    )
}

export default ContextShare