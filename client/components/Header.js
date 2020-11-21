import Image from 'next/image';
import styles from '../styles/Header.module.scss';
const Header = () => {
  return (
    <header>
      <nav className={`navbar navbar-dark bg-dark ${styles.navbar}`}>
        <a className="navbar-brand" href="#">
          <Image
            src="/iste-logo.png"
            width={232}
            height={58}
            alt=""
            quality={100}
            loading="lazy"
            // layout="fill"
          />
        </a>
        <div>
          <Image src="/logout-icon.svg" width={25} height={27}></Image>
        </div>
      </nav>
    </header>
  );
};

export default Header;
