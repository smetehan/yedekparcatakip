import React from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

export default function CarModal({
  open,
  setOpen,
  info,
  setInfo,
  getPostCarData,
}) {
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    getPostCarData(info);
    setInfo({});
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setInfo({});
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={flexColumn} component={"form"} onSubmit={handleSubmit}>
          <TextField
            label="Araç Adı"
            name="brand"
            id="brand"
            type="text"
            variant="outlined"
            value={info?.brand || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Araç Modeli"
            name="model"
            id="model"
            type="text"
            variant="outlined"
            value={info?.model || ""}
            onChange={handleChange}
            required
          />
          <TextField
            label="Üretim Yılı"
            name="year"
            id="year"
            type="number"
            variant="outlined"
            value={info?.year || ""}
            onChange={handleChange}
            required
          />

          <TextField
            label="Araç Resmi"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={info?.image || ""}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            Araç Kaydet
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
