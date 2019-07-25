import React from "react"
import "../../css/Landing.css"

export default function Footer() {
  return (
    <footer>
      <div className="container" id="foot">
        <div className="row">
          {/* Sisi kiri */}
          <div className="col-lg-3 col-md-6 col-sm-12">
            <img
              src={require("../../img/devKami.png")}
              className="logo"
              alt="Logo Lets Dev.jpg"
            />
            <br />
          </div>

          <div className="col-lg-2 pembates" />

          {/* Sisi Kanan */}
          <div className="col-lg-7 col-md-6 col-sm-12" id="about-us">
            <h4 className="font-weight-bold"> Tentang Kami :</h4>
            <p>
              &nbsp;Let's Dev adalah software house yang didirikan oleh 4 orang
              mahasiswa Brawijaya. Kami menyediakan jasa membuat website dan
              aplikasi android. Silahkan hubungi kami
            </p>
          </div>
        </div>
        <div className="row contact">
          Hubungi kami : 08980789580
          <p>Malang, Jawa Timur.</p>
        </div>
        {/* Sosmed */}
        <div className="row sosmed">
          <div className="col-lg-3 col-md-3 col-sm-3" />
          <div className="col-lg-2 col-md-2 col-sm-2" id="instagram">
            <a
              href="https://instagram.com/_panjig"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram" />
            </a>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2" id="linkedin">
            <a
              href="https://linkedin.com/in/panji-g"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin" />
            </a>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2" id="website">
            <a
              href="https://devkami.herokuapp.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe" />
            </a>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-3" />
        </div>
      </div>

      <div id="copyright">
        <span id="copyright-t">&copy; Panji Gemilang 2019</span>
      </div>
    </footer>
  )
}
