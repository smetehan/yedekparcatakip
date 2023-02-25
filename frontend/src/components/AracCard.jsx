import * as React from "react";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/system";

const AracCard = ({ page, setSwich, yedek }) => {
  return (
    <>
      <Button
        sx={{ height: "50px", weight: "50px" }}
        variant="contained"
        color="info"
        onClick={() => {
          setSwich(false);
        }}
      >
        Geri Dön
      </Button>
      <Grid
        container
        sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
      >
        {yedek
          ?.filter((val) => {
            if (page === "") {
              return;
            } else if (
              val.car_id.toString().toLocaleLowerCase() ===
              page.toString().toLocaleLowerCase()
            ) {
              return val;
            }
          })
          .map((val) => {
            const { car, spare, image, id, price, spare_number, box, total } =
              val;
            return (
              <div key={id}>
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
                  ></Box>
                </Card>
              </div>
            );
          })}
      </Grid>
    </>
  );
};

export default AracCard;
