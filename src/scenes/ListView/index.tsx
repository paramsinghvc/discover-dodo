import React, { FC, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "@emotion/styled";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import ApiService, { wrapOperation } from "shared/services/apiService";
import Dog from "assets/dog.svg";
import "./index.scss";

import ContentHeadSection from "core/components/ContentHead";

const ListContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  padding-top: 64px;
  width: "inherit";
`;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
    // width: "inherit"
    // backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: "100%",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "2%",
    paddingBottom: "2%",
    width: "100%"
  },
  gridTiles: {
    width: "23% !important",
    borderRadius: "100px 100px 100px 100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    // height: "80%",
    // width: "95% !important",
    // backgroundColor: "#DCDCDC"
  }
}));

const ListView: FC<{}> = (props: any) => {
  const classes = useStyles();
  const { history } = props;
  const [petsList, setPetsList] = useState<any>([]);
  useEffect(() => {
    (async function getUsers() {
      console.log("executing here");
      const { response, error } = await wrapOperation(ApiService.getCollection)(
        "pets"
      );

      if (response) {
        const { docs } = response;
        let dataSource: any = [];
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

  console.log(petsList);
  return (
    <>
      <ListContainer>
        <ContentHeadSection history={history} />
        <GridList
          cellHeight={400}
          spacing={20}
          cols={4}
          className={classes.gridList}
        >
          <GridListTile
            key="Subheader"
            cols={4}
            style={{ height: "auto", backgroundColor: "", fontSize: "5rem" }}
          >
            <ListSubheader
              component="div"
              color="primary"
              style={{
                fontSize: "2.5rem"
              }}
            >
              Pet List
            </ListSubheader>
          </GridListTile>

          {petsList.map(tile => (
            <GridListTile key={tile.id} className={classes.gridTiles}>
              {tile.imageURL ? (
                <img src={tile.imageURL} alt={tile.id} />
              ) : (
                <img src={Dog} className={classes.image} alt="Species" />
              )}
              <GridListTileBar
                title={tile.name}
                subtitle={
                  <div>
                    {tile.lastSeenAt && (
                      <span> last seen at:{tile.lastSeenAt.locality}</span>
                    )}
                    {tile.breed && <span> breed:{tile.breed}</span>}
                    {/* {tile.lastSeenOn && (
                      <span> last Seen On:{tile.lastSeenOn}</span>
                    )} */}
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </ListContainer>
    </>
  );
};
export default ListView;
