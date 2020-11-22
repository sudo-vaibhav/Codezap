import { signOut } from '../../firebase/firebase';
const Header = () => {
  return (
    <header className="mb-4 shadow">
      <nav className="navbar navbar-dark bg-dark primary-styled-border">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img
              src="/iste-logo.png"
              width={232}
              height={58}
              alt=""
              loading="lazy"
              // layout="fill"
            />
          </a>
          <div>
            <img
              src="/logout-icon.svg"
              width={25}
              height={27}
              onClick={async () => {
                await signOut();
              }}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
