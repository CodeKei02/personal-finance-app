import { RootState } from "../store/store";
export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (err) {
        console.error(`Error saving state to localstorage: ${err}`);
    }
}