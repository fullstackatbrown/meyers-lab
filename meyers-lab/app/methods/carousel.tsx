import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import "./App.css";
const images = [
  "meyers-lab/app/methods/sample-image.png",
  "meyers-lab/app/methods/sample-image.png",
  "meyers-lab/app/methods/sample-image.png",
];
function App() {
  return (
    <div className="box">
      <Carousel useKeyboardArrows={true}>
        {images.map((URL, index) => (
          <div className="slide">
            <img alt="sample_file" src={URL} key={index} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
export default App;
