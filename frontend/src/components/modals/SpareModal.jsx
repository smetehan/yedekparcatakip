import React from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function CarModal({
  open,
  setOpen,
  info,
  setInfo,
  getPostSpareData,
  yedek,
  arac,
  getPutSpareData,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    if (info.id) {
      getPutSpareData(info);
    } else {
      getPostSpareData(info);
    }

    setInfo({});
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel variant="outlined" id="car-select-label">
              Araç Seç
            </InputLabel>
            <Select
              labelId="car-select-label"
              label="car"
              name="car_id"
              value={info?.car_id || ""}
              onChange={handleChange}
              required
            >
              {/* <MenuItem onClick={() => navigate("/yedekparca/car/")}>
                Add New Car
              </MenuItem> */}
              <hr />
              {arac?.map((item) => {
                const { brand, model, year, id } = item;
                return (
                  <MenuItem key={id} value={id}>
                    {brand} - {model} - {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel variant="outlined" id="customer-select-label">
              Kullanıcı
            </InputLabel>
            <Select
              labelId="user-select-label"
              label="User"
              id="user_id"
              name="user_id"
              value={info?.user_id || ""}
              onChange={handleChange}
              required
            >
              {/* <MenuItem onClick={() => navigate("/account/auth/user/")}>
                Add New Customer
              </MenuItem> */}
              <hr />
              {yedek?.map((item) => {
                const { user, user_id, id } = item;
                return (
                  <MenuItem key={id} value={user_id}>
                    {user}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <TextField
            label="Yedek Parça Adı"
            id="spare"
            name="spare"
            type="text"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.spare || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Yedek Parça No"
            id="spare_number"
            name="spare_number"
            type="number"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.spare_number || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Yedek Parça Resmi"
            id="image"
            name="image"
            type="url"
            variant="outlined"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.image || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Fiyat"
            id="price"
            type="number"
            variant="outlined"
            name="price"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.price || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Total"
            id="total"
            type="number"
            variant="outlined"
            name="total"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.total || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Raf"
            id="box"
            type="text"
            variant="outlined"
            name="box"
            InputProps={{ inputProps: { min: 0 } }}
            value={info?.box || ""}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" size="large">
            {info?.id ? "Yedek Parça Güncelle" : "Yedek Parça Ekle"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
