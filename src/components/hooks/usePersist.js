import { useEffect, useState } from 'react';

const fetchSavedValue = (key, value) => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    return value;
};

const usePersist = (key, initialValue) => {
    const [value, setValue] = useState(() => fetchSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value]);

    return [value, setValue];
}

export default usePersist;