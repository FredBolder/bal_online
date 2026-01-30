import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton.jsx";

import { globalVars } from "../glob.js";
import { firstOfSeries } from "../levels.js";
import {
  displayLevelNumber, isExtra, numberOfLevels,
  series1Start, series1End,
  series2Start, series2End,
  series3Start, series3End,
  series4Start, series4End,
  series5Start, series5End,
  seriesSmallStart, seriesSmallEnd,
  seriesEasy1Start, seriesEasy1End,
  seriesExtremeStart, seriesExtremeEnd,
  seriesMusic1Start, seriesMusic1End,
  seriesSecretStart, seriesSecretEnd,
  hiddenMiniSeries1Start, hiddenMiniSeries1End,
  // Extra
  series6Start, series6End,
  seriesEasy2Start, seriesEasy2End,
  seriesMusic2Start, seriesMusic2End,
  seriesMathStart, seriesMathEnd,
  seriesLanguageStart, seriesLanguageEnd,
  seriesFishStart, seriesFishEnd,
  seriesProgrammingStart, seriesProgrammingEnd,
} from "../levels.js";
import { loadProgress, solvedLevels } from "../progress.js";
import { loadSettings } from "../settings.js";

function levelNumberColor(level) {
  let color = "gray";

  if (isExtra(level) && !globalVars.up && !globalVars.uf) {
    return color;
  }

  if (solvedLevels.includes(level)) {
    color = "green";
  } else if (solvedLevels.includes(level - 1) || firstOfSeries(level) || (globalVars.up && solvedLevels.includes(level - 2))) {
    color = "white";
  } else {
    color = "gray";
  }
  return color;
}

function levelNumberCursor(level) {
  let cursor = "auto";

  if (isExtra(level) && !globalVars.up && !globalVars.uf) {
    return cursor;
  }

  if (solvedLevels.includes(level) || solvedLevels.includes(level - 1) || firstOfSeries(level) ||
    (globalVars.up && solvedLevels.includes(level - 2)) || globalVars.uf) {
    cursor = "pointer";
  } else {
    cursor = "auto";
  }
  return cursor;
}

