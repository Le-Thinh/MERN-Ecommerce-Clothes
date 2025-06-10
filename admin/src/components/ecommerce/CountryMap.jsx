import React from "react";
import { worldMill } from "@react-jvectormap/world";
import { VectorMap } from "@react-jvectormap/core";

const CountryMap = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 6, // Custom radius for markers
        },
      }}
      markersSelectable={true}
      markers={[
        {
          latLng: [37.2580397, -104.657039],
          name: "United States",
          style: {
            fill: "#465FFF",
            borderWidth: 1,
            borderColor: "white",
            stroke: "#383f47",
          },
        },
        {
          latLng: [20.7504374, 73.7276105],
          name: "India",
          style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [53.613, -11.6368],
          name: "United Kingdom",
          style: { fill: "#465FFF", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [-25.0304388, 115.2092761],
          name: "Sweden",
          style: {
            fill: "#465FFF",
            borderWidth: 1,
            borderColor: "white",
            strokeOpacity: 0,
          },
        },
        {
          latLng: [21.0285, 105.8542],
          name: "VietNam",
          style: {
            fill: "#465FFF",
            borderWidth: 1,
            borderColor: "white",
            strokeOpacity: 0,
          },
        },
      ]}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
  // return (
  //   <VectorMap
  //     map={worldMill}
  //     backgroundColor="transparent"
  //     zoomOnScroll={false}
  //     markers={[
  //       {
  //         latLng: [21.0285, 105.8542],
  //         name: "Vietnam",
  //         style: {
  //           fill: "#465FFF",
  //           stroke: "white",
  //         },
  //       },
  //     ]}
  //     selectedRegions={["VN"]}
  //     regionStyle={{
  //       initial: {
  //         fill: "#D0D5DD",
  //         stroke: "none",
  //       },
  //       selected: {
  //         fill: "#465FFF",
  //       },
  //       hover: {
  //         fill: "#465fff",
  //         cursor: "pointer",
  //       },
  //     }}
  //   />
  // );
};

export default CountryMap;
