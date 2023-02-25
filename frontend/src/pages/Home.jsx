import React from "react";
import Form from "react-bootstrap/Form";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import SearchCard from "../components/SearchCard";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import { useEffect } from "react";

const Home = () => {
  const { axiosWithToken } = useAxios();
  const [search, setSearch] = useState("");
  const [yedek, setYedek] = useState([]);
  const getSpareData = async () => {
    const data = await axiosWithToken(`yedekparca/spare/`);
    setYedek(data.data);
  };
  useEffect(() => {
    getSpareData();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
      }}
    >
      <Grid
        container
        sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
      >
        <Box sx={{ width: 400 }}>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Yedek Parça Ara"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          {search && (
            <SearchCard
              search={search}
              setSearch={setSearch}
              yedek={yedek}
              setYedek={setYedek}
            />
          )}
          {!search && (
            <Box
              sx={{
                marginBottom: 5,
                textAlign: "center",
              }}
            >
              <Grid>
                <Box sx={{ width: 750, height: 650 }}>
                  <img
                    className="homeImg"
                    src="https://res.cloudinary.com/tasit-com/image/upload/v1435844932/oto_yedek_par%C3%A7a_fiyatlar%C4%B1_r7tkb0.jpg"
                    alt="img"
                  />
                </Box>
              </Grid>
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
};

export default Home;
