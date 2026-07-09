import './productCard.css'

function AdminPageProductCard({product}) {
    return (
        <div className="productCard">
            <div className="productImages">
                {product.images.map((image, index) => (
                    <img
                        key={index}
                        src={image.url}
                        alt={`${product.title} ${index + 1}`}
                    />
                ))}
            </div>

            <div className="productInfo">
                <h2>{product.title}</h2>

                <p className="description">
                    {product.description}
                </p>

                <div className="details">
                    <span><strong>ID:</strong> {product.prodId}</span>
                    <span><strong>Color:</strong> {product.color}</span>
                    <span><strong>Fabric:</strong> {product.fabric}</span>
                </div>

                <div className="variantGrid">
                    {product.variants.map(variant => (
                        <div className="variantCard" key={variant.size}>
                            <h4>{variant.size}</h4>
                            <p>MRP: ₹{variant.mrp}</p>
                            <p>Discount: {variant.discount}%</p>
                            <p>Stock: {variant.stock}</p>
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}
export default AdminPageProductCard;