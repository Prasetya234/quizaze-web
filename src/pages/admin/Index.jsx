import "./index.scss"
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { play } from '../../util/generateMusic';
import { getApi, updateSchoolInfo, searchMateriUser } from '../../app/fetchApi/connect';
import {
    Spinner, Form,
} from 'react-bootstrap';

import LoadingGalaxy from '../../components/load-galaxy/Index';
import Modal from '../../components/modal/Modal';
import ButtonComponent from '../../components/button/Index'

function MateriSelect({ isLoading, findMateriByInput, listMateri }) {
    const navigator = useNavigate();
    const onSelectMateri = async (item) => {
        play();
        navigator(`/materi-update/${item.id}`);
    };
    return (
        <div className="school-modal">
            <div className="school-modal-content">
                <Form.Control type="text" placeholder="Cari nama materi" onChange={(e) => findMateriByInput(e.target.value)} />
                <div className="school-modal-list_school">
                    {listMateri.map((e, i) => (
                        <div className="daftar-school" key={i} onClick={() => onSelectMateri(e)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <p><b>{e.materi}</b></p>
                                {e.alreadyAnswer ? (<p style={{ color: 'black' }}>Sudah menjawab</p>) : (<p>
                                    Total soal:
                                    {e.questionTotal}
                                </p>)}
                            </div>
                            <p style={{ marginBottom: '5px' }}>
                                Guru:
                                {e.teacher}
                            </p>
                        </div>
                    ))}
                    {isLoading && (
                        <div style={{ textAlign: 'center', marginTop: '20px', height: '100px' }}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                    {!listMateri.length && !isLoading && <p className="not-school">Materi tidak tersedia</p>}
                </div>
            </div>
        </div>
    );
}

function LeftContent({ school, fetchAuth }) {
    const [name, setName] = useState(school.name)
    const [address, setAddress] = useState(school.address)
    const [phoneNumber, setPhoneNumber] = useState(school.phoneNumber)
    const [headMaster, setHeadMaster] = useState(school.headMaster)
    const [isLoading, setLoading] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [modalMateri, setModalMateri] = useState(false)
    const [listMateri, setListMateri] = useState([]);

    const onEditProfile = async () => {
        play()
        if (!modalActive) {
            setModalActive(true)
            return
        }
        setLoading(true)
        const res = await updateSchoolInfo({
            schoolId: school.id,
            data: {
                address: address,
                headMaster: headMaster,
                name: name,
                phoneNumber: phoneNumber
            }
        })
        setLoading(false)
        if (!res) return
        fetchAuth()
        setModalActive(false)
    }
    const findMateriByInput = async (val) => {
        setLoading(true);
        setListMateri([]);
        const res = await searchMateriUser({ materi: val || '' });
        setLoading(false);
        if (!res) return;
        setListMateri(res);
    };
    const showMateri = () => { play(); findMateriByInput(); setModalMateri(true); }
    return (
        <div className="konten-left">
            <Modal title="Pilih materi" close={() => { play(); setModalMateri(false); }} active={modalMateri}>
                <MateriSelect
                    findMateriByInput={findMateriByInput}
                    listMateri={listMateri}
                    isLoading={isLoading}
                />
            </Modal>
            <Modal title="Edit Profile Sekolah" close={() => { play(); setModalActive(false) }} active={modalActive} height="380px">
                {isLoading ? (
                    <div style={{
                        top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)',
                    }}
                    >
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : ''}
                <div>
                    <input type="text" placeholder="Nama Sekolah" autoFocus value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder="Kepala Sekolah" autoFocus value={headMaster} onChange={(e) => setHeadMaster(e.target.value)} />
                    <input type="number" placeholder="Nomor Telepon" autoFocus value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    <input type="text" placeholder="Alamat Sekolah" autoFocus value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="profile-modal-id">
                    <p>{school.id}</p>
                    <p className="profile-modal-edit" onClick={onEditProfile}>Simpan perubahan</p>
                </div>
            </Modal>
            <div>
                <div className="text">
                    <p>Kepala Sekolah: </p>
                    <p className="info">{school.headMaster}</p>
                </div>
                <div className="text">
                    <p>Phone:</p>
                    <p className="info">{school.phoneNumber}</p>
                </div>
                <div className="text">
                    <p>Alamat:</p>
                    <p className="info">{school.address}</p>
                </div>
            </div>
            <div>
                <div className="button">
                    <ButtonComponent title="Edit Profile" action={onEditProfile} />
                </div>
                <div className="button">
                    <ButtonComponent title="Lihat Materi" action={showMateri} />
                </div>
            </div>

            <p className="id">{school.id}</p>
        </div>
    )
}

function RightContent() {
    return (
        <div className="konten-right">

        </div>
    )
}

function Index() {
    const [isLoading, setLoading] = useState(false)
    const navigator = useNavigate();
    const fetchUserAuth = async () => {
        setLoading(true);
        const datauser = JSON.parse(localStorage.getItem('auth'));
        const res = await getApi(datauser ? datauser.user.id : '');
        setLoading(false);
        if (!res) return;
        setSchool(res.user.school)
    };
    const [school, setSchool] = useState({
        headMaster: '',
        id: '',
        name: '',
        phoneNumber: '',
        address: ''
    });
    const getSchoolInformation = () => {
        const res = JSON.parse(localStorage.getItem('auth'));
        if (!res || res.user.roles.find(item => item === 'USER')) {
            navigator('/')
            return;
        }
        fetchUserAuth()

    }
    const logOut = () => {
        localStorage.removeItem('auth')
        navigator('/')
    }
    useEffect(() => {
        getSchoolInformation()
    }, [])
    return (
        <>
            {isLoading ? <LoadingGalaxy /> : (<div className="admin-page">
                <div className="admin-page-head">
                    <button onClick={logOut}>Logout</button>
                    <p><b>{school.name}</b></p>
                    <p>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="konten">
                    <LeftContent school={school} fetchAuth={fetchUserAuth} />
                    <RightContent />
                </div>
            </div>)}
        </>
    )
}

export default Index;