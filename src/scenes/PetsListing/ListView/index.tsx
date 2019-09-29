import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import ApiService, { wrapOperation } from "shared/services/apiService";
import PlaceholderImg from "assets/placeholder.png";

import "./index.scss";
import safeGet from "shared/utils/safeGet";

const ListContainer = styled.div`
  position: fixed;
  top: 160px;
  bottom: 0;
  right: 0;
  left: 0;
  width: inherit;
  height: inherit;
  overflow: auto;
`;

const GridHolder = styled.section`
  padding: 60px 60px 70px 60px;
  width: inherit;
  height: inherit;
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-gap: 20px;
  justify-items: start;
`;

const StyledCard = styled(Card)`
  width: 250px;
  height: 400px;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 250px;
  /* background-size: contain; */
`;

const ListView: FC<{}> = (props: any) => {
  const [petsList, setPetsList] = useState<any>([]);
  useEffect(() => {
    (async function getUsers() {
      const { response, error } = await wrapOperation(ApiService.getCollection)(
        "pets"
      );

      if (response) {
        const { docs } = response;
        const dataSource: any = [];
        docs.forEach(document => {
          let petDocument = {};
          petDocument = { ...document.data(), id: document.id };
          dataSource.push(petDocument);
        });

        setPetsList(dataSource);
      } else {
        // console.error("Oops", error);
      }
    })();
  }, []);

  return (
    <>
      <ListContainer>
        <GridHolder>
          {petsList.map(pet => (
            <StyledCard key={pet.id}>
              <StyledCardMedia
                image={safeGet(pet, "photos[0]", PlaceholderImg)}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography variant="h6" gutterBottom align="center">
                  {pet.petName}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {pet.petGender} . {pet.petSpecies} . {pet.petBreed}
                </Typography>
                <Typography variant="body2" component="p">
                  "{pet.petNotes}"
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">See More</Button>
              </CardActions> */}
            </StyledCard>
          ))}
        </GridHolder>
      </ListContainer>
    </>
  );
};
export default ListView;
