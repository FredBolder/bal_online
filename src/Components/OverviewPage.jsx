import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { globalVars } from "../glob.js";
import { firstOfSeries } from "../levels.js";
import {
  series1Start, series1End,
  series2Start, series2End,
  series3Start, series3End,
  series4Start, series4End,
  series5Start, series5End,
  seriesSmallStart, seriesSmallEnd,
  seriesEasyStart, seriesEasyEnd,
  seriesExtremeStart, seriesExtremeEnd,
  seriesMusicStart, seriesMusicEnd,
  seriesSecretStart, seriesSecretEnd,
  hiddenMiniSeries1Start, hiddenMiniSeries1End,
  extraSeries1Start, extraSeries1End,
  extraSeriesEasyStart, extraSeriesEasyEnd,
  extraSeriesMusicStart, extraSeriesMusicEnd,
} from "../levels.js";
import { loadProgress, solvedLevels } from "../progress.js";
import { loadSettings } from "../settings.js";

function levelNumberColor(level) {
  let color = "gray";

  if ((level >= 5000) && !globalVars.userP && !globalVars.fred) {
    return color;
  }

  if (solvedLevels.includes(level)) {
    color = "green";
  } else if (solvedLevels.includes(level - 1) || firstOfSeries(level) || (globalVars.userP && solvedLevels.includes(level - 2))) {
    color = "white";
  } else {
    color = "gray";
  }
  return color;
}

function levelNumberCursor(level) {
  let cursor = "auto";

  if ((level >= 5000) && !globalVars.userP && !globalVars.fred) {
    return cursor;
  }

  if (solvedLevels.includes(level) || solvedLevels.includes(level - 1) || firstOfSeries(level) ||
    (globalVars.userP && solvedLevels.includes(level - 2)) || globalVars.fred) {
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
  const [seriesEasyList, setSeriesEasyList] = useState([]);
  const [seriesExtremeList, setSeriesExtremeList] = useState([]);
  const [seriesMusicList, setSeriesMusicList] = useState([]);
  const [seriesSecretList, setSeriesSecretList] = useState([]);
  const [hiddenMiniSeries1List, setHiddenMiniSeries1List] = useState([]);
  const [extraSeries1List, setExtraSeries1List] = useState([]);
  const [extraEasyList, setExtraEasyList] = useState([]);
  const [extraMusicList, setExtraMusicList] = useState([]);

  function handleClick(level) {
    if ((level >= 5000) && !globalVars.userP && !globalVars.fred) {
      return;
    }

    if (solvedLevels.includes(level) || solvedLevels.includes(level - 1) || firstOfSeries(level) ||
      (globalVars.userP && solvedLevels.includes(level - 2)) || globalVars.fred) {
      globalVars.clickedLevel = level;
      navigate(`/bal`);
    }
  }

  async function init() {
    loadSettings();
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

    const listExtra1 = [];
    for (let i = extraSeries1Start; i <= extraSeries1End; i++) {
      listExtra1.push(i);
    }
    setExtraSeries1List(listExtra1);

    const listExtraEasy = [];
    for (let i = extraSeriesEasyStart; i <= extraSeriesEasyEnd; i++) {
      listExtraEasy.push(i);
    }
    setExtraEasyList(listExtraEasy);

    const listExtraMusic = [];
    for (let i = extraSeriesMusicStart; i <= extraSeriesMusicEnd; i++) {
      listExtraMusic.push(i);
    }
    setExtraMusicList(listExtraMusic);
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
            You can click on a white or a green number to play that level.<br />
            IMPORTANT: If you delete your site data, you might lose your progress. You can export your
            progress to a file, so you can later import your progress (also on another device).
          </div>
          <h2>Series 1</h2>
          <div className="seriesList">
            {series1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 2</h2>
          <div className="seriesList">
            {series2List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 3</h2>
          <div className="seriesList">
            {series3List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 4</h2>
          <div className="seriesList">
            {series4List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Series 5</h2>
          <div className="seriesList">
            {series5List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Small</h2>
          <div className="seriesList">
            {seriesSmallList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Easy</h2>
          <div className="seriesList">
            {seriesEasyList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Extreme</h2>
          <div className="seriesList">
            {seriesExtremeList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Music</h2>
          <div className="seriesList">
            {seriesMusicList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Secret series</h2>
          <div className="seriesList">
            {seriesSecretList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Hidden mini series 1</h2>
          <div className="seriesList">
            {hiddenMiniSeries1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>

          <h2>Extra series 1</h2>
          <div className="seriesList">
            {extraSeries1List.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>
          <h2>Extra Easy</h2>
          <div className="seriesList">
            {extraEasyList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
              onClick={() => handleClick(level)} >
              {level}
            </div>))}
          </div>
          <h2>Extra Music</h2>
          <div className="seriesList">
            {extraMusicList.map((level) => (<div
              key={level}
              style={{ color: levelNumberColor(level), cursor: levelNumberCursor(level) }}
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

