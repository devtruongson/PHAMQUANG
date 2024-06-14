import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { AddForm, addSchema } from '../api/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { create, translate } from '../api/products';
import logoSearch from '../assets/search.png';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import logoChange from '../assets/arrows.png';
import { saveNoteByUser } from '../api/auth';
import { toast } from 'react-toastify';
import QuestionAnswer from './QuestionAnswer';
import { Modal } from 'antd';
import { Typography, notification } from 'antd';
const { Paragraph, Text } = Typography;
import type { NotificationArgsProps } from 'antd';

export default function Add({ handelTranslateShow, handelTranslateHide, getTextTranslate }: any) {
    const [inputText, setInputText] = useState('');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [translatedText, setTranslatedText] = useState('');
    const [checkOffTranslate, setCheckOffTranslate] = useState(false);
    const [textInput, setTextInput] = useState('');
    const [translated, setTranslated] = useState('');
    const [queryParameters] = useSearchParams();
    const [synonyms, setSynonyms] = useState<string[]>([]);
    const checkEnVi: string | null = queryParameters.get('check');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.open({
            message: 'Có lỗi xảy ra',
            description: 'Bạn hãy nhập từ dịch sau đó tiếp tục',
        });
    };

    const speak = (text: string) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    };
    const navigate = useNavigate();
    const [dataSave, setDataSave] = useState({
        noteVI: '',
        nodeEN: '',
    });
    const handleTranslate = () => {
        const dataTranslate = {
            option: !checkEnVi || checkEnVi == 'vi' ? 'en' : 'vi',
            text: inputText,
        };

        if (!inputText.trim()) {
            openNotification();
            return;
        }

        const data = translate(dataTranslate)
            .then((dataTrans) => {
                getTextTranslate(inputText);
                setTranslatedText(!checkEnVi || checkEnVi == 'vi' ? dataTrans.data.vi : dataTrans.data.en);
                setDataSave({
                    noteVI: dataTrans.data.vi,
                    nodeEN: dataTrans.data.en,
                });
            })
            .catch((error) => {
                console.error(error);
            });
        setCheckOffTranslate(true);
        handelTranslateShow();
    };
    const handelSaveTranslate = () => {
        saveNoteByUser(user._id, dataSave)
            .then((data) => {
                toast.success('Note saved successfully');
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const changeEnVi = () => {
        navigate({
            search: createSearchParams({
                check: !checkEnVi || checkEnVi == 'vi' ? 'en' : 'vi',
            }).toString(),
        });
        setSynonyms([]);
        setInputText(translatedText);
        setTranslatedText(inputText);
    };
    useEffect(() => {
        {
            !checkEnVi || checkEnVi == 'vi'
                ? setTextInput('Nhập từ (Tiếng Anh)')
                : setTextInput('Nhập từ (Tiếng Việt)');
        }
        {
            !checkEnVi || checkEnVi == 'vi'
                ? setTranslated('Từ dịch (Tiếng Việt)')
                : setTranslated('Từ dịch (Tiếng Anh)');
        }
    }, [checkEnVi]);

    useEffect(() => {
        const check = !checkEnVi || checkEnVi == 'vi' ? 'en' : 'vi';
        console.log(check);
        if (check == 'vi') {
            const word = '' + translatedText;
            const apiKey = 'L/bgvbiVcikiBnSeSg2A5w==NrAzlqDI3H3vWpbk';
            fetch(`https://api.api-ninjas.com/v1/thesaurus?word=${word}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': apiKey,
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then((result) => {
                    setSynonyms(result.synonyms ? result.synonyms : []);
                })
                .catch((error) => {
                    console.error('Error: ', error.message);
                });
        }
    }, [translatedText, checkEnVi]);

    return (
        <div className="">
            {contextHolder}
            <Container className="">
                <Row>
                    <Col lg={12}>
                        <h1 className="text-center mb-4 lable_custom_page">Trang dịch thuật</h1>
                        <Form>
                            <Row className="custom-padding-row">
                                <Col lg={6} sm={12}>
                                    <Form.Group className="form-group-translate" controlId="formInputText">
                                        <Form.Label>{textInput}</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={inputText}
                                            onChange={(e) => setInputText(e.target.value)}
                                            placeholder="Bạn hãy nhập từ muốn dịch...."
                                        />
                                    </Form.Group>
                                    <div
                                        className="dn-pc"
                                        style={{
                                            alignItems: 'center',
                                            paddingTop: 10,
                                            paddingBottom: 30,
                                        }}
                                    >
                                        <p
                                            className="dn-pc"
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                textDecoration: 'underline',
                                                paddingTop: '5px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => speak(inputText)}
                                        >
                                            Phát âm
                                        </p>
                                        <img
                                            className="switch-trans"
                                            src={logoChange}
                                            onClick={changeEnVi}
                                            style={{
                                                width: '40px',
                                                display: 'block',
                                                margin: '0 auto',
                                                cursor: 'pointer',
                                            }}
                                            alt=""
                                        />
                                    </div>
                                </Col>
                                <Col lg={6} sm={12}>
                                    <Form.Group
                                        className="form-group-lable-custom-mobile"
                                        controlId="formTranslatedText"
                                    >
                                        <Form.Label>{translated}</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={translatedText} readOnly />
                                    </Form.Group>

                                    <Modal
                                        title="Các từ đồng nghĩa"
                                        open={isModalOpen}
                                        onCancel={() => {
                                            setIsModalOpen(false);
                                        }}
                                        onOk={() => {
                                            setIsModalOpen(false);
                                        }}
                                        width="60vw"
                                    >
                                        {synonyms.length && (
                                            <div className="synonyms">
                                                {synonyms.map((item, index) => {
                                                    return (
                                                        <Paragraph
                                                            key={index}
                                                            copyable={{
                                                                text: item,
                                                            }}
                                                        >
                                                            <span className="synonyms-item">{item}</span>
                                                        </Paragraph>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </Modal>
                                </Col>
                                <Col lg={12} sm={12}>
                                    <div className="mt-2 d-flex justify-content-between align-items-center position-relative">
                                        <p
                                            className="dn-mb"
                                            style={{
                                                color: 'black',
                                                fontWeight: 'bold',
                                                textDecoration: 'underline',
                                                paddingTop: '5px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => speak(inputText)}
                                        >
                                            Phát âm
                                        </p>
                                        <img
                                            className="switch-trans dn-mb"
                                            src={logoChange}
                                            onClick={changeEnVi}
                                            style={{
                                                width: '40px',
                                                display: 'block',
                                                margin: '0 auto',
                                                cursor: 'pointer',
                                                position: 'absolute',
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                            }}
                                            alt=""
                                        />
                                        <div className="d-flex align-items-center gap-4 justify-content-between-mb">
                                            <p
                                                className=""
                                                style={{
                                                    color: 'black',
                                                    fontWeight: 'bold',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    padding: 0,
                                                    margin: 0,
                                                }}
                                                onClick={() => speak(translatedText)}
                                            >
                                                Phát âm
                                            </p>
                                            <Button variant="primary" onClick={handleTranslate}>
                                                Dịch
                                            </Button>
                                            {checkOffTranslate && (
                                                <>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            handelTranslateHide();
                                                            setCheckOffTranslate(false);
                                                            setTranslatedText('');
                                                            setInputText('');
                                                        }}
                                                    >
                                                        Tắt dịch
                                                    </Button>
                                                    <Button variant="success" onClick={handelSaveTranslate}>
                                                        Lưu lại
                                                    </Button>
                                                </>
                                            )}
                                            {synonyms.length > 0 ? (
                                                <>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => {
                                                            setIsModalOpen(true);
                                                        }}
                                                    >
                                                        Từ đồng nghĩa
                                                    </Button>
                                                </>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col lg={12}>
                        <QuestionAnswer />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
