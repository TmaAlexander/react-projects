import {createContext, useState} from "react";

export const ArticleContext = createContext()

export const ArticleContextProvider = ({children}) => {
    const [selectedArticle, setSelectedArticle] = useState(null)

    return (
        <ArticleContext.Provider value={{selectedArticle, setSelectedArticle}}>
            {children}
        </ArticleContext.Provider>
    )
}