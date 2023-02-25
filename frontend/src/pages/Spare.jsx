import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/system";
import SpareModal from "../components/modals/SpareModal";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "../hooks/useAxios";

const Spare = () => {
  const { axiosWithToken } = useAxios();
  const [spare, setSpare] = useState([]);
  const [open, setOpen] = useState(false);
  const [arac, setArac] = useState([]);
  const [yedek, setYedek] = useState([]);
  const [info, setInfo] = useState({
    spare: "",
    spare_number: "",
    user_id: "",
    image: "",
    car_id: "",
    price: "",
  });

  const getSpareData = async () => {
    const data = await axiosWithToken(`yedekparca/spare/`);
    setSpare(data.data);
    setYedek(data.data);
  };
  const getCarData = async () => {
    const data = await axiosWithToken(`yedekparca/car/`);
    setArac(data.data);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const getPostSpareData = async (info) => {
    try {
      await axiosWithToken.post(`yedekparca/spare/`, info);

      toastSuccessNotify(`yedek parça başarılı şekilde eklendi`);
      getSpareData();
    } catch (error) {
      toastErrorNotify(`hatalı ekleme işlemi`);
    }
  };

  const getPutSpareData = async (info) => {
    setOpen(true);
    try {
      await axiosWithToken.put(`yedekparca/spare/${info.id}/`, info);
      toastSuccessNotify(`yedek parça başarılı şekilde eklendi`);
      getSpareData();
    } catch (error) {
      toastErrorNotify(`hatalı ekleme işlemi`);
    }
  };

  const deleteSpare = async (id) => {
    try {
      await axiosWithToken.delete(`yedekparca/spare/${id}/`);
      toastSuccessNotify(` yedek parça silindi`);
      getSpareData();
    } catch (error) {
      toastErrorNotify(`hatalı silme işlemi`);
    }
  };

  useEffect(() => {
    getSpareData();
    getCarData();
  }, []);

  return (
    <Box>
      <Button variant="contained" color="info" onClick={handleClick}>
        YEDEK PARÇA EKLE
      </Button>
      <SpareModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
        getPostSpareData={getPostSpareData}
        yedek={yedek}
        arac={arac}
        getPutSpareData={getPutSpareData}
      />
      <Grid
        container
        sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
      >
        {yedek?.map((item) => {
          const { car, spare, image, id, price, spare_number, box, total } =
            item;
          return (
            <>
              <Card
                sx={{
                  width: 275,
                  height: 650,
                }}
                key={id}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{
                      p: 1,
                      objectFit: "contain",
                      height: "275px",
                    }}
                    image={image}
                    alt="car"
                  />
                  <CardContent sx={{ height: "335px" }}>
                    <Typography gutterBottom variant="h7" component="div">
                      MARKA : <br />
                      {car.toUpperCase()}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      YEDEK PARÇA ADI : <br />
                      {spare.toUpperCase()}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      YEDEK PARÇA NO : <br />
                      {spare_number}
                    </Typography>

                    <Typography gutterBottom variant="h7" component="div">
                      FİYAT : <br />
                      {price}₺
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      STOK MİKTARI : <br />
                      {total}
                    </Typography>
                    <Typography gutterBottom variant="h7" component="div">
                      BULUNDUĞU RAF : <br />
                      {box}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Box>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteSpare(id)}
                    >
                      SİL
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setOpen(true);
                        setInfo(item);
                      }}
                    >
                      GÜNCELLE
                    </Button>
                  </Box>
                </Box>
              </Card>
            </>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Spare;
