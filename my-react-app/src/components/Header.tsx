import "../styles/Home.css";

function Header() {
  return (
    <header className="header-main">
      <p
        style={{
          color: "#2260FF",
          fontSize: "28px",
          fontWeight: "700",
          margin: "0",
          marginTop: "25px",
        }}
      >
        Welcome,
      </p>
      <p style={{ color: "#598EFF", margin: "0", paddingBottom: "20px" }}>
        Let's check your expenses today !
      </p>
    </header>
  );
}

export default Header;
