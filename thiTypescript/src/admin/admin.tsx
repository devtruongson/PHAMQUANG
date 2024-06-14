import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Iproduct } from '../api/models';
import { getAll, remove } from '../api/products';
import TotalUser from './TotalUser';
import Header from '../components/Header/Header';
import Footer from '../components/footer/Footer';
export default function Admin() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Iproduct[]>([]);
    const showItem = async () => {
        const { data } = await getAll();
        setProducts(data);
    };
    useEffect(() => {
        showItem();
    }, []);
    const handelRemove = async (id: any) => {
        const conFirm = confirm('Are you sure you want to remove');
        if (conFirm) {
            const Remove = await remove(id);
            window.location.reload();
            console.log(Remove);
        }
    };
    useEffect(() => {}, []);
    return (
        <div>
            <Header />

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand btn btn-dark " style={{ color: 'white', fontWeight: 'bold' }} href="#">
                        Admin
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={'/admin/user'} className="nav-link active" aria-current="page">
                                    User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <TotalUser />
            <Footer />
        </div>
    );
}
