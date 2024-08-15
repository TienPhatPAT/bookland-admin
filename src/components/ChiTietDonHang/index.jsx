// import React, { useState, useEffect } from 'react';
// import { FaEdit, FaUserTie, FaBookReader, FaShoppingCart, FaBimobject, FaCreditCard, FaCommentAlt, FaAlignJustify } from 'react-icons/fa';
// import { MdDelete, MdCategory, MdDashboard } from 'react-icons/md'; // Nhập thêm MdDashboard
// import { IoLogOut, IoSearch } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// import styles from './chitietdonhang.module.scss';

// const ChiTietDonHang = () => {
//   const [details, setDetails] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [currentDetail, setCurrentDetail] = useState(null);
//   const [newDetail, setNewDetail] = useState({
//     id_donhang: '',
//     id_sach: '',
//     ten: '',
//     gia: '',
//     soluong: ''
//   });
//   const detailsPerPage = 10;

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await fetch(process.env.REACT_APP_URL + 'chitietdonhang');
//         if (!response.ok) {
//           throw new Error('Lỗi khi lấy dữ liệu chi tiết đơn hàng');
//         }
//         const data = await response.json();
//         setDetails(data.data);
//       } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu chi tiết đơn hàng:', error);
//       }
//     };
  
//     fetchDetails();
//   }, []);
  

//   const indexOfLastDetail = currentPage * detailsPerPage;
//   const indexOfFirstDetail = indexOfLastDetail - detailsPerPage;
//   const currentDetails = details.slice(indexOfFirstDetail, indexOfLastDetail);

//   const totalPages = Math.ceil(details.length / detailsPerPage);

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
//   };

//   const handleShowMore = (detail) => {
//     setCurrentDetail(detail);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentDetail(null);
//   };

//   const handleOpenAddModal = () => {
//     setShowAddModal(true);
//   };

//   const handleCloseAddModal = () => {
//     setShowAddModal(false);
//     setNewDetail({
//       id_donhang: '',
//       id_sach: '',
//       ten: '',
//       gia: '',
//       soluong: ''
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewDetail({ ...newDetail, [name]: value });
//   };



//   return (
//     <>
//       <section className={styles.sidebar}>
//         <a href="#" className={styles.brand}>
//           <i className={styles.bx}></i>
//           <span className={styles.text}>AdminHub</span>
//         </a>
//         <ul className={`${styles.menu} ${styles.top}`}>
//           <li>
//             <Link to="/da">
//               <i className={styles.bx}><MdDashboard /></i>
//               <span className={styles.text}>Dashboard</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/admin">
//               <i className={styles.bx}><FaUserTie /></i>
//               <span className={styles.text}>Admin</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/nguoidung">
//               <i className={styles.bx}><FaUserTie /></i>
//               <span className={styles.text}>Người Dùng</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/tacgia">
//               <i className={styles.bx}><FaUserTie /></i>
//               <span className={styles.text}>Tác Giả</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/sach">
//               <i className={styles.bx}><FaBookReader /></i>
//               <span className={styles.text}>Sách</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/theloai">
//               <i className={styles.bx}><MdCategory /></i>
//               <span className={styles.text}>Thể Loại</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/donhang">
//               <i className={styles.bx}><FaShoppingCart /></i>
//               <span className={styles.text}>Đơn Hàng</span>
//             </Link>
//           </li>
//           <li className={styles.active}>
//             <Link to="/donhang">
//               <i className={styles.bx}><FaCommentAlt /></i>
//               <span className={styles.text}>Chi Tiết Đơn Hàng</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/banner">
//               <i className={styles.bx}><FaBimobject /></i>
//               <span className={styles.text}>Banner</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/baiviet">
//               <i className={styles.bx}><FaCreditCard /></i>
//               <span className={styles.text}>Bài Viết</span>
//             </Link>
//           </li>
//           <li >
//             <Link to="/theloaibaiviet">
//               <i className={styles.bx}><MdCategory /></i>
//               <span className={styles.text}>Thể Loại Bài Viết</span>
//             </Link>
//           </li>
       
