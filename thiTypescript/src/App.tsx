import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Add from './admin/add';
import Admin from './admin/admin';
import Update from './admin/update';
import Signup from './home/signup';
import HomePage from './pages/HomePage';
import MainTranslate from './components/Translate/MainTranslate';
import TextToSpeech from './Test';
import Login from './pages/Login';
import Resigter from './pages/Resigter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Permission from './Permission';
import UserSaved from './admin/UserSaved';
import { Community_done } from './community/Community_done';
import TextEditor from './community/TextEditor';
import DetailsComunity from './community/DetailsComunity';
import './App.css';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/admin" element={<Permission element={<Admin />} />} />
                    <Route path="/auth/admin/add" element={<Add />} />
                    <Route path="/auth/admin/update/:id" element={<Update />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Resigter />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/user-saved" element={<UserSaved />} />
                    <Route path="/test" element={<TextToSpeech />} />
                    <Route path="/community" element={<Community_done />} />
                    <Route path="/community/:id" element={<DetailsComunity />} />

                    <Route path="/okok" element={<TextEditor />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
