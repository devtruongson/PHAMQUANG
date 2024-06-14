import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import axios from 'axios';
import { createSearchParams, useNavigate, useParams } from 'react-router-dom';
import styles from '../community/styles.module.css';
import ic_homepage from '../assets/home.png';
import TextEditor from './TextEditor';
import IconUser from '../assets/check.png';
import IconUserSystem from '../assets/user.png';
import { Divider } from 'antd';

const DetailsComunity = () => {
    const [userId, setUserId] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserId(userData);
        }
    }, []);

    const handleTymClick = async (postId: string, postUserId: string) => {
        try {
            await axios.post(`items._id, items.user._id${userId}`, {
                name,
            });
        } catch (error) {
            console.error('Error updating tym:', error);
        }
    };

    const [data, setData] = useState<any>();
    const [dataAll, setDataAll] = useState<any>();
    const fetchAPIAll = async () => {
        try {
            const { data } = await axios.post<any[]>('http://localhost:3090/api/getAll-post');
            setDataAll(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [idComment, setIdCOmment] = useState('');
    const [comment, setcomment] = useState(false);
    const navigate = useNavigate();
    const commentconsst = (id: any) => {
        navigate({
            search: createSearchParams({
                idPost: id,
            }).toString(),
        });
        if (id === idComment) {
            setIdCOmment('');
        } else {
            setIdCOmment(id);
        }
    };

    const fetchAPI = async () => {
        try {
            const { data } = await axios.post<any[]>('http://localhost:3090/api/get-post/' + id);
            setData(() => ({ ...data }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        setInterval(() => {
            fetchAPI();
            fetchAPIAll();
        }, 500);
    }, [id]);

    const isNewMember = (createdAt: string) => {
        const createdDate = new Date(createdAt);
        const currentTime = new Date();
        const difference = currentTime.getTime() - createdDate.getTime();
        const daysDifference = difference / (1000 * 3600 * 24);
        return daysDifference <= 7;
    };

    const getMinutesDifference = (updatedAt: string) => {
        const time1 = new Date();
        const time2 = new Date(updatedAt);
        const differenceInMillis = Math.abs(time1.getTime() - time2.getTime());
        const minutesDifference = differenceInMillis / 60000;
        if (minutesDifference < 1) {
            return 'Mới đăng';
        }
        return formatTime(minutesDifference);
    };
    const tymPost = async (id: any) => {
        const data = {
            idUser: userId._id,
        };
        await axios.post('http://localhost:3090/api/tymPost-post/' + id, data);
    };
    const removeTymPost = async (id: any) => {
        const data = {
            idUser: userId._id,
        };
        await axios.post('http://localhost:3090/api/remove-tym-post/' + id, data);
    };
    const formatTime = (minutes: any): string => {
        if (minutes < 1) {
            return 'Mới đăng';
        }
        if (minutes < 60) {
            return `${Math.floor(minutes)} phút trước`;
        }
        if (minutes < 1440) {
            const hours = Math.floor(minutes / 60);
            return `${hours} giờ trước`;
        }
        if (minutes < 43800) {
            const days = Math.floor(minutes / 1440);
            return `${days} ngày trước`;
        }
        if (minutes < 525600) {
            const months = Math.floor(minutes / 43800);
            return `${months} tháng trước`;
        }
        const years = Math.floor(minutes / 525600);
        return `${years} năm trước`;
    };

    const [isShowLeft, serIsShowLeft] = useState<boolean>(false);
    const [isShowRight, serIsShowRight] = useState<boolean>(false);

    const handleClickViewPostMaxLike = async () => {
        const { data } = await await axios.get('http://localhost:3090/api/get-post-max-like');
        if (data.length === 0) {
            alert('Xin lỗi không có post nào!');
        } else {
            window.location.href = `/community/${data[0]._id}`;
        }
    };

    return (
        <div>
            <Header />
            <div
                className="left-menu"
                onClick={() => {
                    serIsShowLeft(true);
                }}
            ></div>
            <div
                className="right-menu"
                onClick={() => {
                    serIsShowRight(!isShowRight);
                }}
            ></div>
            <div className="container">
                <div className="row py-5">
                    <div className={`col-lg-3 custom-cate-comuinity ${isShowLeft ? 'show-menu' : ''} relative`}>
                        <button
                            onClick={() => {
                                serIsShowLeft(false);
                            }}
                            className="close_mobile"
                        >
                            X
                        </button>
                        <div className={styles['box-list-post']}>
                            <div className={`${styles.box} shadow`}>
                                <div className={styles['box-title']}>
                                    <span>Các Bài Viết Nổi Bật</span>
                                </div>
                                <div className={styles['box-post']}>
                                    <div
                                        className={styles['box-post-row']}
                                        onClick={handleClickViewPostMaxLike}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img src="https://mazii.net/assets/imgs/icon/ic_love_red.png" alt="" />
                                        <p>Được Yêu Thích Nhất</p>
                                    </div>
                                    <div className={styles['box-post-row']}>
                                        <img src="https://mazii.net/assets/imgs/icon/ic_chat.png" alt="" />
                                        <p>Được Quan Tâm Nhiều Nhất</p>
                                    </div>
                                    <div className={styles['box-post-row']}>
                                        <img src={IconUserSystem} alt="" />
                                        <a href="https://mazii.net/vi-VN/qa" className={styles['custom-link']}>
                                            Được biên tập viên lựa chọn
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['box-category']} shadow`}>
                            <img
                                className="img-banner"
                                src="https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/image_repo/bf/e5/T-M-1707-In-English-We-Are-Learning-Display-Banner.jpg"
                                alt=""
                            />
                            <img
                                className="img-banner"
                                src="https://img.freepik.com/free-vector/english-lessons-sale-banner-template_23-2151078995.jpg"
                                alt=""
                            />
                            <img
                                className="img-banner"
                                src="https://img.freepik.com/premium-vector/flat-design-english-lessons-facebook-cover_23-2151032061.jpg"
                                alt=""
                            />
                            <img
                                className="img-banner"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdUPsLE_lQydn3JDdUNqrkVduDshkP9FdxBaSqmtW-VI_nkSkuhdnKgyfrh9WZYO4dJBs&usqp=CAU"
                                alt=""
                            />
                            <img
                                className="img-banner"
                                src="https://png.pngtree.com/png-vector/20220915/ourmid/pngtree-english-learning-banner-mastering-the-future-simple-rule-with-vector-illustration-vector-png-image_48344290.jpg"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <img
                            className={styles['banner-img']}
                            src="https://stepup.edu.vn/wp-content/uploads/2019/03/TOP-5-C%C3%81CH-H%E1%BB%8CC-T%E1%BB%AA-V%E1%BB%B0NG.png"
                            alt=""
                        />
                        <div className={styles['latest-news']}>
                            <div className={styles['latest-news-user']}>
                                <img
                                    src="https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
                                    alt=""
                                />
                                <div className={styles['latest-news-user-member']}>
                                    <span className={styles['name-user']}>
                                        <strong>{data?.user?.name}</strong>
                                    </span>
                                    <div className="post-information-total">
                                        <span className={styles['post-information']}>
                                            {data?.user?.createdAt
                                                ? isNewMember(data.user.createdAt)
                                                    ? 'Thành viên mới'
                                                    : 'Thành viên cũ'
                                                : 'Không có thông tin'}
                                        </span>
                                        <span className={styles['post-information']}>
                                            {getMinutesDifference(data?.createdAt)}
                                        </span>

                                        <span className={styles['post-information']}>Khác</span>
                                    </div>
                                </div>
                            </div>
                            <Divider />
                            <h3
                                style={{
                                    marginTop: 10,
                                    fontSize: 25,
                                    fontWeight: 600,
                                    fontStyle: 'italic',
                                }}
                                onClick={() => navigate('/community/' + data?._id)}
                            >
                                {data?.title}
                            </h3>
                            <p className={styles['status-real']}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: data?.content,
                                    }}
                                />
                            </p>
                            <div className="status-post">
                                <div className={styles['like-comment']}>
                                    <div
                                        className={styles['like-comment-row']}
                                        onClick={() => {
                                            if (!data?.tym?.includes(userId._id)) {
                                                tymPost(data._id);
                                            } else {
                                                removeTymPost(data._id);
                                            }
                                        }}
                                    >
                                        <img
                                            src={
                                                !data?.tym?.includes(userId?._id)
                                                    ? 'https://mazii.net/assets/imgs/icon/ic_love.png'
                                                    : 'https://mazii.net/assets/imgs/icon/ic_love_red.png'
                                            }
                                            alt=""
                                        />
                                        <span>Yêu thích</span>
                                        {data?.tym.length}
                                    </div>

                                    <div
                                        onClick={() => commentconsst(data?._id)}
                                        className={styles['like-comment-row']}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img src="https://mazii.net/assets/imgs/icon/ic_cmt.png" alt="" />
                                        <span>Bình luận</span>
                                        {data?.comments.length}
                                    </div>
                                </div>
                            </div>

                            {idComment === data?._id && (
                                <div className={styles['clans-này-to-0nef']}>
                                    {/* từ thằng này */}

                                    <div className={styles['container-comment']}>
                                        <img
                                            className={styles['img-comment']}
                                            src="https://cdn3.iconfinder.com/data/icons/avatars-add-on-pack-1/48/v-07-512.png"
                                            alt=""
                                        />

                                        <div className={styles['bbutton-input']}>
                                            {/* <input className={styles['comment-inp']} type="text" name="" id="" /> */}
                                            <TextEditor />
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        {data?.comments.map((comment: any) => (
                                            <div key={comment.id}>
                                                <div className={styles['latest-news-user']}>
                                                    <img
                                                        src="https://www.seaprodexhanoi.com.vn/img/no_avatar.jpg"
                                                        alt=""
                                                    />
                                                    <div className={styles['latest-news-user-member']}>
                                                        <span
                                                            style={{ paddingRight: '20px' }}
                                                            className={styles['name-user']}
                                                        >
                                                            {comment.nameUser}
                                                        </span>
                                                        <span className={styles['post-information']}>Khác</span>
                                                        <div className="post-information-total">
                                                            <div className={styles['comment']}>
                                                                <div
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: comment.comments,
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className={styles['tym-comment-fake']}>
                                                                <div className={styles['like-comment-row']}>
                                                                    <img
                                                                        src="https://mazii.net/assets/imgs/icon/ic_love.png"
                                                                        alt=""
                                                                    />
                                                                    {comment.tym && comment.tym.length}
                                                                </div>

                                                                <div className={styles['like-comment-row']}>
                                                                    <img
                                                                        src="https://mazii.net/assets/imgs/icon/ic_report.png"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`col-3 custom-question-qtam ${isShowRight ? 'show-menu-id' : ''}`}>
                        <div className={styles['box-list-post']}>
                            <div className={`${styles['box-2']} shadow rounded-sm`}>
                                <div className={styles['box-title-2']}>
                                    <a href="https://mazii.net/vi-VN/qa" className={styles['custom-link']}>
                                        Câu hỏi được quan tâm
                                    </a>
                                </div>
                                <div className={styles['box-post-2']}>
                                    {dataAll
                                        ?.sort((a, b) => b.tym.length - a.tym.length)
                                        ?.slice(0, 11)
                                        .map((item, index) => {
                                            const dataIndex = index + 1;
                                            return (
                                                <div
                                                    onClick={() => navigate('/community/' + item._id)}
                                                    className={styles['box-post-row-2']}
                                                >
                                                    <a className={styles['custom-link']}>
                                                        {dataIndex} . {item.title}
                                                    </a>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DetailsComunity;
