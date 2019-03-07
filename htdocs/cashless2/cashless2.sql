--
-- Database: cashless
--
DROP DATABASE cashless;
CREATE DATABASE cashless;
USE cashless;
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

CREATE TABLE akaun_pengguna (
  ic_pengguna varchar(12) NOT NULL,
  kod_pengguna varchar(10) NOT NULL,
  nama varchar(100) NOT NULL,
  email varchar(40) NOT NULL,
  pwd varchar(40) NOT NULL,
  PRIMARY KEY (ic_pengguna),
  FOREIGN KEY (kod_pengguna) REFERENCES kod_jenispengguna (kod_pengguna)
);

--
-- Dumping data for table user_account
--

INSERT INTO kod_jenispengguna (kod_pengguna, jenis_pengguna, jabatan) VALUES
('1', 'user', NULL),
('2', 'admin', 'Bendahari'),
('3', 'sub-admin', 'Masjid');

INSERT INTO akaun_pengguna (ic_pengguna,kod_pengguna, nama, email, pwd) VALUES
('941013115435', '1', 'Shahrul Haniff', 'shahrul@gmail.com', '123'),
('941013115436', '2', 'Bendahari UniSZA', 'bendahari@unisza.com', '123');

-- --------------------------------------------------------

--
-- Table structure for table transaksi
--

CREATE TABLE transaksi (
  jenis_transaksi varchar(10) NOT NULL,
  tarikh datetime NOT NULL,
  jumlah float(10,2) NOT NULL,
  ic_pengguna varchar(12) NOT NULL,
  daripada varchar(12) NOT NULL,
  kepada varchar(12) NOT NULL,
  PRIMARY KEY (ic_pengguna,daripada,kepada,tarikh),
  FOREIGN KEY (ic_pengguna) REFERENCES akaun_pengguna (ic_pengguna),
  FOREIGN KEY (daripada) REFERENCES akaun_pengguna (ic_pengguna),
  FOREIGN KEY (kepada) REFERENCES akaun_pengguna (ic_pengguna)
);

--
-- Dumping data for table transaksi
--

INSERT INTO transaksi (jenis_transaksi, tarikh, jumlah, ic_pengguna, daripada, kepada) VALUES ('a2u', '2019-03-21 06:12:16', 17000.55, '941013115435', '941013115436', '941013115435');
