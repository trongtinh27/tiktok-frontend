import Header from "~/layouts/components/Header";

function HeaderOnly({ children, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <div className="contnet">{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnly;
