import { Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
// import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Film from './pages/Film/Film';

function App() {
	return (
		<>
			<Header />

			<main>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/film:id' element={<Film />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
