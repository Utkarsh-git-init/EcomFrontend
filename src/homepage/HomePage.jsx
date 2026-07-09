import './homepage.css'
import ProductPeek from "./productPeek/ProductPeek.jsx";

function HomePage() {
    return (
        <div className="HomePage">
            <img id={"homepage-image"} src={"https://res.cloudinary.com/dhwhvxqvr/image/upload/v1782301613/1000073894_qgxtmc.jpg"} alt={"homepage-image"}/>
            <ProductPeek/>
        </div>
    )
}
export default HomePage;