import './addProduct.css'
import {useState} from "react";
import AddVariant from "./AddVariant.jsx";

function AddProduct(){
    const [product, setProduct] = useState({
        title: "",
        description: "",
        color: "",
        fabric: "",
        images: [],
        variants: []
    });
    const sizes=["XS","S","M","L","XL","XXL"];
    const [images, setImages] = useState([
        {
            file: null,
            preview: null
        }
    ]);
    const [loading, setLoading] = useState(false);
    function handleImageChange(index, e) {
        const file = e.target.files[0];

        if (!file) return;

        const newImages = [...images];

        newImages[index] = {
            file,
            preview: URL.createObjectURL(file)
        };

        setImages(newImages);
    }
    function addImageInput() {
        setImages(prev => [
            ...prev,
            {
                file: null,
                preview: null
            }
        ]);
    }
    function removeImage(index) {
        setImages(prev => {
            // Clean up the preview URL to avoid memory leaks
            if (prev[index].preview) {
                URL.revokeObjectURL(prev[index].preview);
            }

            const newImages = prev.filter((_, i) => i !== index);

            // Always keep at least one empty input
            return newImages.length
                ? newImages
                : [{ file: null, preview: null }];
        });
    }
    function addVariant(size) {
        setProduct(prev => ({
            ...prev,
            variants: [
                ...prev.variants,
                {
                    size,
                    stock: null,
                    mrp: null,
                    discount: null
                }
            ]
        }));
    }
    function removeVariant(size) {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.filter(v => v.size !== size)
        }));
    }
    function updateVariant(size, field, value) {
        setProduct(prev => ({
            ...prev,
            variants: prev.variants.map(v =>
                v.size === size
                    ? { ...v, [field]: value }
                    : v
            )
        }));
    }
    async function uploadImage(file) {
        const formData = new FormData();
        const cloudName=import.meta.env.VITE_API_CLOUD_NAME;
        const uploadPreset=import.meta.env.VITE_API_UPLOAD_PRESET;
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(
            "https://api.cloudinary.com/v1_1/"+cloudName+"/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        return data.secure_url;
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const imageUrls = await Promise.all(
            images
                .filter(image => image.file)
                .map(image => uploadImage(image.file))
        );

        const productToSend = {
            ...product,
            images: imageUrls.map(url => ({
                url
            }))
        };

        const baseUrl = import.meta.env.VITE_API_BASE_URL;

        const response = await fetch(baseUrl + "/admin/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: localStorage.getItem("token")
            },
            body: JSON.stringify(productToSend)
        });

        const data = await response.json();
        console.log(data);
        setLoading(false);
    }
    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)} className="form"
                  onKeyDown={e => {
                      if (e.key === "Enter") {
                          e.preventDefault()
                      }
                  }}>
                <label>Product title:</label>
                <textarea value={product.title}
                          onChange={(e) =>
                              setProduct(prev => ({
                                  ...prev,
                                  title: e.target.value
                              }))
                          } name="title"></textarea>
                <br/>
                <label>description:</label>
                <textarea value={product.description}
                          onChange={(e) =>
                              setProduct(prev => ({
                                  ...prev,
                                  description: e.target.value
                              }))
                          }
                          name="description"></textarea>
                <br/>
                <label>Color:</label>
                <input value={product.color}
                       onChange={(e) =>
                           setProduct(prev => ({
                               ...prev,
                               color: e.target.value
                           }))
                       }
                       name="color"></input>
                <br/>
                <label>Fabric:</label>
                <input value={product.fabric}
                       onChange={(e) =>
                           setProduct(prev => ({
                               ...prev,
                               fabric: e.target.value
                           }))
                       }
                       name="fabric"></input>
                <br/>

                {images.map((image, index) => (
                    <div key={index}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(index, e)}
                        />

                        {image.preview && (
                            <>
                                <img src={image.preview} width={150} alt="Preview" />

                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                >
                                    Remove
                                </button>
                            </>
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    disabled={!images[images.length - 1].file}
                    onClick={addImageInput}
                >
                    Add another image
                </button>

                <h3>Variants</h3>
                <div className="variants">
                    {sizes.map(size => {
                        const variant = product.variants.find(v => v.size === size);

                        return (
                            <AddVariant
                                key={size}
                                size={size}
                                variant={variant}
                                addVariant={addVariant}
                                removeVariant={removeVariant}
                                updateVariant={updateVariant}
                            />
                        );
                    })}
                </div>
                {
                    loading ?
                        <div className="loader"></div>
                        :
                        <button className="button" type="submit">Add Product</button>
                }

            </form>
        </>
    )
}
export default AddProduct;