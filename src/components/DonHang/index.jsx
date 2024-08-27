import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaUserTie,
  FaBookReader,
  FaShoppingCart,
  FaBimobject,
  FaCreditCard,
  FaCommentAlt,
} from "react-icons/fa";
import { MdDashboard, MdCategory, MdDelete } from "react-icons/md";
import { IoSettings, IoLogOut, IoSearch } from "react-icons/io5";
import { FaEdit, FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./donhang.module.scss";
import { FaEye } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";

const DonHang = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const ordersPerPage = 10;
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState("completed");
  const [idOrder, setIdOrder] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://bookland-api.vercel.app/api/order/");
        if (!response.ok) {
          throw new Error("Lỗi khi lấy danh sách đơn hàng");
        }
        const data = await response.json();
        setOrders(data?.data?.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error);
      }
    };

    fetchOrders();
  }, []);

  // Logic để lấy đơn hàng hiện tại trên trang
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleShowMore = (order) => {
    setCurrentOrder(order);
    setShowModal(true);
    setIdOrder(order?._id);
    setStatus(order?.status);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentOrder(null);
  };

  const handleUpdateOrder = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://bookland-api.vercel.app/api/order/${idOrder}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });

      const data = await response.json();
      if (data.success) {
        handleCloseModal();
        alert("Cập nhật sách thành công");
      } else {
        alert(data.message || "Cập nhật sách không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sách:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
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
          <li className={styles.active}>
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
                <h3> Đơn Hàng</h3>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Người dùng</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Người Nhận</th>
                    <th>Sách</th>
                    <th>Số lượng</th>
                    <th>Phương thức thanh toán</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody id="order-table-body">
                  {currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td className={styles.deid}>{index + 1}</td>
                      <td className={styles.deid}>{order?.user?.ten}</td>
                      <td className={styles.deid}> {order.address}</td>
                      <td>{order.user?.phone}</td>
                      <td>{order.user?.ten}</td>
                      <td>{order?.items[0].book.id}</td>
                      <td>{order?._id_chitietdonhang?.soluong}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.status}</td>
                      <td>
                        <button className={styles.details} onClick={() => handleShowMore(order)}>
                          <FaEdit />
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

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContentt}>
            <span className={styles.close} onClick={handleCloseModal}>
              x
            </span>
            <form onSubmit={handleUpdateOrder}>
              <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <label>Trạng thái:</label>
                  <select
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => {
                      console.log(e.target.value);

                      setStatus(e.target.value);
                    }}
                  >
                    <option value="completed">Đã thanh toán</option>
                    <option value="pending">Đang xử lý</option>
                    <option value="cancelled">Đã Hũy</option>
                  </select>
                </div>
              </div>
              <button type="submit">Cập nhật</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DonHang;
