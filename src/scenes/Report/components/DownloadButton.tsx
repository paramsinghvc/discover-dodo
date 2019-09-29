import React, {
  FC,
  useEffect,
  useCallback,
  useState,
  memo,
  useMemo
} from "react";
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

import apiService from "shared/services/apiService";
import safeGet from "shared/utils/safeGet";

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

const Pamphlet = ({ petInfo = {} }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.body}>
        <Text style={styles.title} wrap={true}>
          LOST {safeGet(petInfo, "species", "").toUpperCase()}
        </Text>
        <Text style={styles.subtitle}>
          Please help us find {safeGet(petInfo, "name")}
        </Text>
        <Image style={styles.image} src="/petPic.png" />
        <Text style={styles.text}>
          {safeGet(petInfo, "name")}
          {" is a loved "}
          {safeGet(petInfo, "color")} colored {safeGet(petInfo, "breed")}{" "}
          {safeGet(petInfo, "species")}
          {" being missed by his/her family."}
        </Text>
        <Text style={styles.text}>
          Last seen near {safeGet(petInfo, "lastSeenAt")}. If spotted, please
          contact {safeGet(petInfo, "ownerName") || "us"}
        </Text>
        <Text style={styles.title} wrap={true}>
          {safeGet(petInfo, "contactNumber")}
        </Text>

        {safeGet(petInfo, "reward") && (
          <Text style={styles.subtitle}>
            {safeGet(petInfo, "reward")} REWARD
          </Text>
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
  const [petData, setPetData] = useState();
  // const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   setOpen(false);
  //   setOpen(true);
  //   return () => setOpen(false);
  // });

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
            const data = doc.data();
            if (data) {
              setPetData(data);
            }
          });
    }
  }, [value]);

  useEffect(() => {
    fetchData();
  }, [value]);

  const PamphletElement = useMemo(() => {
    return () => <Pamphlet petInfo={petData} />;
  }, []);

  return (
    <Holder>
      {petData && (
        <PDFDownloadLink
          document={<PamphletElement />}
          fileName="Pamphlet.pdf"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="secondary" {...props}>
            <ButtonContent>
              <SaveAlt />
              <span>{label}</span>
            </ButtonContent>
          </Button>
        </PDFDownloadLink>
      )}
    </Holder>
  );
};

export default memo(DownloadButton);
