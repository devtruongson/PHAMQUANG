import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // CSS cho trình soạn thảo
import styles from '../styles.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

interface FontSelectorProps {
    onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ onChange }) => {
    const [selectedFont, setSelectedFont] = useState('Arial, sans-serif');

    const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const font = e.target.value;
        setSelectedFont(font);
        onChange(font);
    };

    return <h1></h1>;
};

export const Status_ok: React.FC = () => {
    const [font, setFont] = useState('Arial, sans-serif');
    const [queryParameters] = useSearchParams();
    const [title, setTitle] = useState('');
    const checkEnVi: string | null = queryParameters.get('idPost');
    const [content, setContent] = useState('');
    const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');

    const handleFontChange = (font: string) => {
        setFont(font);
    };

    const handleEditorChange = (content: string) => {
        setContent(content);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handlePostCreation = async () => {
        const data = {
            content: content,
            title: title,
            user: storedUserData._id,
        };

        if (!title || !content) {
            alert('Bạn hãy nhập đầy đủ các trường!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3090/api/create-post', data);
            console.log('Post created successfully:', response.data);
            setContent('');
            setTitle('');
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className={styles['okok']} style={{ backgroundColor: 'white' }}>
            <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Hãy nhập tiêu đề câu hỏi của bạn"
                style={{
                    borderBottom: '1px solid #ccc',
                }}
            />
            <FontSelector onChange={handleFontChange} />
            <ReactQuill
                className={styles['hghghgh']}
                style={{ fontFamily: font }}
                theme="snow"
                value={content}
                onChange={handleEditorChange}
            />
            <div className={styles['fefefefe']}>
                <button onClick={handlePostCreation}>Đăng</button>
            </div>
        </div>
    );
};
