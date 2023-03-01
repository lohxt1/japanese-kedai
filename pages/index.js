import NeonRoom from "@/three-containers/neonRoom";
import Layout from "../containers/Layout";

const IndexPage = (props) => {
  const { isMobile } = props;
  return (
    <>
      <Layout>
        {isMobile ? <div className="nope">Nope [ 🖥 only ]</div> : <NeonRoom />}
      </Layout>
      <style jsx>{`
        .nope {
          position: absolute;
          background: #000;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          width: 100%;
          height: 100%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

IndexPage.getInitialProps = ({ req }) => {
  let userAgent;
  if (req) {
    // if you are on the server and you get a 'req' property from your context
    userAgent = req.headers["user-agent"]; // get the user-agent from the headers
  } else {
    userAgent = navigator.userAgent; // if you are on the client you can access the navigator from the window object
  }
  let isMobile = Boolean(
    userAgent.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return { isMobile };
};

export default IndexPage;
