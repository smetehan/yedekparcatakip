import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function ActionAreaCard({ search, yedek }) {
  return (
    <>
      <Grid
        container
        sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
      >
        {yedek
          ?.filter((val) => {
            if (search === "") {
              return <div>Lütfen Arama Yapınız</div>;
            } else if (
              val.spare.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return val;
            } else if (
              val.spare_number
                .toString()
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return val;
            } else if (
              val.car
                .toString()
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((val) => {
            const { car, spare, image, id, price, spare_number, box, total } =
              val;
            return (
              <div key={id}>
                <Card sx={{ width: 500, height: 600 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={image}
                      alt="img"
                    />
                    <CardContent sx={{ height: 200 }}>
                      <Typography variant="h7" component="div">
                        ARAÇ ADI : {car}
                      </Typography>
                      <Typography variant="h7" component="div">
                        YEDEK PARÇA ADI : {spare}
                      </Typography>
                      <Typography variant="h7" component="div">
                        YEDEK PARÇA NO : {spare_number}
                      </Typography>
                      <Typography variant="h7" component="div">
                        FİYAT : {price}₺
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
                </Card>
              </div>
            );
          })}
      </Grid>
    </>
  );
}
