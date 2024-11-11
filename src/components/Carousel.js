import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css'; // Optional: Add your custom styles here

function CarouselComponent() {
  return (
    <Carousel className="custom-carousel">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://files.opendiary.com/wp-content/uploads/2020/03/12054433/0063A884-B028-4B50-857D-C60D9946386E.gif"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Welcome to Watchsy</h3>
          <p>Stream your favorite movies and shows anytime, anywhere.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images8.alphacoders.com/741/741725.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Explore Trending Movies</h3>
          <p>Enjoy the latest releases and all-time classics.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://m.media-amazon.com/images/M/MV5BNDczYjdmMmItYjYyOC00NDg4LTgzOWQtNTBjZmVmNWMwNDcyXkEyXkFqcGc@._V1_.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Subscribe for Premium Access</h3>
          <p>Get exclusive access to premium content and features.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.indirin.co/wp-content/uploads/2023/07/oppenheimer-filmini-indir.jpg"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComponent;
