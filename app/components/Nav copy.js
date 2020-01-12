import Link from "next/link";
import { Gql } from "../modules";
import React from "react";
export default function Posts() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md">
        <div className="container">
          <a className="navbar-brand text-uppercase text-danger" href="#">
            <img
              src="/img/73188838_2367988273517916_6391647450892861440_n.jpg"
              style="height: 40px;width: 40px;"
            />
            &nbsp;Quảng Đà Camera
          </a>
          <div className="row">
            <div className="col-6 col-sm-4">
              <h6 className="text-danger">
                <i className="fa fa-map-marker mr-2"></i>Địa chỉ 1
              </h6>
              <hr />
              <p data-aos="fade-down">
                Bình Đào, Thăng Bình, Quảng Nam
                <br />
              </p>
            </div>
            <div className="col-6 col-sm-4">
              <h6 className="text-danger">
                <i className="fa fa-map-marker mr-2"></i>Địa chỉ 2
              </h6>
              <hr />
              <p data-aos="fade-down" data-aos-delay="100">
                Thuận An 4, Thanh Khê, Tp. Đà Nẵng
                <br />
              </p>
            </div>
            <div className="col-12 col-sm-4">
              <h6 className="text-danger">
                <i className="fa fa-phone mr-2"></i>Điện thoại
              </h6>
              <hr />
              <p data-aos="fade-down" data-aos-delay="200">
                0935.584.569
                <br />
                0866.453.580
                <br />
              </p>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .footer-basic {
          padding: 40px 0;
          background-color: #fff;
          color: #4b4c4d;
        }
        .footer-basic ul {
          padding: 0;
          list-style: none;
          text-align: center;
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 0;
        }
        .footer-basic li {
          padding: 0 10px;
        }
        .footer-basic ul a {
          color: inherit;
          text-decoration: none;
          opacity: 0.8;
        }
        .footer-basic ul a:hover {
          opacity: 1;
        }
        .footer-basic .social {
          text-align: center;
          padding-bottom: 25px;
        }
        .footer-basic .social > a {
          font-size: 24px;
          width: 40px;
          height: 40px;
          line-height: 40px;
          display: inline-block;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #ccc;
          margin: 0 8px;
          color: inherit;
          opacity: 0.75;
        }
        .footer-basic .social > a:hover {
          opacity: 0.9;
        }
        .footer-basic .copyright {
          margin-top: 15px;
          text-align: center;
          font-size: 13px;
          color: #aaa;
          margin-bottom: 0;
        }
        .header-blue {
          background: linear-gradient(135deg, #172a74, #21a9af);
          background-color: #184e8e;
          padding-bottom: 80px;
          font-family: "Source Sans Pro", sans-serif;
        }
        @media (min-width: 768px) {
          .header-blue {
            padding-bottom: 120px;
          }
        }
        .header-blue .navbar {
          background: 0 0;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          color: #fff;
          border-radius: 0;
          box-shadow: none;
          border: none;
        }
        .header-blue .navbar .navbar-brand {
          font-weight: 700;
          color: inherit;
        }
        .header-blue .navbar .navbar-brand:hover {
          color: #f0f0f0;
        }
        .header-blue .navbar .navbar-collapse {
          border-top: 1px solid rgba(255, 255, 255, 0.3);
          margin-top: 0.5rem;
        }
        @media (min-width: 768px) {
          .header-blue .navbar {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          .header-blue .navbar .navbar-collapse {
            border-color: transparent;
            margin: 0;
          }
          .header-blue .navbar-nav .nav-link {
            padding-left: 0.7rem;
            padding-right: 0.7rem;
          }
        }
        .header-blue .navbar .navbar-collapse span .login {
          color: #d9d9d9;
          margin-right: 0.5rem;
          text-decoration: none;
        }
        .header-blue .navbar .navbar-collapse span .login:hover {
          color: #fff;
        }
        .header-blue .navbar .navbar-toggler {
          border-color: rgba(255, 255, 255, 0.3);
        }
        .header-blue .navbar .navbar-toggler:hover,
        .header-blue .navbar-toggler:focus {
          background: 0 0;
        }
        @media (min-width: 992px) {
          .header-blue .navbar-nav .nav-link {
            padding-left: 1.2rem;
            padding-right: 1.2rem;
          }
        }
        .header-blue .navbar.navbar-light .navbar-nav .nav-link {
          color: #d9d9d9;
        }
        .header-blue .navbar.navbar-light .navbar-nav .nav-link:focus,
        .header-blue .navbar.navbar-light .navbar-nav .nav-link:hover {
          color: #fcfeff !important;
          background-color: transparent;
        }
        .header-blue .navbar .navbar-nav > li > .dropdown-menu {
          margin-top: -5px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          border-radius: 2px;
        }
        .header-blue .navbar .dropdown-menu .dropdown-item,
        .header-blue .navbar .dropdown-menu .dropdown-item:focus {
          line-height: 2;
          color: #37434d;
        }
        .header-blue .navbar .dropdown-menu .dropdown-item:focus,
        .header-blue .navbar .dropdown-menu .dropdown-item:hover {
          background: #ebeff1;
        }
        .header-blue .action-button,
        .header-blue .action-button:not(.disabled):active {
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 40px;
          color: #ebeff1;
          box-shadow: none;
          text-shadow: none;
          padding: 0.3rem 0.8rem;
          background: 0 0;
          transition: background-color 0.25s;
          outline: 0;
        }
        .header-blue .action-button:hover {
          color: #fff;
        }
        .header-blue .navbar .form-inline label {
          color: #d9d9d9;
        }
        .header-blue .navbar .form-inline .search-field {
          display: inline-block;
          width: 80%;
          background: 0 0;
          border: none;
          border-bottom: 1px solid transparent;
          border-radius: 0;
          box-shadow: none;
          color: inherit;
          transition: border-bottom-color 0.3s;
        }
        .header-blue .navbar .form-inline .search-field:focus {
          border-bottom: 1px solid #ccc;
        }
        .header-blue .hero {
          margin-top: 20px;
          text-align: center;
        }
        @media (min-width: 768px) {
          .header-blue .hero {
            margin-top: 60px;
            text-align: left;
          }
        }
        .header-blue .hero h1 {
          color: #fff;
          font-size: 40px;
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: 300;
          line-height: 1.4;
        }
        @media (min-width: 992px) {
          .header-blue .hero h1 {
            margin-top: 190px;
            margin-bottom: 24px;
            line-height: 1.2;
          }
        }
        .header-blue .hero p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 20px;
          margin-bottom: 30px;
          font-weight: 300;
        }
        .header-blue .phone-holder {
          text-align: right;
        }
        .header-blue div.iphone-mockup {
          position: relative;
          max-width: 300px;
          margin: 20px;
          display: inline-block;
        }
        .header-blue .iphone-mockup img.device {
          width: 100%;
          height: auto;
        }
        .header-blue .iphone-mockup .screen {
          position: absolute;
          width: 88%;
          height: 77%;
          top: 12%;
          border-radius: 2px;
          left: 6%;
          border: 1px solid #444;
          overflow: hidden;
          background: url(../../assets/img/screen-content-iphone-6.jpg) center;
          background-size: cover;
        }
        .header-blue .iphone-mockup .screen:before {
          content: "";
          background-color: #fff;
          position: absolute;
          width: 70%;
          height: 140%;
          top: -12%;
          right: -60%;
          transform: rotate(-19deg);
          opacity: 0.2;
        }
        .navigation-clean {
          background: #fff;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
          color: #333;
          border-radius: 0;
          box-shadow: none;
          border: none;
          margin-bottom: 0;
        }
        .navigation-clean .navbar-brand {
          font-weight: 700;
          color: inherit;
        }
        .navigation-clean .navbar-brand:hover {
          color: #222;
        }
        .navigation-clean.navbar-dark .navbar-brand:hover {
          color: #f0f0f0;
        }
        .navigation-clean .navbar-brand img {
          height: 100%;
          display: inline-block;
          margin-right: 10px;
          width: auto;
        }
        .navigation-clean .navbar-toggler {
          border-color: #ddd;
          color: #888;
        }
        .navigation-clean .navbar-toggler:focus,
        .navigation-clean .navbar-toggler:hover {
          background: 0 0;
        }
        .navigation-clean.navbar-dark .navbar-toggler {
          border-color: #555;
          color: #eee;
        }
        .navigation-clean .form-inline,
        .navigation-clean .navbar-collapse {
          border-top-color: #ddd;
        }
        .navigation-clean.navbar-dark .form-inline,
        .navigation-clean.navbar-dark .navbar-collapse {
          border-top-color: #333;
        }
        .navigation-clean .navbar-nav > .active > a,
        .navigation-clean .navbar-nav > .show > a {
          background: 0 0;
          box-shadow: none;
        }
        .navigation-clean.navbar-light .navbar-nav .nav-link.active,
        .navigation-clean.navbar-light .navbar-nav .nav-link.active:focus,
        .navigation-clean.navbar-light .navbar-nav .nav-link.active:hover {
          color: #8f8f8f;
          box-shadow: none;
          background: 0 0;
          pointer-events: none;
        }
        .navigation-clean.navbar .navbar-nav .nav-link {
          padding-left: 18px;
          padding-right: 18px;
        }
        .navigation-clean.navbar-light .navbar-nav .nav-link {
          color: #465765;
        }
        .navigation-clean.navbar-light .navbar-nav .nav-link:focus,
        .navigation-clean.navbar-light .navbar-nav .nav-link:hover {
          color: #37434d !important;
          background-color: transparent;
        }
        .navigation-clean .navbar-nav > li > .dropdown-menu {
          margin-top: -5px;
          box-shadow: none;
          background-color: #fff;
          border-radius: 2px;
        }
        @media (min-width: 768px) {
          .navigation-clean {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }
          .navigation-clean .navbar-nav .show .dropdown-menu {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
        }
        @media (max-width: 767px) {
          .navigation-clean .navbar-nav .show .dropdown-menu .dropdown-item {
            color: #37434d;
            padding-top: 0.8rem;
            padding-bottom: 0.8rem;
            line-height: 1;
          }
        }
        .projects-clean .projects,
        .projects-horizontal .projects {
          padding-bottom: 40px;
        }
        .navigation-clean .dropdown-menu .dropdown-item,
        .navigation-clean .dropdown-menu .dropdown-item:focus {
          line-height: 2;
          color: #37434d;
        }
        .navigation-clean .dropdown-menu .dropdown-item:focus,
        .navigation-clean .dropdown-menu .dropdown-item:hover {
          background: #eee;
          color: inherit;
        }
        .navigation-clean.navbar-dark {
          background-color: #1f2021;
          color: #fff;
        }
        .navigation-clean.navbar-dark .navbar-nav a.active,
        .navigation-clean.navbar-dark .navbar-nav a.active:focus,
        .navigation-clean.navbar-dark .navbar-nav a.active:hover {
          color: #8f8f8f;
          box-shadow: none;
          background: 0 0;
          pointer-events: none;
        }
        .navigation-clean.navbar-dark .navbar-nav .nav-link {
          color: #dfe8ee;
        }
        .navigation-clean.navbar-dark .navbar-nav .nav-link:focus,
        .navigation-clean.navbar-dark .navbar-nav .nav-link:hover {
          color: #fff;
          background-color: transparent;
        }
        .navigation-clean.navbar-dark .navbar-nav > li > .dropdown-menu {
          background-color: #1f2021;
        }
        .navigation-clean.navbar-dark .dropdown-menu .dropdown-item,
        .navigation-clean.navbar-dark .dropdown-menu .dropdown-item:focus {
          color: #f2f5f8;
        }
        .navigation-clean.navbar-dark .dropdown-menu .dropdown-item:focus,
        .navigation-clean.navbar-dark .dropdown-menu .dropdown-item:hover {
          background: #363739;
        }
        @media (max-width: 767px) {
          .navigation-clean.navbar-dark
            .navbar-nav
            .show
            .dropdown-menu
            .dropdown-item {
            color: #fff;
          }
        }
        .category_item:hover {
          background-color: rgba(0, 0, 0, 0.3);
          color: #fff;
          transition-duration: 0.3s;
        }
        .text-decoration-none:hover {
          color: inherit;
        }
        .duration {
          transition: background 0.5s;
        }
        .projects-clean {
          color: #313437;
          background-color: #fff;
        }
        .projects-clean p {
          color: #7d8285;
        }
        .projects-clean h2 {
          font-weight: 700;
          margin-bottom: 40px;
          padding-top: 40px;
          color: inherit;
        }
        @media (max-width: 767px) {
          .projects-clean h2 {
            margin-bottom: 25px;
            padding-top: 25px;
            font-size: 24px;
          }
        }
        .projects-clean .intro {
          font-size: 16px;
          max-width: 500px;
          margin: 0 auto;
        }
        .projects-clean .intro p {
          margin-bottom: 0;
        }
        .projects-clean .item {
          text-align: center;
          padding-top: 50px;
          min-height: 425px;
        }
        .projects-clean .item .name {
          font-weight: 700;
          margin-top: 28px;
          margin-bottom: 8px;
          color: inherit;
        }
        .projects-clean .item .description {
          font-size: 15px;
          margin-top: 15px;
          margin-bottom: 0;
        }
        .projects-horizontal {
          color: #313437;
          background-color: #fff;
        }
        .projects-horizontal p {
          color: #7d8285;
        }
        .projects-horizontal h2 {
          font-weight: 700;
          margin-bottom: 40px;
          padding-top: 40px;
          color: inherit;
        }
        @media (max-width: 767px) {
          .projects-horizontal h2 {
            margin-bottom: 25px;
            padding-top: 25px;
            font-size: 24px;
          }
        }
        .projects-horizontal .intro {
          font-size: 16px;
          max-width: 500px;
          margin: 0 auto 10px;
        }
        .projects-horizontal .item {
          padding-top: 60px;
          min-height: 160px;
        }
        @media (max-width: 767px) {
          .projects-horizontal .item {
            padding-top: 40px;
            min-height: 160px;
          }
        }
        .projects-horizontal .item .name {
          font-size: 18px;
          font-weight: 700;
          margin-top: 10px;
          margin-bottom: 15px;
          color: inherit;
        }
        @media (max-width: 991px) {
          .projects-horizontal .item .name {
            margin-top: 22px;
          }
        }
        .projects-horizontal .item .description {
          font-size: 15px;
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}
