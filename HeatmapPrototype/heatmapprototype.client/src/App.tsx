import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeatmapEditor from './Pages/Editor/HeatmapEditor';
import Heatmap from './Pages/Heatmap/Heatmap';
import { Layout } from './Components/Layout/Layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/editor" element={<HeatmapEditor />} />
                    <Route path="/heatmap" element={<Heatmap />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;