import Link from "next/link";
import { Gql } from "../modules";
import React from "react";
export default function Nav() {
  return (
    <div>
      <nav className="navbar navbar-light navbar-expand-md">
        <div className="container">
          <a className="navbar-brand text-uppercase text-danger" href="#">
            <img
              src="/img/73188838_2367988273517916_6391647450892861440_n.jpg"
              style={{ height: "40px", width: "40px" }}
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
      <style>
        {`
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
        }`}
      </style>
    </div>
  );
}
