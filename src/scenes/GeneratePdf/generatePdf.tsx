import React from "react";
import {
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { Button } from "@material-ui/core";

const DogInfo = {
  name: "Doggo",
  species: "Cat",
  breed: "Persian",
  lastSeenAt: "HSR Layout",
  color: "cream",
  contactNumber: 8888888888
};

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    backgroundColor: "#fad5d2"
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 40
  },
  author: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 40
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    textAlign: "center"
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Times-Roman"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
    border: 5,
    borderColor: "black",
    borderStyle: "solid"
  }
});

const Pamphlet = () => (
  <Document>
    <Page size="A4" style={styles.body}>
      <Text style={styles.title} wrap={true}>
        LOST {DogInfo.species.toUpperCase()}
      </Text>
      <Text style={styles.author}>{DogInfo.name}</Text>
      <Text style={styles.author}>{DogInfo.breed}</Text>
      <Image style={styles.image} src="/logo192.png" />
      <Text style={styles.subtitle}>Contact {DogInfo.contactNumber}</Text>
      <Text style={styles.text}>
        Last seen near {DogInfo.lastSeenAt}. If spotted, please let us know.
      </Text>
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
