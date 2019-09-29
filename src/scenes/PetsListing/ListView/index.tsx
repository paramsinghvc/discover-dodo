import React, { FC } from "react";
import styled from "@emotion/styled";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import PlaceholderImg from "assets/placeholder.png";

import "./index.scss";
import safeGet from "shared/utils/safeGet";
import { Link } from "react-router-dom";
import { PetInfoType } from "shared/types";

const ListContainer = styled.div`
  position: fixed;
  top: 65px;
  bottom: 0;
  right: 0;
  left: 0;
  width: inherit;
  height: inherit;
  overflow: auto;
`;

const GridHolder = styled.section`
  padding: 160px 60px 70px 60px;
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

type ListProps = {
  petDetails: Array<PetInfoType>;
};

const ListView: FC<ListProps> = (props: ListProps) => {
  const { petDetails: petsList } = props;

  return (
    <>
      <ListContainer>
        <GridHolder>
          {petsList.map(pet => (
            <Link to={`/details/${pet.id}`} key={pet.id}>
              <StyledCard>
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
            </Link>
          ))}
        </GridHolder>
      </ListContainer>
    </>
  );
};
export default ListView;
