// import React, { useState, useEffect } from 'react';
// import { FaBookReader, FaAlignJustify, FaEdit, FaBimobject, FaCreditCard, FaCommentAlt } from 'react-icons/fa';
// import { MdDashboard, MdCategory, MdDelete } from 'react-icons/md';
// import { IoSettings, IoLogOut, IoSearch } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// import styles from './theloaibaiviet.module.scss';
// import { FaUser, FaUserTie, FaShoppingCart } from 'react-icons/fa';

// const TheLoaiChiTiet = () => {
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [showModalAdd, setShowModalAdd] = useState(false);
//   const [currentCategory, setCurrentCategory] = useState(null);
//   const [newCategory, setNewCategory] = useState({
//     id_theloai: '',
//     ten: '',
//     img: '',
//     hienthi: true,
//   });
//   const categoriesPerPage = 10;

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('http://localhost:8181/api/theloaibaiviet/list'); // Cập nhật URL API
//         const data = await response.json();
//         if (data.success) {
//           setCategories(data.data);
//         } else {
//           console.error('Failed to fetch categories');
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const indexOfLastCategory = currentPage * categoriesPerPage;
//   const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
//   const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
//   const totalPages = Math.ceil(categories.length / categoriesPerPage);

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
//   };

//   const handleShowMore = (category) => {
//     setCurrentCategory(category);
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setCurrentCategory(null);
//   };

//   const handleShowAddModal = () => {
//     setShowModalAdd(true);
//   };

//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     if (!newCategory.ten || !newCategory.img) {
//       alert('Tên và ảnh của thể loại là bắt buộc!');
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:8181/api/theloaibaiviet/add', { // Cập nhật URL API
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newCategory),
//       });
  
//       const data = await response.json();
  
//       if (data.status === 1) {
//         // Nếu thành công, cập nhật danh sách thể loại
//         setCategories([...categories, { ...newCategory, _id: Date.now() }]); // Giả sử bạn thêm ID tạm thời
//         // Reset trạng thái form
//         setNewCategory({
//           ten: '',
//           img: '',
//           hienthi: true,
//         });
//         setShowModalAdd(false);
//       } else {
//         console.error('Failed to add category:', data.message);
//         alert(data.message); 
//       }
//     } catch (error) {
//       console.error('Error adding category:', error);
//       alert('Đã xảy ra lỗi khi thêm thể loại sách.');
//     }
//   };
//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:8181/api/theloaibaiviet/delete/${id}`, {
//         method: 'DELETE',
//       });
  
//       const data = await response.json();
  
//       if (data.status === 1) {
//         setCategories(categories.filter(category => category._id !== id));
//       } else {
//         console.error('Xóa thể loại thất bại:', data.message);
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Lỗi khi xóa thể loại:', error);
//       alert('Đã xảy ra lỗi khi xóa thể loại.');
//     }
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
//               <i className={styles.bx}><FaUser /></i>
//               <span className={styles.text}>Admin</span>
//             </Link>
//           </li>
//           <li>
//             <Link to="/nguoidung">
//               <i className={styles.bx}><FaUser /></i>
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
//           <li >
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
//           <li className={styles.active}>
//           <Link to="/theloaibaiviet">
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
//                 <h3>Thể Loại Bài Viết</h3>
//                 <div className={styles.bgadd}>
//                   <a href="#" className={styles.add} onClick={handleShowAddModal}>+ Thêm</a>
//                 </div>
//                 <i className={styles.bx}></i>
//               </div>
//               <table>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Ảnh</th>
//                     <th>Tên</th>
//                     <th>Hiển Thị</th>
//                     <th>Hành Động</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentCategories.map(category => (
//                     <tr key={category._id}>
//                       <td>{category._id}</td>
//                       <td><img src={category.img} alt="" /></td>
//                       <td>{category.ten}</td>
//                       <td>{category.hienthi ? 'True' : 'False'}</td>
//                       <td>
//                         <button className={styles.delete} onClick={() => handleDelete(category._id)}><MdDelete /></button>
//                         <button className={styles.edit} onClick={() => handleShowMore(category)}><FaEdit /></button>
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

//       {showModal && currentCategory && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={handleCloseModal}>&times;</span>
//             <h2>Chi tiết Thể Loại</h2>
//             <p>ID: {currentCategory._id}</p>
//             <p>Tên: {currentCategory.ten}</p>
//             <p>Ảnh: <img src={currentCategory.img} alt="" style={{ maxWidth: '100px' }} /></p>
//             <p>Hiển Thị: {currentCategory.hienthi ? 'True' : 'False'}</p>
//           </div>
//         </div>
//       )}

//       {showModalAdd && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <span className={styles.close} onClick={() => setShowModalAdd(false)}>&times;</span>
//             <h2>Thêm Thể Loại Mới</h2>
//             <form onSubmit={handleAddCategory}>
//               <label htmlFor="ten">Tên:</label>
//               <input type="text" id="ten" value={newCategory.ten} onChange={(e) => setNewCategory({ ...newCategory, ten: e.target.value })} />
//               <label htmlFor="img">Ảnh:</label>
//               <input type="text" id="img" value={newCategory.img} onChange={(e) => setNewCategory({ ...newCategory, img: e.target.value })} />
//               <label htmlFor="hienthi">Hiển Thị:</label>
//               <select id="hienthi" value={newCategory.hienthi ? 'true' : 'false'} onChange={(e) => setNewCategory({ ...newCategory, hienthi: e.target.value === 'true' })}>
//                 <option value="true">True</option>
//                 <option value="false">False</option>
//               </select>
//               <button type="submit">Thêm</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TheLoaiChiTiet;
