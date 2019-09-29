import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  View
} from "@react-pdf/renderer";
import { Button } from "@material-ui/core";

const PetInfo = {
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

// Create styles
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

const Pamphlet = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.body}>
        <Text style={styles.title} wrap={true}>
          LOST {PetInfo.species.toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>Please help us find {PetInfo.name}</Text>
        <Image style={styles.image} src="/petPic.png" />
        <Text style={styles.text}>
          {PetInfo.name}
          {" is a loved "}
          {PetInfo.color} colored {PetInfo.breed} {PetInfo.species}
          {" being missed by his/her family."}
        </Text>
        <Text style={styles.text}>
          Last seen near {PetInfo.lastSeenAt}. If spotted, please contact{" "}
          {PetInfo.ownerName || "us"}
        </Text>
        <Text style={styles.title} wrap={true}>
          {PetInfo.contactNumber}
        </Text>

        {PetInfo.reward && (
          <Text style={styles.subtitle}>{PetInfo.reward} REWARD</Text>
        )}
      </View>
    </Page>
  </Document>
);

const DownloadLink = () => (
  <div>
    <PDFDownloadLink
      document={<Pamphlet />}
      fileName="Pamphlet.pdf"
      style={{ textDecoration: "none" }}
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          "Loading document..."
        ) : (
          <Button
            color="secondary"
            size="large"
            fullWidth={false}
            className="right-margin-10"
          >
            Download Pamphlet
          </Button>
        )
      }
    </PDFDownloadLink>
  </div>
);
export default DownloadLink;
