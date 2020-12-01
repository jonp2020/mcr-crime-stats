import { useState } from "react";
import { RadialChart, Hint, DiscreteColorLegend } from "react-vis";

const ShowLocalAreaGraph = ({ showLocalGraph, crimeData }) => {
  const [crimeValue, setCrimeValue] = useState(false);

  const localData = crimeData.filter((crime) =>
    crime.location.street.id === showLocalGraph.reportedLocationId
      ? crime
      : null
  );

  const crimesInfo = {};
  const statusInfo = {};

  localData.forEach((crime) => {
    if (crimesInfo[crime.category]) {
      crimesInfo[crime.category]++;
    } else crimesInfo[crime.category] = 1;

    if (statusInfo[crime.outcome_status.category]) {
      statusInfo[crime.outcome_status.category]++;
    } else statusInfo[crime.outcome_status.category] = 1;
  });

  const COLORS = [
    "blue",
    "yellow",
    "red",
    "purple",
    "orange",
    "pink",
    "green",
    "white",
    "grey",
  ];

  const crimeInfoData = [];
  let count = 1;
  for (const crime in crimesInfo) {
    const removeHyphen = crime.replace(/-/g, " ");
    const firstLetter = removeHyphen.slice(0, 1);
    const formattedCrimeString = `${firstLetter.toUpperCase()}${removeHyphen.slice(
      1
    )}: ${crimesInfo[crime]}`;

    crimeInfoData.push({
      angle: crimesInfo[crime],
      label: formattedCrimeString,
      color: COLORS[count],
      // subLabel: crimesInfo[crime],
    });
    count++;
  }

  crimeInfoData.reverse();
  const crimeItems = crimeInfoData.map((crime) => {
    const updatedCrime = { ...crime };
    delete updatedCrime.angle;
    return updatedCrime;
  });

  console.log("crimeInfoData", crimeInfoData);
  console.log("crimeItems", crimeItems);
  return (
    <div className="show-local-area-graph-wrapper">
      <h3>{showLocalGraph.reportedLocation}</h3>
      <p>
        There were {localData.length} crimes reported during this month. The
        chart below shows the categories of the crimes that were reported and
        how many were reported for each.
      </p>
      <RadialChart
        // innerRadius={70}
        radius={100}
        data={crimeInfoData}
        width={300}
        height={300}
        // padAngle={0.04}
        onValueMouseOver={(v) => {
          setCrimeValue(v);
        }}
        onSeriesMouseOut={(v) => setCrimeValue(false)}
        colorType="literal"
        labelsRadiusMultiplier={1.1}
      >
        {crimeValue !== false && <Hint value={crimeValue} />}
      </RadialChart>
      <DiscreteColorLegend
        // colorType="literal"
        height={200}
        width={300}
        items={crimeItems.map((d, i) => {
          const title = d.label;
          const color = d.color;
          return { title, color };
        })}
      />
    </div>
  );
};

export default ShowLocalAreaGraph;
