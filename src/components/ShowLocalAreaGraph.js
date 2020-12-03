import { useState } from "react";
import { MdTranslate } from "react-icons/md";
import { RadialChart, DiscreteColorLegend, Hint } from "react-vis";

const ShowLocalAreaGraph = ({
  showLocalGraph,
  crimeData,
  handleCloseClick,
}) => {
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

    if (statusInfo[crime.outcome_status !== null]) {
      if (statusInfo[crime.outcome_status.category]) {
        statusInfo[crime.outcome_status.category]++;
      } else statusInfo[crime.outcome_status.category] = 1;
    }
  });

  const COLORS = [
    "blue",
    "yellow",
    "orchid",
    "red",
    "purple",
    "bisque",
    "orange",
    "pink",
    "green",
    "tomato",
    "white",
    "grey",
    "chartreuse",
    "yellowgreen",
    "peru",
    "powderblue",
    "azure",
    "fuchsia",
    "darkcyan",
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
    });
    count++;
  }

  crimeInfoData.reverse();
  const crimeItems = crimeInfoData.map((crime) => {
    const updatedCrime = { ...crime };
    delete updatedCrime.angle;
    return updatedCrime;
  });

  return (
    <div className="show-local-area-graph-wrapper">
      <button
        className="show-local-area-graph-close-btn"
        onClick={handleCloseClick}
      >
        x
      </button>
      <h3 className="show-local-area-graph-header">
        {showLocalGraph.reportedLocation}
      </h3>
      <p className="show-local-area-graph-text">
        There {localData.length === 1 ? "was" : "were"} {localData.length}{" "}
        {localData.length === 1 ? "crime" : "crimes"} reported at or near here
        during {showLocalGraph.fullMonth}, {showLocalGraph.year}.{" "}
        {localData.length === 1
          ? "The chart below shows the category of the crime that was reported."
          : "The chart below shows the categories of the crimes that were reported and how many were reported for each."}
      </p>
      <div className="chart-and-legend-container" onClick={handleCloseClick}>
        <RadialChart
          innerRadius={75}
          radius={90}
          data={crimeInfoData}
          width={250}
          height={250}
          style={{}}
          className="radial-chart"
          padAngle={0.04}
          onValueMouseOver={(v) => {
            const crime = v.label;
            setCrimeValue({ crime });
          }}
          onSeriesMouseOut={(v) => setCrimeValue(false)}
          colorType="literal"
          labelsRadiusMultiplier={1.1}
        >
          {crimeValue !== false && (
            <Hint value={crimeValue}>
              <div>
                <p>{crimeValue.crime}</p>
              </div>
            </Hint>
          )}
        </RadialChart>
        <div className="legend-container">
          <DiscreteColorLegend
            height={200}
            width={300}
            items={crimeItems.map((d) => {
              const title = d.label;
              const color = d.color;
              return { title, color };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowLocalAreaGraph;
