import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import styles from '../community/styles.module.css';
import ic_top_1 from '../assets/ic_top_1.webp';
import ic_top_2 from '../assets/ic_top_2.webp';
import ic_top_3 from '../assets/ic_top_3.webp';
import ic_homepage from '../assets/home.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import TextEditor from './TextEditor';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Status_ok } from './component/Status_ok';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IconUser from '../assets/check.png';
import IconUserSystem from '../assets/user.png';
import { Divider } from 'antd';

export function Example() {
    const [show, setShow] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div
                onClick={() => {
                    user ? handleShow() : alert('Vui lòng đăng nhập');
                }}
                className="my-infor"
            >
                <div data-toggle="modal" data-target="#modal-post-quest" className="show-post">
                    {user && (
                        <p>
                            <span>{user.name},</span> bạn đang thắc mắc điều gì?
                        </p>
                    )}
                    {!user && <p>Vui lòng đăng nhập để sử dụng</p>}
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <div className={styles['Statussss']}>
                    <Status_ok />
                </div>
            </Modal>
        </>
    );
}

interface Post {
    _id: any;
    title: any;
    user: any;
    content: any;
    tym: { id: any; user_id: any }[];
    comments: {
        id: any;
        user_id: any;
        content: any;
        tym: { id: any; user_id: any }[];
        name: any;
        createdAt: any;
        updatedAt: any;
    }[];
    createdAt: any;
    updatedAt: any;
}

