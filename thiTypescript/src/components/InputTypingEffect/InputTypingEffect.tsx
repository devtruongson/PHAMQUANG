import { Input } from 'antd';
import React, { useState, useEffect } from 'react';

export const InputTypingEffect = ({
    placeholder: passedPlaceholder = '',
    ...passedProps
}: React.InputHTMLAttributes<HTMLInputElement>) => {
    const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    useEffect(() => {
        const intr = setInterval(() => {
            setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
            if (placeholderIndex + 1 > passedPlaceholder.length) {
                setPlaceholderIndex(0);
            } else {
                setPlaceholderIndex(placeholderIndex + 1);
            }
        }, 100);
        return () => {
            clearInterval(intr);
        };
    });

    return <input {...passedProps} placeholder={placeholder} />;
};
