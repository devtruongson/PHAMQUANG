import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // CSS cho trình soạn thảo
import styles from './styles.module.css';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { notification } from 'antd';

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

const TextEditor: React.FC = () => {
    const [font, setFont] = useState('Arial, sans-serif');
    const [queryParameters] = useSearchParams();
    const checkEnVi: string | null = queryParameters.get('idPost');
    const handleFontChange = (font: string) => {
        setFont(font);
    };
    const [content, setContent] = useState('');
    const storedUserData = JSON.parse(localStorage.getItem('user') || '{}');
    const handleEditorChange = (content: string) => {
        setContent(content);
        console.log(content);
    };
    const handelPostComment = async () => {
        if (!storedUserData._id) {
            alert('Vui lòng đăng nhập');
            return;
        }

        if (!content) {
            alert('Vui long nhap day du');
            return;
        }

        const data = {
            dataComment: content,
            idUser: storedUserData._id,
            nameUser: storedUserData.name,
        };
        await axios.post('http://localhost:3090/api/comment-post/' + checkEnVi, data);
        setContent('');
    };
    return (
        <div>
            <ReactQuill
                className={styles['hghghgh']}
                style={{ fontFamily: font }}
                theme="snow"
                value={content}
                onChange={handleEditorChange}
            />
            <div className={`${styles['fefefefe']} custom-submit`}>
                <button onClick={handelPostComment} className="submit-btn-cccc">
                    Đăng
                </button>
            </div>
        </div>
    );
};

export default TextEditor;
