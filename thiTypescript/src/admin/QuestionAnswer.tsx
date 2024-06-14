import React, { useEffect, useState } from 'react';
import { getAllComment, postComment } from '../api/products';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
import { InputTypingEffect } from '../components/InputTypingEffect/InputTypingEffect';

const QuestionAnswer = () => {
    const [dataQuestion, setDataQuestion] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [nameQuestion, setNameQuestion] = useState('');
    const handelFetchQuesion = async () => {
        const { data } = await getAllComment();
        setDataQuestion(data.data);
    };
    useEffect(() => {
        handelFetchQuesion();
        setInterval(() => {
            handelFetchQuesion();
        }, 1000);
    }, []);
    const navigate = useNavigate();
    const handelPostQuestion = () => {
        if (nameQuestion.trim() == '') {
            toast.error('Vui lòng nhập câu hỏi');
            return;
        }
        if (!user) {
            alert('Vui lòng đăng nhập để dùng tính năng này ');
            setNameQuestion('');
            navigate('/login');
            return;
        }
        const message = {
            message: nameQuestion,
        };
        postComment(user._id, message)
            .then((data) => {
                toast.success('đã đặt câu hỏi');
                setNameQuestion('');
            })
            .catch((error) => console.log(error));
    };
    return (
        <section>
            <div className="py-5 mt-4">
                <div className="r">
                    <div className="col-lg-12">
                        <div className="card" id="chat1" style={{ borderRadius: 8 }}>
                            <div
                                className="card-header d-flex justify-content-between py-4 align-items-center text-white border-bottom-0"
                                style={{
                                    borderTopLeftRadius: 8,
                                    borderTopRightRadius: 8,
                                    backgroundColor: '#5644b7',
                                }}
                            >
                                <i className="fas fa-angle-left" />
                                <p
                                    className="mb-0 fw-bold"
                                    style={{
                                        fontStyle: 'italic',
                                    }}
                                >
                                    Hỏi và đáp
                                </p>
                                <i className="fas fa-times" />
                            </div>
                            <div
                                style={{ height: '300px', overflowY: 'auto', backgroundColor: '#f0f3fa' }}
                                className="card-body"
                            >
                                {user &&
                                    dataQuestion.map((db: any) => (
                                        <div
                                            key={db._id}
                                            className={`d-flex flex-row justify-content-${
                                                db?.idUser?._id === user?._id ? 'end' : 'start'
                                            } mb-4`}
                                        >
                                            {db?.idUser?._id === user?._id ? (
                                                <>
                                                    <div
                                                        className="p-3 me-3 border"
                                                        style={{
                                                            borderRadius: 15,
                                                            backgroundColor: '#fbfbfb',
                                                        }}
                                                    >
                                                        <p className="small mb-0">{db.idUser.name}</p>
                                                        <p>{db.nameComment}</p>
                                                    </div>
                                                    <img
                                                        src="https://api-private.atlassian.com/users/50b335ba706e5610e24fdea2b4af98f8/avatar"
                                                        alt="avatar"
                                                        style={{ width: 45, height: '100%' }}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <img
                                                        src="data:image/png;base64,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"
                                                        alt="sender_avatar"
                                                        style={{ width: 45, height: '100%' }}
                                                    />
                                                    <div
                                                        className="p-3 ms-3"
                                                        style={{
                                                            borderRadius: 15,
                                                            backgroundColor: 'rgba(57, 192, 237,.2)',
                                                        }}
                                                    >
                                                        <p>{db?.idUser?.name}</p>
                                                        <p className="small mb-0">{db.nameComment}</p>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                            </div>
                            <div
                                className="chat_input d-flex justify-content-between align-items-center"
                                style={{
                                    borderTop: '1.5px solid #ccc',
                                    height: 50,
                                }}
                            >
                                <InputTypingEffect
                                    className="effect-input"
                                    placeholder="Bạn hãy nhập tin nhắn...."
                                    style={{
                                        width: '100%',
                                        display: 'block',
                                        outline: 'none !important',
                                        padding: '0 10px',
                                        height: 30,
                                        fontSize: 14,
                                        border: 'none !important',
                                    }}
                                    onChange={(e: any) => setNameQuestion(e.target.value)}
                                    value={nameQuestion}
                                    onKeyDown={(e) => {
                                        if (e.keyCode === 13) {
                                            handelPostQuestion();
                                        }
                                    }}
                                />
                                <div
                                    style={{
                                        padding: '0 10px',
                                    }}
                                >
                                    <SendOutlined
                                        style={{
                                            fontSize: 16,
                                            color: '#1677ff',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handelPostQuestion}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuestionAnswer;
