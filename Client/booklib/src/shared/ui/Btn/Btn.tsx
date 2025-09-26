import styles from "./Btn.module.scss";

interface IBtn {
  TextBtn: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

function Btn({ TextBtn, onClick, type }: IBtn) {
  return (
    <button onClick={onClick} type={type} className={styles.btn}>
      {TextBtn}
    </button>
  );
}

export default Btn;
