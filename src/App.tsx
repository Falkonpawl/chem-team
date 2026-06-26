import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Schedule from "./pages/Schedule"
import Articles from "./pages/Articles"
import ArticleDetail from "./pages/ArticleDetail"
import NotFound from "./pages/NotFound"
import { ModalProvider } from "./context/ModalContext"
import "./App.css"

function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<ArticleDetail />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  )
}

export default App
