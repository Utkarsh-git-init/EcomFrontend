import './addProduct.css'

function AddVariant({size,variant,addVariant,removeVariant,updateVariant}) {
    const exists = variant != null;
    return (
        <div className="variants">
            <div >
                <label>size:{size}</label>
                <button
                    type="button"
                    onClick={() =>
                        exists ? removeVariant(size) : addVariant(size)
                    }
                >
                    {exists ? "Remove size" : "Add size"}
                </button>
            </div>
            {
                exists &&
                <div className={"variants-details"}>
                    <div>
                        <label>Stock:</label>
                        <input value={variant?.stock ?? ""}
                               onChange={e =>
                                   updateVariant(size, "stock", e.target.value === "" ? null : Number(e.target.value))
                               }
                               type={"number"}
                               step={1}
                               min="0"
                               name="stock"></input>
                    </div>
                    <div>
                        <label>MRP:</label>
                        <input value={variant?.mrp ?? ""}
                               onChange={e =>
                                   updateVariant(size, "mrp", e.target.value === "" ? null : Number(e.target.value))
                               }
                               type="number"
                               step={0.01}
                               min="0"
                               name="mrp"></input>
                    </div>
                    <div>
                        <label>Discount(%):</label>
                        <input value={variant?.discount ?? ""}
                               onChange={e =>
                                   updateVariant(size, "discount", e.target.value === "" ? null : Number(e.target.value))
                               }
                               type="number"
                               step={0.01}
                               min="0"
                               name="discount"></input>
                    </div>
                </div>
            }
        </div>
    )
}
export default AddVariant;