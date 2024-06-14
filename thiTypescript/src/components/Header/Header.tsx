import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../community/styles.module.css';
import axios from 'axios';
import { Badge, Empty, Popover } from 'antd';
import { Bell } from 'react-bootstrap-icons';
import IConUser from '../../assets/check.png';
import _ from 'lodash';

const Header = () => {
    const [stateAccount, setStateAccount] = useState(false);
    const [data, setData] = useState<any>([]);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navigate = useNavigate();
    const [showNoti, setShowNoti] = useState(false);

    useEffect(() => {
        if (user._id) {
            setStateAccount(true);
        } else {
            setStateAccount(false);
        }
    }, [user]);

    const fetchAPI = async () => {
        try {
            const { data } = await axios.post<any[]>('http://localhost:3090/api/get-noti-user/' + user._id);
            setData(data);
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (!_.isEmpty(user)) {
            fetchAPI();
            setInterval(() => {
                fetchAPI();
            }, 1000);
        }
    }, [user._id]);

    return (
        <div className={styles['div-header']}>
            <div style={{ backgroundColor: '#3367d6', display: 'block' }} className="line-main">
                <div className="px-5-cus">
                    <div className="box-content-default content-header d-flex justify-content-between ">
                        <div className="box-left">
                            <div className="box-logo">
                                <a className="exp-track" href="/">
                                    <img
                                        height="64px"
                                        width="116px"
                                        src="https://static.vecteezy.com/system/resources/thumbnails/041/463/883/small_2x/phone-with-language-translator-symbol-of-user-communication-language-icon-3d-rendering-illustration-png.png"
                                        alt="mazii"
                                        title="Mazii"
                                        style={{
                                            objectFit: 'contain',
                                        }}
                                        className="logo-img "
                                    />
                                </a>
                            </div>
                            <div className="flex-feau">
                                <a href="/vi-VN/translate/ja-JP/vi-VN">
                                    <span className="">Chat với AI</span>
                                </a>
                                <Link to={'/user-saved'} className="">
                                    Danh sách đã lưu
                                </Link>
                                <Link to={'/Community'} className="">
                                    Cộng Đồng
                                </Link>
                                {!_.isEmpty(user) && user.role == 'admin' ? (
                                    <Link to={'/admin'} className="">
                                        Quản trị
                                    </Link>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <div
                            className="d-flex"
                            style={{
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <Popover
                                    content={
                                        data.length > 0 ? (
                                            <div
                                                style={{
                                                    maxHeight: 600,
                                                    overflow: 'auto',
                                                }}
                                            >
                                                <div className={styles['notification']}>
                                                    {data
                                                        ?.sort((a, b) => a.watched - b.watched)
                                                        .map((items: any) => {
                                                            return (
                                                                <div>
                                                                    <p
                                                                        onClick={() => {
                                                                            axios.get(
                                                                                'http://localhost:3090/api/watchedNotifications/' +
                                                                                    items._id,
                                                                            );
                                                                            navigate('/community/' + items.postId);
                                                                        }}
                                                                        style={{
                                                                            color: !items.watched ? 'black' : '#aaa',
                                                                            padding: '10px 6px',
                                                                            display: 'flex',
                                                                            gap: '10px',
                                                                            alignItems: 'center',
                                                                        }}
                                                                        className="item-notify"
                                                                    >
                                                                        <img
                                                                            height="20px"
                                                                            width="20px"
                                                                            src={IConUser}
                                                                            alt="mazii"
                                                                            title="Mazii"
                                                                            className="logo-img"
                                                                        />
                                                                        <p
                                                                            style={{
                                                                                padding: 0,
                                                                                margin: 0,
                                                                            }}
                                                                        >
                                                                            {items.dataNoti}
                                                                        </p>
                                                                    </p>
                                                                </div>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <Empty
                                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                    imageStyle={{ height: 60 }}
                                                    description={<span>Không có thông báo nào</span>}
                                                />
                                            </div>
                                        )
                                    }
                                >
                                    <Badge
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        count={data.filter((items: any) => items.watched != true).length}
                                    >
                                        <Bell
                                            className="bell-notify"
                                            style={{
                                                color: '#fff',
                                                fontSize: 24,
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Badge>
                                </Popover>
                            </div>
                            {!_.isEmpty(user) ? (
                                <div>
                                    <Popover
                                        content={
                                            <>
                                                <ul
                                                    style={{
                                                        listStyle: 'none',
                                                        padding: 0,
                                                        margin: 0,
                                                    }}
                                                >
                                                    <li className="text-center-menu-cus">
                                                        <a href="/vi-VN/translate/ja-JP/vi-VN">
                                                            <span className="">Chat với AI</span>
                                                        </a>
                                                    </li>
                                                    <li className="text-center-menu-cus">
                                                        <Link to={'/user-saved'} className="">
                                                            Danh sách đã lưu
                                                        </Link>
                                                    </li>
                                                    <li className="text-center-menu-cus">
                                                        <Link to={'/Community'} className="">
                                                            Cộng Đồng
                                                        </Link>
                                                    </li>
                                                    {!_.isEmpty(user) && user.role == 'admin' ? (
                                                        <li className="text-center-menu-cus">
                                                            <Link to={'/admin'} className="">
                                                                Quản trị
                                                            </Link>
                                                        </li>
                                                    ) : (
                                                        ''
                                                    )}

                                                    <li>
                                                        <button
                                                            onClick={() => {
                                                                localStorage.removeItem('user');
                                                                navigate('/login');
                                                            }}
                                                            className="font-bold text-white text-md cursor-pointer btn btn-dark"
                                                        >
                                                            Đăng xuất
                                                        </button>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    >
                                        <div
                                            className="avatar-header"
                                            style={{
                                                display: 'flex',
                                                gap: 6,
                                                alignItems: 'center',
                                                color: 'white',
                                            }}
                                        >
                                            <img
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer',
                                                }}
                                                src="https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                                                alt=""
                                            />
                                            <span>{user.name}</span>
                                        </div>
                                    </Popover>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between">
                                    <div className="d-flex align-items-center">
                                        {!stateAccount ? (
                                            <>
                                                <div className="item-bar item-login v-align-top">
                                                    <a href="/login"> Đăng nhập </a>
                                                </div>
                                                <div className="item-bar item-register v-align-top">
                                                    <a href="/register"> Đăng ký </a>
                                                </div>
                                            </>
                                        ) : (
                                            <div>
                                                <p className="font-bold text-white text-md cursor-pointer">
                                                    {user.name}
                                                </p>
                                                <button
                                                    onClick={() => {
                                                        localStorage.removeItem('user');
                                                        navigate('/login');
                                                    }}
                                                    className="font-bold text-white text-md cursor-pointer btn btn-dark"
                                                >
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
