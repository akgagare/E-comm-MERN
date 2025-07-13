import { useContext } from "react";
import { createContext } from "react";
export const UserContext = createContext();

function UserProvider(){
    const user = {name:'John Doe',id:1};
    return(
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;