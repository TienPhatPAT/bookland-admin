import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaUserTie,
  FaBookReader,
  FaShoppingCart,
  FaBimobject,
  FaCreditCard,
  FaCommentAlt,
  FaEdit,
} from "react-icons/fa";
import { MdDashboard, MdCategory, MdDelete } from "react-icons/md";
import { IoSettings, IoLogOut, IoSearch } from "react-icons/io5";
import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./banner.module.scss";
import { FaEye } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [newBanner, setNewBanner] = useState({
    id_banner: "",
    url: "",
    img: "",
    luotclick: 0,
    ngaybatdau: "",
    ngayketthuc: "",
    uutien: 0,
    hien_thi: true,
  });
  const bannersPerPage = 10;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch("https://bookland-api.vercel.app/api/banner/");
        const data = await response.json();
        setBanners(data?.data);
        console.log(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ banner:", error);
      }
    };
    fetchBanners();
  }, []);

  const indexOfLastBanner = currentPage * bannersPerPage;
  const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  const totalPages = Math.ceil(banners.length / bannersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleShowMore = (banner) => {
    setCurrentBanner(banner);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentBanner(null);
  };

  const handleShowAddModal = () => {
    setShowModalAdd(true);
  };
  const handleAddBanner = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://bookland-api.vercel.app/api/banner/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBanner),
      });
      const data = await response.json();
      if (data.status === 1) {
        alert(data.message);
        setBanners([...banners, newBanner]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
    }
    setNewBanner({
      id_banner: "",
      url: "",
      img: "",
      luotclick: 0,
      ngaybatdau: "",
      ngayketthuc: "",
      uutien: 0,
      hien_thi: true,
    });
    setShowModalAdd(false);
  };

  const shortenUrl = (url) => {
    return url.length > 10 ? `${url.substring(0, 10)}...` : url;
  };

  const handleDeleteBanner = async (id) => {
    try {
      const response = await fetch(`https://bookland-api.vercel.app/api/banner/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.message) {
        alert(data.message);
        // Cập nhật danh sách banner sau khi xóa
        setBanners(banners.filter((banner) => banner._id !== id));
      }
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
    }
  };

  return (
    <>
      <section className={styles.sidebar}>
        <a href="#" className={styles.brand}>
          <i className={styles.bx}></i>
          <span className={styles.text}>AdminHub</span>
        </a>
        <ul className={`${styles.menu} ${styles.top}`}>
          <li>
            <Link to="/da">
              <i className={styles.bx}>
                <MdDashboard />
              </i>
              <span className={styles.text}>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <i className={styles.bx}>
                <FaUserTie />
              </i>
              <span className={styles.text}>Admin</span>
            </Link>
          </li>
          <li>
            <Link to="/nguoidung">
              <i className={styles.bx}>
                <FaUsers />
              </i>
              <span className={styles.text}>Người dùng</span>
            </Link>
          </li>
          <li>
            <Link to="/tacgia">
              <i className={styles.bx}>
                <PiUserListFill />
              </i>
              <span className={styles.text}>Tác giả</span>
            </Link>
          </li>
          <li>
            <Link to="/sach">
              <i className={styles.bx}>
                <FaBookReader />
              </i>
              <span className={styles.text}>Sách</span>
            </Link>
          </li>
          <li>
            <Link to="/theloai">
              <i className={styles.bx}>
                <MdCategory />
              </i>
              <span className={styles.text}>Thể loại</span>
            </Link>
          </li>
          <li>
            <Link to="/donhang">
              <i className={styles.bx}>
                <FaShoppingCart />
              </i>
              <span className={styles.text}>Đơn hàng</span>
            </Link>
          </li>

          <li className={styles.active}>
            <Link to="/banner">
              <i className={styles.bx}>
                <FaBimobject />
              </i>
              <span className={styles.text}>Banner</span>
            </Link>
          </li>
          <li>
            <Link to="/baiviet">
              <i className={styles.bx}>
                <FaCreditCard />
              </i>
              <span className={styles.text}>Bài viết</span>
            </Link>
          </li>
          <li>
            <Link to="/binhluan">
              <i className={styles.bx}>
                <FaCommentAlt />
              </i>
              <span className={styles.text}>Bình luận</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.menu}>
          <li>
            <a href="/dangnhap" className={styles.logout}>
              <i className={styles.bx}>
                <IoLogOut />
              </i>
              <span className={styles.text}>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </section>

      <section className={styles.content}>
        <nav>
          <i className={styles.bx}>
            <FaAlignJustify />
          </i>
          <form action="#">
            <div className={styles.forminput}>
              <input type="search" placeholder="Search..." />
              <button type="submit" className={styles.searchbtn}>
                <i className={styles.bx}>
                  <IoSearch />
                </i>
              </button>
            </div>
          </form>
          <a href="#" className={styles.profile}>
            <img src="" alt="" />
          </a>
        </nav>
        <main>
          <div className={styles.tabledata}>
            <div className={styles.order}>
              <div className={styles.head}>
                <h3>Banner</h3>
                <div className={styles.bgadd}>
                  <a href="#" className={styles.add} onClick={handleShowAddModal}>
                    + Thêm
                  </a>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Ảnh</th>
                    <th>URL</th>
                    <th>Lượt Click</th>
                    <th>Ngày Bắt Đầu</th>
                    <th>Ngày Kết Thúc</th>
                    <th>Ưu Tiên</th>
                    <th>Hiển Thị</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody id="banner-table-body">
                  {currentBanners.map((banner) => (
                    <tr key={banner._id}>
                      <td className={styles.deid}>{banner._id}</td>
                      <td>
                        <img src={banner.img} alt="" />
                      </td>
                      <td>{shortenUrl(banner.url)}</td>
                      <td>{banner.luotclick}</td>
                      <td className={styles.ngay}>{banner.ngaybatdau}</td>
                      <td className={styles.ngay}>{banner.ngayketthuc}</td>
                      <td>{banner.uutien}</td>
                      <td>{banner.hien_thi ? "True" : "False"}</td>
                      <td>
                        <button
                          className={styles.delete}
                          onClick={() => handleDeleteBanner(banner._id)}
                        >
                          <MdDelete />
                        </button>
                        <button className={styles.edit} onClick={() => handleShowMore(banner)}>
                          <FaEdit />
                        </button>
                        <button className={styles.details}>
                          <FaEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className={styles.pagination}>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Quay lại
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>

      {showModal && currentBanner && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Chi tiết Banner</h2>
            <p>Id: {currentBanner.id_banner}</p>
            <p>URL: {currentBanner.url}</p>
            <p>Lượt Click: {currentBanner.luotclick}</p>
            <p>Ngày Bắt Đầu: {currentBanner.ngaybatdau}</p>
            <p>Ngày Kết Thúc: {currentBanner.ngayketthuc}</p>
            <p>Ưu Tiên: {currentBanner.uutien}</p>
            <p>Hiển Thị: {currentBanner.hien_thi ? "True" : "False"}</p>
          </div>
        </div>
      )}

      {showModalAdd && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowModalAdd(false)}>
              &times;
            </span>
            <h2>Thêm Banner Mới</h2>
            <form onSubmit={handleAddBanner}>
              <label htmlFor="url">URL:</label>
              <input
                type="text"
                id="url"
                value={newBanner.url}
                onChange={(e) => setNewBanner({ ...newBanner, url: e.target.value })}
                required
              />

              <label htmlFor="img">Ảnh:</label>
              <input
                type="text"
                id="img"
                value={newBanner.img}
                onChange={(e) => setNewBanner({ ...newBanner, img: e.target.files[0] })}
                required
              />

              <label htmlFor="luotclick">Lượt Click:</label>
              <input
                type="number"
                id="luotclick"
                value={newBanner.luotclick}
                onChange={(e) => setNewBanner({ ...newBanner, luotclick: +e.target.value })}
                required
              />

              <label htmlFor="ngaybatdau">Ngày Bắt Đầu:</label>
              <input
                type="date"
                id="ngaybatdau"
                value={newBanner.ngaybatdau}
                onChange={(e) => setNewBanner({ ...newBanner, ngaybatdau: e.target.value })}
              />

              <label htmlFor="ngayketthuc">Ngày Kết Thúc:</label>
              <input
                type="date"
                id="ngayketthuc"
                value={newBanner.ngayketthuc}
                onChange={(e) => setNewBanner({ ...newBanner, ngayketthuc: e.target.value })}
              />

              <label className={styles.uutien} htmlFor="uutien">
                Ưu Tiên:
              </label>
              <input
                type="number"
                id="uutien"
                value={newBanner.uutien}
                onChange={(e) => setNewBanner({ ...newBanner, uutien: +e.target.value })}
                required
              />

              <label htmlFor="hien_thi">Hiển Thị:</label>
              <select
                id="hien_thi"
                value={newBanner.hien_thi ? "true" : "false"}
                onChange={(e) =>
                  setNewBanner({ ...newBanner, hien_thi: e.target.value === "true" })
                }
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>

              <button type="submit">Thêm</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
