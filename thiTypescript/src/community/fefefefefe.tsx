// Community_done.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
import styles from "../community/styles.module.css";
import TextEditor from './TextEditor';

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
    const [data, setData] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const { data } = await axios.post<any[]>('http://localhost:3090/api/getAll-post');
                setData(data);
                console.log("Data from API:", data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchAPI();
    }, []);

    const isNewMember = (createdAt: string) => {
        // Function implementation
    };

    const getMinutesDifference = (updatedAt: string) => {
        // Function implementation
    };

    const commentconsst = (id: any) => {
        if (id === selectedPostId) {
            setSelectedPostId('');
        } else {
            setSelectedPostId(id);
        }
    };

    return (
        <div>
            <Header />
            <div className={styles.container}>
                <div className={styles['banner-left']}>
                    {/* Content of the left banner */}
                </div>
                <div className={styles.banner}>
                    {data.map((items: Post) => (
                        <div key={items._id} className={styles['latest-news']}>
                            {/* Content of each post */}
                            {selectedPostId === items._id && (
                                <div className={styles['clans-này-to-0nef']}>
                                    <div className={styles['container-comment']}>
                                        <img className={styles['img-comment']} src="https://data.mazii.net/user_data/3472771678421491.jpg" alt="" />
                                        <div className={styles['bbutton-input']}>
                                            <TextEditor />
                                            <div className={styles['fefefefe']}>
                                                <button>Đăng</button>
                                            </div>
                                        </div>
                                    </div>
                                    {items.comments.map((comment:any) => (
                                        <div key={comment.id} className={styles['latest-news-user']}>
                                            <img src="https://data.mazii.net/user_data/3472771678421491.jpg" alt="" />
                                            <div className={styles['latest-news-user-member']}>
                                                <span className={styles['name-user']}>{comment.name}</span>
                                                <div className="post-information-total">
                                                    <span className={styles['post-information']}>
                                                        {comment.updatedAt ?
                                                            (isNewMember(comment.updatedAt) ? "Thành viên mới" : "Thành viên cũ")
                                                            : "Không có thông tin"}
                                                    </span>
                                                    <span className={styles['post-information']}>{getMinutesDifference(comment.updatedAt)}</span>
                                                    <span className={styles['post-information']}>Khác</span>
                                                    <div className={styles['comment']}>
                                                        <p>{comment.content}</p>
                                                    </div>
                                                    <div className={styles['tym-comment-fake']}>
                                                        <div className={styles['like-comment-row']}>
                                                            <img src="https://mazii.net/assets/imgs/icon/ic_love.png" alt="" />
                                                            {comment.tym && comment.tym.length}
                                                        </div>
                                                        <div className={styles['like-comment-row']}>
                                                            <img src="https://mazii.net/assets/imgs/icon/ic_cmt.png" alt="" />
                                                            {items.tym.length}
                                                        </div>
                                                        <div className={styles['like-comment-row']}>
                                                            <img src="https://mazii.net/assets/imgs/icon/ic_report.png" alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles['banner-right']}>
                    {/* Content of the right banner */}
                </div>
            </div>
            <Footer />
        </div>
    );
};
