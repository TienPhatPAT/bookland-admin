import React, { useState, useEffect } from "react";
import { FaUser, FaUserTie, FaBookReader, FaShoppingCart, FaAlignJustify } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoLogOut, IoSearch } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { Link } from "react-router-dom";
import styles from "./da.module.scss";
import { MdCategory } from "react-icons/md";
import { FaBimobject } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookCount, setBookCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [bookRes, userRes] = await Promise.all([
          fetch("https://bookland-api.vercel.app/api/sach/"),
          fetch("https://bookland-api.vercel.app/api/nguoidung/"),
        ]);

        const bookData = await bookRes.json();
        const userData = await userRes.json();

        console.log("Books fetched:", bookData);
        console.log("Users fetched:", userData);

        setBookCount(bookData?.data.length);
        setUserCount(userData?.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <>
      <section className={styles.sidebar}>
        <a href="#" className={styles.brand}>
          <i className={styles.bx}></i>
          <span className={styles.text}>AdminHub</span>
        </a>
        <ul className={`${styles.menu} ${styles.top}`}>
          <li className={styles.active}>
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
        </ul>
        <ul className={styles.menu}>
          <li>
            <a href="#" className={styles.logout}>
              <i className={styles.bx}>
                <IoLogOut />
              </i>
              <span className={styles.text}>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </section>
      <section className={`${styles.content} ${!sidebarOpen ? styles.hide : ""}`}>
        <nav>
          <i className={`${styles.bx} ${styles.menuIcon}`} onClick={toggleSidebar}>
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
          <div className={styles.headtitle}>
            <div className={styles.left}>
              <h1>Dashboard</h1>
            </div>
            <ul className={styles.boxinfo}>
              <li>
                <i className={styles.bx}>
                  <FaBook />
                </i>
                <span className={styles.text}>
                  <h3>{bookCount}</h3>
                  <p>Sách</p>
                </span>
              </li>
              <li>
                <i className={styles.bx}>
                  <FaUser />
                </i>
                <span className={styles.text}>
                  <h3>{userCount}</h3>
                  <p>Người Dùng</p>
                </span>
              </li>
              <li>
                <i className={styles.bx}>
                  <GiMoneyStack />
                </i>
                <span className={styles.text}>
                  <h3>$2543</h3>
                  <p>Doanh Thu</p>
                </span>
              </li>
            </ul>
          </div>
        </main>
      </section>
    </>
  );
};

export default Dashboard;
