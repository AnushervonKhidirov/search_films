import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';

function App() {
  return (
    <>
      <Header />

      <Content>
        <Main />
      </Content>

      <Footer />
    </>
  );
}

export default App;
