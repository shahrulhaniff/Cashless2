--
-- Database: cashless
--
DROP DATABASE id4965178_raxsoft;
CREATE DATABASE id4965178_raxsoft;
USE id4965178_raxsoft;
-- --------------------------------------------------------

--
-- Table structure for table user_account
--
CREATE TABLE kod_jenispengguna(
  kod_pengguna varchar(12) NOT NULL,
  jenis_pengguna varchar(10) NOT NULL,
  jabatan varchar(40) NULL,
  PRIMARY KEY (kod_pengguna)
);

CREATE TABLE maklumat_pengguna (
  ic_pengguna varchar(12) NOT NULL,
  nama varchar(100) NOT NULL,
  email varchar(40) NOT NULL,
  no_telefon varchar(20),
  PRIMARY KEY (ic_pengguna)
);

CREATE TABLE akaun_pengguna (
  ic_pengguna varchar(12) NOT NULL,
  kod_pengguna varchar(10) NOT NULL,
  pwd varchar(40) NOT NULL,
  status_aktif varchar(5),
  PRIMARY KEY (ic_pengguna,kod_pengguna),
  FOREIGN KEY (kod_pengguna) REFERENCES kod_jenispengguna (kod_pengguna),
  FOREIGN KEY (ic_pengguna) REFERENCES maklumat_pengguna (ic_pengguna)
);

--
-- Dumping data for table user_account
--

INSERT INTO kod_jenispengguna (kod_pengguna, jenis_pengguna, jabatan) VALUES
('1', 'user', NULL),
('2', 'admin', 'Bendahari'),
('3', 'sub-admin', 'JPP');

INSERT INTO maklumat_pengguna (ic_pengguna, nama, email,no_telefon) VALUES
('941013115435', 'Shahrul Haniff', 'shahrul@gmail.com', '0109668468'),
('941013115436', 'Bendahari UniSZA', 'bendahari@unisza.com', '0109668468');

INSERT INTO akaun_pengguna (ic_pengguna,kod_pengguna,pwd,status_aktif) VALUES
('941013115435', '1', '202cb962ac59075b964b07152d234b70','yes'),
('941013115435', '3', '202cb962ac59075b964b07152d234b70','no'),
('941013115436', '2', '202cb962ac59075b964b07152d234b70','yes');

-- --------------------------------------------------------

--
-- Table structure for table transaksi
--

CREATE TABLE kod_jenistransaksi (
  id_jenistransaksi varchar(12) NOT NULL,
  jenistransaksi varchar(100) NOT NULL,
  jabatan varchar(40) NOT NULL,
  PRIMARY KEY (id_jenistransaksi)
  );

CREATE TABLE kod_transaksi (
  id_kodtransaksi int(10) NOT NULL AUTO_INCREMENT,
  kod_pengguna varchar(10) NOT NULL,
  no_sb varchar(100) NOT NULL,
  description varchar(300) NOT NULL,
  tarikhbuka date NOT NULL,
  tarikhtutup date NOT NULL,
  jam time NOT NULL,
  harga float(10,2) NOT NULL,
  id_jenistransaksi varchar(12) NOT NULL,
  kelas varchar(10) NOT NULL,
  keyin_by varchar(100) NOT NULL,
  tarikh_keyin datetime NOT NULL,
  edit_by varchar(100) NULL,
  tarikh_edit datetime NULL,
  PRIMARY KEY (id_kodtransaksi),
  FOREIGN KEY (kod_pengguna) REFERENCES kod_jenispengguna (kod_pengguna),
  FOREIGN KEY (id_jenistransaksi) REFERENCES kod_jenistransaksi (id_jenistransaksi)
);

CREATE TABLE transaksi (
  id_transaksi int(10) NOT NULL AUTO_INCREMENT,
  ic_pengguna varchar(12) NOT NULL,
  id_kodtransaksi int(10) NOT NULL,
  id_jenistransaksi varchar(10) NOT NULL,
  tarikh datetime NOT NULL,
  jumlah float(10,2) NOT NULL,
  daripada varchar(12) NOT NULL,
  kepada varchar(12) NOT NULL,
  statustransaction varchar(50) NOT NULL,
  status_dokumen varchar(50) NOT NULL,
  doc_acceptby varchar(50) NULL,
  doc_giveby varchar(50) NULL,
  PRIMARY KEY (id_transaksi),
  FOREIGN KEY (ic_pengguna) REFERENCES akaun_pengguna (ic_pengguna),
  FOREIGN KEY (id_kodtransaksi) REFERENCES kod_transaksi (id_kodtransaksi),
  FOREIGN KEY (id_jenistransaksi) REFERENCES kod_jenistransaksi (id_jenistransaksi)
);

--
-- Dumping data for table transaksi
--

-- INSERT INTO transaksi (jenis_transaksi, tarikh, jumlah, ic_pengguna, daripada, kepada) VALUES ('a2u', '2019-03-21 06:12:16', 17000.55, '941013115435', '941013115436', '941013115435');
INSERT INTO `kod_jenistransaksi` (`id_jenistransaksi`, `jenistransaksi`, `jabatan`) VALUES
('DRM', 'Derma', 'Masjid'),
('SB', 'Sebut Harga', 'JPP'),
('YR', 'Yuran', 'ASRAMA');

INSERT INTO `kod_transaksi` (`id_kodtransaksi`, `kod_pengguna`, `no_sb`, `description`, `tarikhbuka`, `tarikhtutup`, `jam`, `harga`, `id_jenistransaksi`, `kelas`, `keyin_by`, `tarikh_keyin`, `edit_by`, `tarikh_edit`) VALUES
(1, '3', 'IDSB001', 'Contoh butiran sebut harga', '2019-03-01', '2019-03-30', '00:00:00', 17000.39, 'SB', '1', 'IC Pegawai keyin', '2019-03-06 11:27:27', NULL, NULL),
(2, '3', 'PEMB(E)SH/66/2018', 'CADANGAN KERJA-KERJA PEMASANGAN FEEDER PILLAR UTAMA TERMASUK KABEL 3 FASA KE KANDANG KAMBING SERTA KERJA-KERJA BERKAITAN DI LADANG PASIR AKAR UNISZA BESUT, TEENGGANU DARUL IMAN', '2019-03-01', '2019-03-31', '12:00:00', 30.00, 'SB', '5', 'PENYELARAS', '2019-03-01 13:00:00', NULL, NULL);


INSERT INTO `transaksi` (`id_transaksi`, `ic_pengguna`, `id_kodtransaksi`, `id_jenistransaksi`, `tarikh`, `jumlah`, `daripada`, `kepada`, `statustransaction`, `status_dokumen`, `doc_acceptby`, `doc_giveby`) VALUES
(1, '941013115436', 2, 'SB', '2019-03-21 06:12:16', 30.00, '941013115436', '941013115435', 'KOD MIGS', 'YES', '941013115435', '941013115436');

