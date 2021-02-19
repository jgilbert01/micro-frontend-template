import { useState, useEffect } from 'react';

let mountPoints = null;

export const useMountPoint = (name) => {
    const [items, setItems] = useState(mountPoints ? mountPoints[name] || [] : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!mountPoints) {
            setLoading(true);
            fetch('/mount-points.json')
                .then((res) => res.json())
                .then((res) => {
                    mountPoints = res;
                    setLoading(false);
                    setItems(mountPoints[name] || []);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error);
                });
        }
    }, []);

    return { items, loading, error };
}
