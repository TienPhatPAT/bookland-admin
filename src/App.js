// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import NguoiDung from './components/nguoidung';
import TacGia from './components/TacGia';
import Dashboard from './components/Dashboard'
import Sach from './components/Sach'
import DonHang from './components/DonHang';
import Banner from './components/Banner';
import TheLoai from './components/TheLoai'
import BaiViet from "./components/BaiViet"
import BinhLuan from "./components/BìnhLuan"
// import ChiTietDonHang from './components/ChiTietDonHang';
// import TheLoaiBaiViet from "./components/TheLoaiBaiViet"
import Admin from './components/Admin';
import DangNhap from './components/DangNhap'
import Home from './components/Home'
import DanhGia from './components/DanhGia';
function App() {
  return (
    <Router>
      <div>
        
        <Routes>
        <Route path="/" element={<Navigate to="/da" />} />
          <Route path="/nguoidung" element={<NguoiDung />} />
          <Route path="/tacgia" element={<TacGia />} />
          <Route path="/da" element={<Dashboard />} />
          <Route path="/sach" element={<Sach />} />
          <Route path="/donhang" element={<DonHang />} />
          <Route path="/banner" element={<Banner />} />
          <Route path="/theloai" element={<TheLoai />} />
          <Route path="/baiviet" element={<BaiViet />} />
          <Route path="/binhluan" element={<BinhLuan />} />
          {/* <Route path="/chitietdonhang" element={<ChiTietDonHang />} /> */}
          {/* <Route path="/theloaibaiviet" element={<TheLoaiBaiViet />} /> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/dangnhap" element={<DangNhap />} />
          <Route path="/home" element={<Home />} />
          <Route path="/danhgia" element={<DanhGia />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
