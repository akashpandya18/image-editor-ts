import "./App.css";
import ImageAnnot from "./components/TagAnnotation";
import TestImage from "./assets/testImage.png";

function App() {
  return (
    <div className='App'>
      <ImageAnnot imageSrc={TestImage} />
    </div>
  );
}

export default App;
