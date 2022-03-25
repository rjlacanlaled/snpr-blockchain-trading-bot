import { useEffect, useState } from 'react';

const fetchSavedValue = (key, value) => {
    if (!value) return;
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    return value;
};

const usePersist = (key, initialValue) => {
    const [value, setValue] = useState(() => fetchSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default usePersist;