export const Community_done = () => {
    const [userId, setUserId] = useState<any>(null);
    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserId(userData);
        }
    }, []);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleTymClick = async (postId: string, postUserId: string) => {
        try {
            await axios.post(`items._id, items.user._id${userId}`, {
                name,
            });
        } catch (error) {
            console.error('Error updating tym:', error);
        }
    };

    const [data, setData] = useState<Post[]>([]);
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
    const tymPost = async (id: any) => {
        if (!userId) {
            alert('Vui lòng đăng nhập');
            return;
        }
        const data = {
            idUser: userId._id,
        };
        await axios.post('http://localhost:3090/api/tymPost-post/' + id, data);
    };
    const removeTymPost = async (id: any) => {
        if (!userId) {
            alert('Vui lòng đăng nhập');
            return;
        }
        const data = {
            idUser: userId._id,
        };
        await axios.post('http://localhost:3090/api/remove-tym-post/' + id, data);
    };

    const fetchAPI = async () => {
        try {
            const { data } = await axios.post<any[]>('http://localhost:3090/api/getAll-post');
            setData(data);
            console.log('Data from API:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchAPI();
        setInterval(() => {
            fetchAPI();
        }, 1000);
    }, []);

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
        <div className={styles['lalal']}>
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
            <Header />
            <div className="container py-5">
                <div className="row">
                    <div className={`col-lg-3 custom-cate-comuinity ${isShowLeft ? 'show-menu' : ''}`}>
                        <div className={`${styles['banner-left']} relative`}>
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
                                            <img src={IconUser} alt="" />
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
                                    src="https://www.shutterstock.com/image-vector/horizontal-internet-banner-about-learning-260nw-1603435279.jpg"
                                    alt=""
                                />
                                <img
                                    className="img-banner"
                                    src="https://www.shutterstock.com/image-photo/learning-english-concept-person-using-260nw-1832032216.jpg"
                                    alt=""
                                />
                                <img
                                    className="img-banner"
                                    src="https://www.shutterstock.com/image-vector/concept-learning-english-language-happy-600nw-1291728808.jpg"
                                    alt=""
                                />
                                <img
                                    className="img-banner"
                                    src="https://media.istockphoto.com/id/1053339028/vector/design-concept-of-word-english-website-banner-cartoon-kids-holding-letters-english-in-one.jpg?s=170667a&w=0&k=20&c=obaeiFfiloOHaw1N3E8hpzskIIp2IY1wlRT4s4EsyNA="
                                    alt=""
                                />
                                <img
                                    className="img-banner"
                                    src="https://png.pngtree.com/png-vector/20220915/ourmid/pngtree-english-learning-banner-mastering-the-future-simple-rule-with-vector-illustration-vector-png-image_48344290.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div>
                            <div className={styles['hhhhhhghh']}>
                                <div onClick={handleShow} className="content-post bg-content-df mb-5">
                                    <div className="box-avatar">
                                        <img
                                            src="https://mazii.net/assets/imgs/icon/ic_avatar.png"
                                            alt="Avatar"
                                            title="avatar"
                                        />
                                    </div>
                                    <Example />
                                </div>
                            </div>
                            <img
                                className={styles['banner-img']}
                                src="https://blog.cleveracademy.vn/wp-content/uploads/2020/10/hoc-tieng-anh-ngay-bay-gio.jpg"
                                alt=""
                            />
                            {data.map((items: Post) => {
                                return (
                                    <>
                                        <div key={items._id} className={styles['latest-news']}>
                                            {/* community */}
                                            <div className={styles['latest-news-user']}>
                                                <img
                                                    src="https://pbs.twimg.com/media/FGCpQkBXMAIqA6d.jpg:large"
                                                    alt=""
                                                />
                                                <div className={styles['latest-news-user-member']}>
                                                    <span className={styles['name-user']}>
                                                        <strong>{items.user.name}</strong>
                                                    </span>
                                                    <div className="post-information-total">
                                                        <span className={styles['post-information']}>
                                                            {items.user.createdAt
                                                                ? isNewMember(items.user.createdAt)
                                                                    ? 'Thành viên mới'
                                                                    : 'Thành viên cũ'
                                                                : 'Không có thông tin'}
                                                        </span>
                                                        <span className={styles['post-information']}>
                                                            {getMinutesDifference(items.createdAt)}
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
                                                onClick={() => navigate('/community/' + items._id)}
                                            >
                                                {items.title}
                                            </h3>
                                            <p className={styles['status-real']}>
                                                {/* {items.content} */}
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: items.content,
                                                    }}
                                                />
                                            </p>
                                            <div className="status-post">
                                                <div className={styles['like-comment']}>
                                                    <div
                                                        className={styles['like-comment-row']}
                                                        onClick={() => {
                                                            if (!items.tym.includes(userId?._id)) {
                                                                tymPost(items._id);
                                                            } else {
                                                                removeTymPost(items._id);
                                                            }
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                !items.tym.includes(userId?._id)
                                                                    ? 'https://mazii.net/assets/imgs/icon/ic_love.png'
                                                                    : 'https://mazii.net/assets/imgs/icon/ic_love_red.png'
                                                            }
                                                            alt=""
                                                        />
                                                        {/* https://mazii.net/assets/imgs/icon/ic_love_red.png */}
                                                        <span>Yêu thích</span>
                                                        {items.tym.length}
                                                    </div>
                                                    <div
                                                        onClick={() => commentconsst(items._id)}
                                                        className={styles['like-comment-row']}
                                                    >
                                                        <img
                                                            src="https://mazii.net/assets/imgs/icon/ic_cmt.png"
                                                            alt=""
                                                        />
                                                        <span>Bình luận</span>
                                                        {items.comments.length}
                                                    </div>
                                                </div>
                                            </div>
                                            {idComment === items._id && (
                                                <div className={styles['clans-này-to-0nef']}>
                                                    {/* từ thằng này */}

                                                    <div className={styles['container-comment']}>
                                                        <img
                                                            className={styles['img-comment']}
                                                            src="https://api-private.atlassian.com/users/aa7543e682dff486562017fe2fedc6c0/avatar"
                                                            alt=""
                                                        />

                                                        <div className={styles['bbutton-input']}>
                                                            <TextEditor />
                                                        </div>
                                                    </div>
                                                    <div className="mb-5">
                                                        {items.comments.map((comment: any) => (
                                                            <div key={comment.id}>
                                                                <div className={styles['latest-news-user']}>
                                                                    <img
                                                                        src="https://data.mazii.net/user_data/3472771678421491.jpg"
                                                                        alt=""
                                                                    />
                                                                    <div className={styles['latest-news-user-member']}>
                                                                        <span
                                                                            style={{ paddingRight: '20px' }}
                                                                            className={styles['name-user']}
                                                                        >
                                                                            {comment.nameUser}
                                                                        </span>
                                                                        <span className={styles['post-information']}>
                                                                            Khác
                                                                        </span>
                                                                        <div className="post-information-total">
                                                                            <div className={styles['comment']}>
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html: comment.comments,
                                                                                    }}
                                                                                />
                                                                            </div>

                                                                            <div className={styles['tym-comment-fake']}>
                                                                                <div
                                                                                    className={
                                                                                        styles['like-comment-row']
                                                                                    }
                                                                                >
                                                                                    <img
                                                                                        src="https://mazii.net/assets/imgs/icon/ic_love.png"
                                                                                        alt=""
                                                                                    />
                                                                                    {comment.tym && comment.tym.length}
                                                                                </div>

                                                                                <div
                                                                                    className={
                                                                                        styles['like-comment-row']
                                                                                    }
                                                                                >
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
                                    </>
                                );
                            })}
                        </div>
                    </div>
                    <div className={`col-3 custom-question-qtam ${isShowRight ? 'show-menu' : ''}`}>
                        <div className={`${styles['banner-right']} shadow`}>
                            <div className={styles['box-list-post']}>
                                <div className={styles['box-2']}>
                                    <div className={styles['box-title-2']}>
                                        <a
                                            // href="https://mazii.net/vi-VN/qa"
                                            className={styles['custom-link']}
                                        >
                                            Câu hỏi được quan tâm
                                        </a>
                                    </div>
                                    <div className={styles['box-post-2']}>
                                        {data
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
            </div>
            <Footer />
        </div>
    );
};
