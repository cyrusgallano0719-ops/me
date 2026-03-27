import { Container } from 'react-bootstrap';

const MyPortfolio = () => {
  return (
    <Container fluid className="p-0">
      <iframe
        title="MyPortfolio Template"
        src="/myportfolio/index.html"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </Container>
  );
};

export default MyPortfolio;
