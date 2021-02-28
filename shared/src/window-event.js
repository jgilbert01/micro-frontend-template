export const useWindowEvent = (name, callback) => {
    useEffect(() => {
        window.addEventListener(name, callback);
        return () => window.removeEventListener(name, callback);
    }, [name, callback]);
};

export const dispatchWindowEvent = (name, detail) => {
    window.dispatchEvent(new CustomEvent(name, { detail }));
};