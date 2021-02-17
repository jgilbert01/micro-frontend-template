import { useState, useEffect } from 'react';

let mountPoints = null;

export const useMountPoint = (name) => {
    const [status, setStatus] = useState({
        items: mountPoints ? mountPoints[name] : [],
        loading: false,
        error: null
    });

    useEffect(() => {
        if (!mountPoints) {
            setStatus({ loading: true });
            fetch('/mount-points.json')
                .then((res) => res.json())
                .then((res) => {
                    mountPoints = res;
                    setStatus({ loading: false, items: mountPoints[name] });
                })
                .catch((error) => {
                    setStatus({ loading: false, error });
                });
        }
    }, []);

    return { ...status };
}
