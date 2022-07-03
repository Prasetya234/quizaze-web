import "./index.scss"
import Button from '../../components/button/Index'

function LeftContent() {
    return (
        <div className="konten-left">
            <div className="text">
                <p>Kepala Sekolah: </p>
                <p className="info">Anonymous</p>
            </div>
            <div className="text">
                <p>Phone:</p>
                <p className="info">+62 89504731540</p>
            </div>
            <div className="text">
                <p>Alamat:</p>
                <p className="info">Jalan Kemantren Raya</p>
            </div>
            <div className="button">
                <Button title="Edit Profile" action="" />
            </div>
            <div className="button">
                <Button title="Lihat Materi" action="" />
            </div>
            <p className="id">Jasdajd 12983182 khdkajhsd</p>
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
    return (
        <div className="admin-page">
            <div className="admin-page-head">
                <button>Logout</button>
                <p><b>Tk ceria 1</b></p>
                <p>{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="konten">
                <LeftContent />
                <RightContent />
            </div>
        </div>
    )
}

export default Index;