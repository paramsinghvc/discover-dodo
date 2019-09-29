import React, { FC, useEffect, useCallback, useState, memo } from "react";
import styled from "@emotion/styled";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  View
} from "@react-pdf/renderer";
import apiService, { wrapOperation } from "shared/services/apiService";

const petInfo = {
  name: "Chetak",
  species: "Horse",
  breed: "Arabian",
  lastSeenAt: "HSR Layout",
  color: "Yellow",
  contactNumber: 8888888888,
  reward: "Rs. 1200",
  ownerName: "Majnu Bhai",
  ownerAddress: "Mumbai"
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#d6f1ff",
    height: "100%"
  },
  body: {
    border: 4,
    borderColor: "#3dbdff",
    borderStyle: "solid",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "ultrabold"
  },
  subtitle: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 40
  },
  text: {
    margin: 12,
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Roman",
    paddingTop: 20,
    paddingBottom: 20
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    border: 2,
    width: "300px",
    alignContent: "center",
    borderColor: "black",
    borderStyle: "solid"
  }
});

const Pamphlet = petInfo => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.body}>
        <Text style={styles.title} wrap={true}>
          LOST {petInfo.species.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>Please help us find {petInfo.name}</Text>
        <Image style={styles.image} src="/petPic.png" />
        <Text style={styles.text}>
          {petInfo.name}
          {" is a loved "}
          {petInfo.color} colored {petInfo.breed} {petInfo.species}
          {" being missed by his/her family."}
        </Text>
        <Text style={styles.text}>
          Last seen near {petInfo.lastSeenAt}. If spotted, please contact{" "}
          {petInfo.ownerName || "us"}
        </Text>
        <Text style={styles.title} wrap={true}>
          {petInfo.contactNumber}
        </Text>

        {petInfo.reward && (
          <Text style={styles.subtitle}>{petInfo.reward} REWARD</Text>
        )}
      </View>
    </Page>
  </Document>
);

const Holder = styled.section`
  margin-bottom: 100px;
`;
const ButtonContent = styled.section`
  display: flex;
  align-items: center;
  > span {
    margin-left: 15px;
  }
`;

const DownloadButton: FC<{ value: string; label: string }> = ({
  value,
  label,
  ...props
}) => {
  // const [petData, setPetData] = useState();
  const fetchData = useCallback(async () => {
    if (value) {
      // const { response, error } = await wrapOperation(
      //   apiService.getDocInCollection
      // )("pets", value);
      // if (response) {
      //   console.warn("response", response.data());
      // } else {
      //   console.error(error);
      // }
      apiService.db &&
        apiService.db
          .collection("pets")
          .doc(value)
          .onSnapshot(doc => {
            console.warn("response", doc.data());
          });
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, [value]);

  return (
    <Holder>
      {/* <PDFDownloadLink
        document={<Pamphlet petInfo={petInfo} />}
        fileName="Pamphlet.pdf"
        style={{ textDecoration: "none" }}
      > */}
      <Button variant="contained" color="secondary" {...props}>
        <ButtonContent>
          <SaveAlt />
          <span>{label}</span>
        </ButtonContent>
      </Button>
      {/* </PDFDownloadLink> */}
    </Holder>
  );
};

export default memo(DownloadButton);
