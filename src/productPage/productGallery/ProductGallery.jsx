import styles from './ProductGallery.module.css';
import {useState} from "react";

function ProductGallery({images}) {
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return (
        <div className={styles.productGallery}>
            <div className={styles.mainImage}>
                <img src={selectedImage.url} alt="" />
            </div>
            <div className={styles.thumbnails}>
                {images.map((image, i) => (
                    <img src={image.url}
                         alt=""
                         key={i}
                         onClick={() => setSelectedImage(image)}
                         className={styles.thumbnail}/>
                ))}
            </div>


        </div>
    )
}
export default ProductGallery