import React, { useState, useEffect } from "react";
import { FaUserTie, FaEdit } from "react-icons/fa";
import { MdDashboard, MdDelete, MdCategory } from "react-icons/md";
import {
  FaBookReader,
  FaShoppingCart,
  FaAlignJustify,
  FaBimobject,
  FaCreditCard,
  FaCommentAlt,
} from "react-icons/fa";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./danhgia.module.scss";
import { FaEye } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";

const DanhGia = () => {
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRating, setNewRating] = useState({
    id_nguoidung: "",
    id_sach: "",
    diem: 1,
    txt: "",
    ngaytao: "",
    hien_thi: true,
  });
  const ratingsPerPage = 10;

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await fetch(`http://localhost:8181/api/danhgia/`);
      const result = await response.json();
      if (result.success) {
        setRatings(result.data);
      } else {
        console.error("Lỗi hiện thị đánh giá:", result.message);
      }
    } catch (error) {
      console.error("Lỗi hiện thị đánh giá:", error);
    }
  };

  const indexOfLastRating = currentPage * ratingsPerPage;
  const indexOfFirstRating = indexOfLastRating - ratingsPerPage;
  const currentRatings = ratings.slice(indexOfFirstRating, indexOfLastRating);

  const totalPages = Math.ceil(ratings.length / ratingsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewRating({
      id_nguoidung: "",
      id_sach: "",
      diem: 1,
      txt: "",
      ngaytao: "",
      hien_thi: true,
    });
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRating({ ...newRating, [name]: value });
  };

  const handleAddRating = (e) => {
    e.preventDefault();
    console.log("Adding rating:", newRating);
    // Thêm logic gọi API để thêm đánh giá mới tại đây
    setNewRating({
      id_nguoidung: "",
      id_sach: "",
      diem: 1,
      txt: "",
      ngaytao: "",
      hien_thi: true,
    });
    setShowAddModal(false);
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
          <li>
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
          <li className={styles.active}>
            <Link to="/danhgia">
              <i className={styles.bx}>
                <FaCommentAlt />
              </i>
              <span className={styles.text}>Đánh giá</span>
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
              <input type="search" placeholder="Tìm kiếm..." />
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
                <h3>Đánh Giá</h3>
                <i className={styles.bx}></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Người Dùng</th>
                    <th>Sách</th>
                    <th>Điểm</th>
                    <th>Nội Dung</th>
                    <th>Hiển Thị</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody id="rating-table-body">
                  {currentRatings.map((rating) => (
                    <tr key={rating._id}>
                      <td>{rating._id}</td>
                      <td>{rating?.id_nguoidung?.ten}</td>
                      <td>{rating?.id_sach?.ten}</td>
                      <td>{rating.diem}</td>
                      <td>{rating.txt}</td>
                      <td>{rating.hien_thi ? "True" : "False"}</td>
                      <td>
                        <button className={styles.delete}>
                          <MdDelete />
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
                  Tiếp Theo
                </button>
              </div>
            </div>
          </div>
        </main>
      </section>

      <button className={styles.addButton} onClick={handleOpenAddModal}>
        Thêm Đánh Giá
      </button>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Thêm Đánh Giá Mới</h3>
            <form onSubmit={handleAddRating}>
              <div className={styles.formGroup}>
                <label>Người Dùng</label>
                <input
                  type="text"
                  name="id_nguoidung"
                  value={newRating.id_nguoidung}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Sách</label>
                <input
                  type="text"
                  name="id_sach"
                  value={newRating.id_sach}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Điểm</label>
                <input
                  type="number"
                  name="diem"
                  value={newRating.diem}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nội Dung</label>
                <textarea
                  name="txt"
                  value={newRating.txt}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Ngày Tạo</label>
                <input
                  type="date"
                  name="ngaytao"
                  value={newRating.ngaytao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Hiển Thị</label>
                <select name="hien_thi" value={newRating.hien_thi} onChange={handleChange} required>
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <button type="submit">Thêm</button>
                <button type="button" onClick={handleCloseAddModal}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DanhGia;
