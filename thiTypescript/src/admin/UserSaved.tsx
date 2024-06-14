import React, { useEffect, useState } from 'react';
import Footer from '../components/footer/Footer';
import Header from '../components/Header/Header';
import { getIdUser } from '../api/auth';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const UserSaved = () => {
    const [dataUser, setDataUser] = useState([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const handelGetDataUser = async () => {
            const { data } = await getIdUser(user._id);
            setDataUser(
                data.note.map((item: any) => ({
                    id: uuidv4(),
                    ...item,
                })),
            );
        };
        handelGetDataUser();
    }, [user._id]);

    const handleDeleteNote = async (itemPar: any, data: any[]) => {
        const newNode = data.filter((item) => item.id !== itemPar.id);

        try {
            await axios.post(`http://localhost:3090/api/update-user/${user._id}`, {
                note: newNode,
            });
            const check = confirm('Bạn đã xóa thành công!');
            if (check) {
                window.location.reload();
            }
        } catch (error) {}
    };

    return (
        <div>
            <Header />
            <div>
                {dataUser.map((items: any) => {
                    return (
                        <div
                            className="save-user-item"
                            style={{ margin: '0 auto', marginTop: '20px', backgroundColor: '#f4f4f4' }}
                        >
                            <button className="delete_user_save" onClick={() => handleDeleteNote(items, dataUser)}>
                                <img src="https://www.svgrepo.com/show/525134/trash-bin-trash.svg" alt="" />
                            </button>
                            <div className="google-translate-result word-detail-content bg-white">
                                <div className="box-btn-right-df">
                                    <div className="btn-item item-audio">
                                        <div className="sprite_1 icon-22 ic_volume inline" />
                                    </div>
                                    <div data-toggle="modal" className="btn-item add-note-me">
                                        <div className="sprite_1 icon-22 ic_add inline" />
                                    </div>
                                </div>
                                <div className="gogl-wrap">
                                    <div className="gogl-sentences">
                                        <div className="gogl-sentence">Tiếng anh : {items.nodeEN}</div>
                                        <div className="gogl-sentence">Tiếng Việt : {items.noteVI}</div>
                                    </div>
                                </div>
                                <div className="gogl-word-search-helper">Dịch tự động</div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
};

export default UserSaved;
