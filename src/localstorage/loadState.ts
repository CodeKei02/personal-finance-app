export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('reduxState');
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    }catch(err){
        console.error()
    }
}