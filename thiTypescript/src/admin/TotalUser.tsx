import React, { useEffect, useState } from 'react';
import { getAllUser, removelUser, signupData } from '../api/auth';
import { toast } from 'react-toastify';
import { InfoCircle } from 'react-bootstrap-icons';
import { Modal } from 'antd';
import UserHandle from './UserHandle';

const TotalUser = () => {
    const [dataUser, setDataUser] = useState([]);
    const [handelAdd, setHandelAdd] = useState(false);
    const [dataLogin, setDataLogin] = useState<any>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    useEffect(() => {
        const handelgetUser = async () => {
            const { data } = await getAllUser();
            console.log(data);
            setDataUser(data);
        };
        handelgetUser();
    }, []);
    const handelSignin = (event: any) => {
        event.preventDefault();
        if (
            dataLogin.email.trim() == '' ||
            dataLogin.password.trim() == '' ||
            dataLogin.confirmPassword.trim() == '' ||
            dataLogin.name.trim() == ''
        ) {
            toast.error('vui lòng nhập đầy đủ email  password');
            return;
        }
        signupData(dataLogin)
            .then((data) => {
                console.log(data);
                window.location.reload();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                console.error(error);
            });
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [idUser, setIdUser] = useState('');

    return (
        <div>
            <Modal
                title="Thông tin tài khoản"
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
                width="60vw"
            >
                <UserHandle id={idUser} />
            </Modal>
            {handelAdd ? (
                <form noValidate className="box-login mgt-20 ng-untouched ng-pristine ng-invalid">
                    <div className="form-group st-form-group">
                        <input
                            onChange={(e: any) =>
                                setDataLogin({
                                    ...dataLogin,
                                    name: e.target.value,
                                })
                            }
                            type="text"
                            name="name"
                            placeholder="Name"
                            className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                    </div>
                    <div className="form-group st-form-group">
                        <img
                            src="https://mazii.net/assets/imgs/icon/ic_envelope.png"
                            alt="icon envelope"
                            title="email"
                            className="st_icon st-fa-envelope-o"
                        />
                        <input
                            onChange={(e: any) =>
                                setDataLogin({
                                    ...dataLogin,
                                    email: e.target.value,
                                })
                            }
                            type="text"
                            name="email"
                            placeholder="Email"
                            className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                    </div>
                    <div className="form-group st-form-group">
                        <img
                            src="https://mazii.net/assets/imgs/icon/ic_key.png"
                            alt="icon key"
                            title="password"
                            className="st_icon st-fa-key"
                        />
                        <input
                            onChange={(e: any) =>
                                setDataLogin({
                                    ...dataLogin,
                                    password: e.target.value,
                                })
                            }
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                    </div>
                    <div className="form-group st-form-group">
                        <img
                            src="https://mazii.net/assets/imgs/icon/ic_two_pass.png"
                            alt="pass"
                            title="password"
                            className="st-reconfirm"
                        />
                        <input
                            onChange={(e: any) =>
                                setDataLogin({
                                    ...dataLogin,
                                    confirmPassword: e.target.value,
                                })
                            }
                            type="password"
                            name="passConfirm"
                            placeholder="Confirm password"
                            className="form-control st-radius bg-input ng-untouched ng-pristine ng-invalid"
                        />
                        <p className="txt-center same-position txt-success" />
                    </div>
                    <button
                        onClick={(e: any) => handelSignin(e)}
                        type="button"
                        className="st-btn-login btn-login cust-login btn_register"
                    >
                        create
                    </button>
                </form>
            ) : (
                <div className="container">
                    <div className="float-end my-5">
                        <a className="text-decoration-none">
                            <button onClick={() => setHandelAdd(true)} className="btn btn-success">
                                Add người dùng
                            </button>
                        </a>
                    </div>
                    <center>
                        <h1>List người dùng</h1>
                    </center>
                    <div className="list p-3 table-render-res">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col ">#</th>
                                    <th scope="col">Họ Tên</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Quyền hạn</th>
                                    <th scope="col">Số từ đã lưu</th>
                                    <th scope="col">Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataUser?.map((db: any, index: number) => (
                                    <tr key={db._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{db.name}</td>
                                        <td>{db.email}</td>
                                        <td>{db.role}</td>
                                        <td>{db.note.length}</td>
                                        <td style={{ display: 'flex', gap: '5px' }}>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Are you sure you want to delete this user?')) {
                                                        removelUser(db._id)
                                                            .then((response) => {
                                                                toast.success('User deleted successfully');
                                                                setTimeout(() => {
                                                                    window.location.reload();
                                                                }, 2500);
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                            });
                                                    }
                                                }}
                                                type="button"
                                                className="btn btn-danger"
                                                data-bs-toggle="modal"
                                                data-bs-target="#exampleModal"
                                            >
                                                Xóa
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    setIsModalOpen(true);
                                                    setIdUser(db._id);
                                                }}
                                            >
                                                <InfoCircle />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TotalUser;
