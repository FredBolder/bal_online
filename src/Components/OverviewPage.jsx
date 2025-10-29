import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  series1Start, series1End,
  series2Start, series2End,
  series3Start, series3End,
  series4Start, series4End,
  series5Start, series5End,
  seriesSmallStart, seriesSmallEnd,
  seriesEasyStart, seriesEasyEnd,
  seriesExtremeStart, seriesExtremeEnd,
  seriesMusicStart, seriesMusicEnd
} from "../levels.js";
import { loadProgress, solvedLevels } from "../progress.js";

function firstOfSeries(level) {
  return [series1Start, series2Start, series3Start, series4Start, series5Start,
    seriesSmallStart, seriesEasyStart, seriesExtremeStart, seriesMusicStart].includes(level)
}

function levelNumberColor(level) {
  let color = "gray";

  if (solvedLevels.includes(level)) {
    color = "green";
  } else if (solvedLevels.includes(level - 1) || firstOfSeries(level)) {
    color = "white";
  } else {
    color = "gray";
  }
  return color;
}

function OverviewPage() {
  const navigate = useNavigate();
  const [series1List, setSeries1List] = useState([]);
  const [series2List, setSeries2List] = useState([]);
  const [series3List, setSeries3List] = useState([]);
  const [series4List, setSeries4List] = useState([]);
  const [series5List, setSeries5List] = useState([]);
  const [seriesSmallList, setSeriesSmallList] = useState([]);
  const [seriesEasyList, setSeriesEasyList] = useState([]);
  const [seriesExtremeList, setSeriesExtremeList] = useState([]);
  const [seriesMusicList, setSeriesMusicList] = useState([]);

  function handleClick(level) {
    if (solvedLevels.includes(level) || solvedLevels.includes(level - 1) || firstOfSeries(level)) {
      navigate(`/bal?level=${level}`);
    }
  }

  async function init() {
    await loadProgress();

    const list1 = [];
    for (let i = series1Start; i <= series1End; i++) {
      list1.push(i);
    }
    setSeries1List(list1);

    const list2 = [];
    for (let i = series2Start; i <= series2End; i++) {
      list2.push(i);
    }
    setSeries2List(list2);

    const list3 = [];
    for (let i = series3Start; i <= series3End; i++) {
      list3.push(i);
    }
    setSeries3List(list3);

    const list4 = [];
    for (let i = series4Start; i <= series4End; i++) {
      list4.push(i);
    }
    setSeries4List(list4);

    const list5 = [];
    for (let i = series5Start; i <= series5End; i++) {
      list5.push(i);
    }
    setSeries5List(list5);

    const listSmall = [];
    for (let i = seriesSmallStart; i <= seriesSmallEnd; i++) {
      listSmall.push(i);
    }
    setSeriesSmallList(listSmall);

    const listEasy = [];
    for (let i = seriesEasyStart; i <= seriesEasyEnd; i++) {
      listEasy.push(i);
    }
    setSeriesEasyList(listEasy);

    const listExtreme = [];
    for (let i = seriesExtremeStart; i <= seriesExtremeEnd; i++) {
      listExtreme.push(i);
    }
    setSeriesExtremeList(listExtreme);

    const listMusic = [];
    for (let i = seriesMusicStart; i <= seriesMusicEnd; i++) {
      listMusic.push(i);
    }
    setSeriesMusicList(listMusic);
  }

  useEffect(() => {
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <header>
        <div className="center">
          <div className="horizontalNavButtonGroup">
            <Link className="navButton" to="/">Back</Link>
            <Link className="navButton" to="/bal">Play</Link>
          </div>
        </div>
      </header>
      <main>
        <div className="center">
          <div className="pageTitle">
            <h1>Bal - Overview</h1>
          </div>
          <div className="textBox">
            The green numbers are the levels that you solved, the white numbers are the unlocked levels and
            the gray numbers are the locked levels.
            You can click on a white or a green number to play that level.
          </div>

          <h2>Series 1</h2>
          <div className="seriesList">
            {series1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 2</h2>
          <div className="seriesList">
            {series2List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 3</h2>
          <div className="seriesList">
            {series3List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 4</h2>
          <div className="seriesList">
            {series4List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 5</h2>
          <div className="seriesList">
            {series5List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Small</h2>
          <div className="seriesList">
            {seriesSmallList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Easy</h2>
          <div className="seriesList">
            {seriesEasyList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Extreme</h2>
          <div className="seriesList">
            {seriesExtremeList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Music</h2>
          <div className="seriesList">
            {seriesMusicList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default OverviewPage;

