// Before saving the state to local storage, convert it to a JSON string
export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Handle errors here
    }
};

// Load the state from local storage and parse it to an object
export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        // Handle errors here
        return undefined;
    }
};