function OverviewPage() {
  const navigate = useNavigate();
  const [series1List, setSeries1List] = useState([]);
  const [series2List, setSeries2List] = useState([]);
  const [series3List, setSeries3List] = useState([]);
  const [series4List, setSeries4List] = useState([]);
  const [series5List, setSeries5List] = useState([]);
  const [seriesSmallList, setSeriesSmallList] = useState([]);
  const [seriesEasy1List, setSeriesEasy1List] = useState([]);
  const [seriesExtremeList, setSeriesExtremeList] = useState([]);
  const [seriesMusic1List, setSeriesMusic1List] = useState([]);
  const [seriesSecretList, setSeriesSecretList] = useState([]);
  const [hiddenMiniSeries1List, setHiddenMiniSeries1List] = useState([]);
  const [series6List, setSeries6List] = useState([]);
  const [seriesEasy2List, setSeriesEasy2List] = useState([]);
  const [seriesMusic2List, setSeriesMusic2List] = useState([]);
  const [seriesMathList, setSeriesMathList] = useState([]);
  const [seriesLanguageList, setSeriesLanguageList] = useState([]);
  const [seriesFishList, setSeriesFishList] = useState([]);
  const [seriesProgrammingList, setSeriesProgrammingList] = useState([]);

  const [progressText, setProgressText] = useState("");

  function handleClick(level) {
    if (isExtra(level) && !globalVars.up && !globalVars.uf) {
      return;
    }

    if (solvedLevels.includes(level) || solvedLevels.includes(level - 1) || firstOfSeries(level) ||
      (globalVars.up && solvedLevels.includes(level - 2)) || globalVars.uf) {
      globalVars.clickedLevel = level;
      navigate(`/bal`);
    }
  }

  async function init() {
    loadSettings();
    await loadProgress();
    updateProgressText();

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

    const listEasy1 = [];
    for (let i = seriesEasy1Start; i <= seriesEasy1End; i++) {
      listEasy1.push(i);
    }
    setSeriesEasy1List(listEasy1);

    const listExtreme = [];
    for (let i = seriesExtremeStart; i <= seriesExtremeEnd; i++) {
      listExtreme.push(i);
    }
    setSeriesExtremeList(listExtreme);

    const listMusic1 = [];
    for (let i = seriesMusic1Start; i <= seriesMusic1End; i++) {
      listMusic1.push(i);
    }
    setSeriesMusic1List(listMusic1);

    const listSecret = [];
    for (let i = seriesSecretStart; i <= seriesSecretEnd; i++) {
      listSecret.push(i);
    }
    setSeriesSecretList(listSecret);

    const listHidden1 = [];
    for (let i = hiddenMiniSeries1Start; i <= hiddenMiniSeries1End; i++) {
      listHidden1.push(i);
    }
    setHiddenMiniSeries1List(listHidden1);

    const list6 = [];
    for (let i = series6Start; i <= series6End; i++) {
      list6.push(i);
    }
    setSeries6List(list6);

    const listEasy2 = [];
    for (let i = seriesEasy2Start; i <= seriesEasy2End; i++) {
      listEasy2.push(i);
    }
    setSeriesEasy2List(listEasy2);

    const listMusic2 = [];
    for (let i = seriesMusic2Start; i <= seriesMusic2End; i++) {
      listMusic2.push(i);
    }
    setSeriesMusic2List(listMusic2);

    const listMath = [];
    for (let i = seriesMathStart; i <= seriesMathEnd; i++) {
      listMath.push(i);
    }
    setSeriesMathList(listMath);

    const listLanguage = [];
    for (let i = seriesLanguageStart; i <= seriesLanguageEnd; i++) {
      listLanguage.push(i);
    }
    setSeriesLanguageList(listLanguage);

    const listFish = [];
    for (let i = seriesFishStart; i <= seriesFishEnd; i++) {
      listFish.push(i);
    }
    setSeriesFishList(listFish);

    const listProgramming = [];
    for (let i = seriesProgrammingStart; i <= seriesProgrammingEnd; i++) {
      listProgramming.push(i);
    }
    setSeriesProgrammingList(listProgramming);
  }

  function updateProgressText() {
    setProgressText(`${solvedLevels.length} of ${numberOfLevels()} levels solved`);
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
          <div id="progress">{progressText}</div>
          <div className="textBox">
            The green numbers are the levels that you solved, the white numbers are the unlocked levels and
            the gray numbers are the locked levels.
            You can click on a white or a green number to play that level.<br />
            IMPORTANT: If you delete your browser data, you might lose your progress. You can export your
            progress to a file, so you can later import your progress (also on another device).
          </div>
          <h2>Series 1</h2>
          <div className="seriesList">
            {series1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Series 2</h2>
          <div className="seriesList">
            {series2List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Series 3</h2>
          <div className="seriesList">
            {series3List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Small</h2>
          <div className="seriesList">
            {seriesSmallList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Easy 1</h2>
          <div className="seriesList">
            {seriesEasy1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Extreme</h2>
          <div className="seriesList">
            {seriesExtremeList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Music 1</h2>
          <div className="seriesList">
            {seriesMusic1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Secret series</h2>
          <div className="seriesList">
            {seriesSecretList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Hidden mini series 1</h2>
          <div className="seriesList">
            {hiddenMiniSeries1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h1>Extra levels for members</h1>
          <div className="textBox">
            For only 5 euro you can become a member and play the following levels (more to come).
            For members there are also 2 levels unlocked after a solved level, so if you can not solve the level after the solved one,
            you can continue with the next level.
            If you have any questions, please feel free to contact Fred Bolder by sending a message to&nbsp;
            <a className="link" href="mailto:fgh.bolder@gmail.com">
              fgh.bolder@gmail.com
            </a>
          </div>

          <div className="paypal-wrapper">
            <PayPalButton />
          </div>

          <h2>Series 4</h2>
          <div className="seriesList">
            {series4List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Series 5</h2>
          <div className="seriesList">
            {series5List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

          <h2>Series 6</h2>
          <div className="seriesList">
            {series6List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Easy 2</h2>
          <div className="seriesList">
            {seriesEasy2List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Music 2</h2>
          <div className="seriesList">
            {seriesMusic2List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Math</h2>
          <div className="seriesList">
            {seriesMathList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Language</h2>
          <div className="seriesList">
            {seriesLanguageList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Fish</h2>
          <div className="seriesList">
            {seriesFishList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>
          <h2>Programming</h2>
          <div className="seriesList">
            {seriesProgrammingList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {displayLevelNumber(level)}
            </div>))}
          </div>

        </div>
      </main>
    </div>
  );
}

export default OverviewPage;