//           <li>
//             <Link to="/binhluan">
//               <i className={styles.bx}><FaCommentAlt /></i>
//               <span className={styles.text}>Bình Luận</span>
//             </Link>
//           </li>
         
//         </ul>
//         <ul className={styles.menu}>
//           <li>
//             <a href="#" className={styles.logout}>
//               <i className={styles.bx}><IoLogOut /></i>
//               <span className={styles.text}>Logout</span>
//             </a>
//           </li>
//         </ul>
//       </section>

//       <section className={styles.content}>
//         <nav>
//           <i className={styles.bx}><FaAlignJustify /></i>
//           <form action="#">
//             <div className={styles.forminput}>
//               <input type="search" placeholder="Tìm kiếm..." />
//               <button type="submit" className={styles.searchbtn}><i className={styles.bx}><IoSearch /></i></button>
//             </div>
//           </form>
//           <a href="#" className={styles.profile}>
//             <img src="" alt="" />
//           </a>
//         </nav>
//         <main>
//           <div className={styles.tabledata}>
//             <div className={styles.order}>
//               <div className={styles.head}>
//                 <h3>Chi Tiết Đơn Hàng</h3>
//                 <div className={styles.bgadd}>
//                   <a href="#" className={styles.add} onClick={handleOpenAddModal}>+ Thêm</a>
//                 </div>
//                 <i className={styles.bx}></i>
//               </div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Id </th>
//                     <th>Id Đơn Hàng</th>
//                     <th>Id Sách</th>
//                     <th>Tên</th>
//                     <th>Giá</th>
//                     <th>Số Lượng</th>
//                     <th>Hành Động</th>
//                   </tr>
//                 </thead>
//                 <tbody id="detail-table-body">
//                   {currentDetails.map(detail => (
//                     <tr key={detail.id_chitietdonhang}>
//                       <td>{detail.id_chitietdonhang}</td>
//                       <td>{detail.id_donhang}</td>
//                       <td>{detail.id_sach}</td>
//                       <td>{detail.ten}</td>
//                       <td>{detail.gia}</td>
//                       <td>{detail.soluong}</td>
//                       <td>
//                         <button className={styles.delete}><MdDelete /></button>
//                         <button className={styles.edit} onClick={() => handleShowMore(detail)}><FaEdit /></button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               <div className={styles.pagination}>
//                 <button onClick={handlePreviousPage} disabled={currentPage === 1}>Quay lại</button>
//                 <button onClick={handleNextPage} disabled={currentPage === totalPages}>Tiếp theo</button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </section>

//       {showModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={handleCloseModal}>x</span>
//             {currentDetail && (
//               <>
//                 <h2>Chi Tiết Đơn Hàng</h2>
//                 <div className={styles.detailDetails}>
//                   <p>Id Đơn Hàng: {currentDetail.id_donhang}</p>
//                   <p>Id Sách: {currentDetail.id_sach}</p>
//                   <p>Tên: {currentDetail.ten}</p>
//                   <p>Giá: {currentDetail.gia}</p>
//                   <p>Số Lượng: {currentDetail.soluong}</p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       {showAddModal && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={handleCloseAddModal}>x</span>
//             <h2>Thêm Chi Tiết Đơn Hàng</h2>
//             <form >
//               <label>
//                 Id Đơn Hàng:
//                 <input type="text" name="id_donhang" value={newDetail.id_donhang} onChange={handleChange} required />
//               </label>
//               <label>
//                 Id Sách:
//                 <input type="text" name="id_sach" value={newDetail.id_sach} onChange={handleChange} required />
//               </label>
//               <label>
//                 Tên:
//                 <input type="text" name="ten" value={newDetail.ten} onChange={handleChange} required />
//               </label>
//               <label>
//                 Giá:
//                 <input type="number" name="gia" value={newDetail.gia} onChange={handleChange} required />
//               </label>
//               <label>
//                 Số Lượng:
//                 <input type="number" name="soluong" value={newDetail.soluong} onChange={handleChange} required />
//               </label>
//               <button type="submit">Thêm</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ChiTietDonHang;
