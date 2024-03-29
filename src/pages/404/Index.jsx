import { Helmet } from "react-helmet";
import "./Index.scss"

const Index = () => {
    return (
        <div className="notfound">
            <Helmet>
                <title>Not Found</title>
                <meta name="description" content="Page tidak di temukan" />
            </Helmet>
            <div className="notfound-404">
                <h1>404</h1>
                <h2>Page not found</h2>
            </div>
            <a href="/">Homepage</a>
        </div>
    )
}

export default Index;

