import Image from "next/image";
import styles from "./style.module.css";

function Home() {
  return (
    <div>
      <div className={styles.perfil}>
        <Image src="/images/logo.png" width={200} height={200} alt="Perfil" />
        <div className={styles.descricao}>
          <h2>Alex Venceslau</h2>
          <p>Desenvolvedor web desde 2009.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
