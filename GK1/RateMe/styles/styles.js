import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 24
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16
  },
  button: {
    width: "86%",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 10
  },
  buttonPrimary: {
    backgroundColor: "#0a7ea4"
  },
  buttonGhost: {
    borderWidth: 1,
    borderColor: "#0a7ea4",
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },
  buttonTextGhost: {
    color: "#0a7ea4",
    fontSize: 16,
    fontWeight: "600"
  },
  card: {
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    overflow: "hidden",
    width: "100%"
  },
  cardImage: {
    width: "100%",
    height: 160
  },
  cardBody: {
    padding: 12,
    gap: 6
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700"
  },
  cardMeta: {
    fontSize: 13
  },
  cardActions: {
    marginTop: 8,
    flexDirection: "row",
    gap: 8
  },
  buttonSm: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10
  },
  detailImage: {
    width: "92%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12
  },
galleryImageFlex: {
  flex: 1,
  width: "100%",
  resizeMode: "contain",   // brug "cover" hvis du vil undgå sorte kanter (kan beskære)
  backgroundColor: "#000",
},
galleryInfoBar: {
  width: "100%",
  height: 96,
  backgroundColor: "blue", // 👈 test
  alignItems: "center",
  justifyContent: "center",
},

galleryInfoTitle: { color: "#fff", fontSize: 18, fontWeight: "600" },
galleryInfoRating:{ color: "#fff", fontSize: 14 },





});
