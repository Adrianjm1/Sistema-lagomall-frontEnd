import {useState, createContext} from 'react'

const UserContext = createContext(null);
const defaultState = { isAdmin: true }

function Provider({children}){
    const [ state, setState ] = useState(defaultState);

    const handleSetAdmin = e => setState({...state, isAdmin: false })

    return (
        <UserContext.Provider value={{
            state,
            handleSetAdmin
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const Context = UserContext;
export default Provider;