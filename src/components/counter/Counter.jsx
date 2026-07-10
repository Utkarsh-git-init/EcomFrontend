import styles from './Counter.module.css';

function Counter({count, setCount}) {
    return (
        <div className={styles.counter}>
            <button className={styles.decrementButton} onClick={() => setCount(count - 1)}>-</button>
            <p>{count}</p>
            <button className={styles.incrementButton} onClick={() => setCount(count + 1)}>+</button>
        </div>
    )
}
export  default Counter