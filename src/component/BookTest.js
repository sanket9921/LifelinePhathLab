import TestDescription from "./TestDescription";
export default function BookTest() {
  function showModel() {
    document.querySelector(".overlay").classList.add("showOverlay");
  }
  return (
    <div className="container mt-2 rounded Test">
      <TestDescription />
      <div className="row">
        <div className="col-2 border p-2">
          <h5 className="filters">Fillter</h5>
          <div className="filter-items">
            <div className="ms-4 mt-2">
              <div>Heart</div>
              <div>Kidney</div>
              <div>Liver</div>
              <div>Thyroid</div>
              <div>Brain</div>
              <div>Intestines</div>
              <div>Joints</div>
              <div>Pancreas</div>
              <div>Stomach</div>
              <div>Muscle</div>
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="row">
            <div
              onClick={showModel}
              className="product-cart rounded col-3 mt-3"
            >
              <div className="img">
                <img
                  className="img-fluid"
                  src="./assests/image/download.jpg"
                  alt=""
                />
              </div>
              <div className="title mt-3 text-center">
                <h4>Allergy Package</h4>
              </div>
              <div className="price">
                <span className="off">45% off</span>
                <span className="dis-price">
                  ₹900 <del className="actual-price">₹1000</del>
                </span>
              </div>
              <div className="action-btn mt-3 ">
                <button className="card">Add to cart</button>
                <button className="buy">Buy Now</button>
              </div>
            </div>
            <div
              onClick={showModel}
              className="product-cart rounded col-3 mt-3"
            >
              <div className="img">
                <img
                  className="img-fluid"
                  src="./assests/image/download.jpg"
                  alt=""
                />
              </div>
              <div className="title mt-3 text-center">
                <h4>Allergy Package</h4>
              </div>
              <div className="price">
                <span className="off">45% off</span>
                <span className="dis-price">
                  ₹900 <del className="actual-price">₹1000</del>
                </span>
              </div>
              <div className="action-btn mt-3 ">
                <button className="card">Add to cart</button>
                <button className="buy">Buy Now</button>
              </div>
            </div>
            <div
              onClick={showModel}
              className="product-cart rounded col-3 mt-3"
            >
              <div className="img">
                <img
                  className="img-fluid"
                  src="./assests/image/download.jpg"
                  alt=""
                />
              </div>
              <div className="title mt-3 text-center">
                <h4>Allergy Package</h4>
              </div>
              <div className="price">
                <span className="off">45% off</span>
                <span className="dis-price">
                  ₹900 <del className="actual-price">₹1000</del>
                </span>
              </div>
              <div className="action-btn mt-3 ">
                <button className="card">Add to cart</button>
                <button className="buy">Buy Now</button>
              </div>
            </div>
            <div
              onClick={showModel}
              className="product-cart rounded col-3 mt-3"
            >
              <div className="img">
                <img
                  className="img-fluid"
                  src="./assests/image/download.jpg"
                  alt=""
                />
              </div>
              <div className="title mt-3 text-center">
                <h4>Allergy Package</h4>
              </div>
              <div className="price">
                <span className="off">45% off</span>
                <span className="dis-price">
                  ₹900 <del className="actual-price">₹1000</del>
                </span>
              </div>
              <div className="action-btn mt-3 ">
                <button className="card">Add to cart</button>
                <button className="buy">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
