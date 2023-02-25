import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Grid } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/system";
import CarModal from "../components/modals/CarModal";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "../hooks/useAxios";
import AracCard from "../components/AracCard";
const Car = () => {
  const { axiosWithToken } = useAxios();
  const [car, setCar] = useState([]);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    brand: "",
    model: "",
    year: "",
    image: "",
  });
  const [swich, setSwich] = useState(false);
  const [page, setPage] = useState(0);
  const [yedek, setYedek] = useState([]);
  const [search, setSearch] = useState("");
  const getCarData = async () => {
    const data = await axiosWithToken(`yedekparca/car/`);
    setCar(data.data);
  };
  const handleClick = () => {
    setOpen(true);
  };
  const getPostCarData = async (info) => {
    try {
      await axiosWithToken.post(`yedekparca/car/`, info);
      toastSuccessNotify(`araç başarılı şekilde eklendi`);
      getCarData();
    } catch (error) {
      toastErrorNotify(`hatalı ekleme işlemi`);
    }
  };
  const deleteCar = async (id) => {
    try {
      await axiosWithToken.delete(`yedekparca/car/${id}/`);
      toastSuccessNotify(` araç silindi`);
      getCarData();
    } catch (error) {
      toastErrorNotify(`hatalı silme işlemi`);
    }
  };

  const getSpareData = async () => {
    const data = await axiosWithToken(`yedekparca/spare/`);

    setYedek(data.data);
  };

  useEffect(() => {
    getCarData();
    getSpareData();
  }, []);

  return (
    <>
      {!swich && (
        <Box>
          <Button variant="contained" color="info" onClick={handleClick}>
            ARAÇ EKLE
          </Button>
          <CarModal
            open={open}
            setOpen={setOpen}
            info={info}
            setInfo={setInfo}
            getPostCarData={getPostCarData}
          />
          <Grid
            container
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
          >
            {car?.map((item) => {
              const { brand, model, year, image, id } = item;
              return (
                <Card
                  sx={{
                    width: 245,
                    height: 450,
                  }}
                  key={id}
                >
                  <CardActionArea
                    onClick={() => {
                      setPage(id);
                      setSwich(true);
                    }}
                  >
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
                    <CardContent>
                      <Typography gutterBottom variant="h7" component="div">
                        MARKA : {brand}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                        MODEL : {model}
                      </Typography>
                      <Typography gutterBottom variant="h7" component="div">
                        ÜRETİM YILI : {year}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Button onClick={() => deleteCar(id)}>SİL</Button>
                </Card>
              );
            })}
          </Grid>
        </Box>
      )}
      {swich && (
        <Box>
          <AracCard
            page={page}
            setPage={setPage}
            swich={swich}
            setSwich={setSwich}
            yedek={yedek}
            search={search}
          />
        </Box>
      )}
    </>
  );
};

export default Car;
