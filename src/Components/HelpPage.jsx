import { Link } from "react-router-dom";

function HelpPage() {
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
                        <h1>Bal - How to Play</h1>
                    </div>
                    <div className="textBox">
                        In every level you control the blue ball with the happy face. You
                        have to eat all the small green balls. You can push the white
                        balls and the light blue balls, but not more than 2 at the same
                        time. The light blue balls are floating balls and they will always
                        stay at the same height. Red balls and red fish are very
                        dangerous. If you push a yellow ball, it will continue as far as
                        possible. You cannot push more yellow balls at the same time or
                        push a yellow ball together with another ball. You can push a
                        yellow ball in the directions left, right, up and down. A purple
                        ball is almost the same as a yellow ball, but when you push a
                        purple ball, it will go only one position further. You cannot push
                        a ball through a one direction, a teleport, a game rotator or a
                        door with a lock. You can control the blue ball with the letter
                        keys, the arrow keys or the arrow buttons. In the
                        water you can swim in every direction.
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Direction</th>
                                <th scope="col">Letter key</th>
                                <th scope="col">Arrow key</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Walk left / Swim left</td>
                                <td>A</td>
                                <td>Arrow left</td>
                            </tr>
                            <tr>
                                <td>Walk right / Swim right</td>
                                <td>D</td>
                                <td>Arrow right</td>
                            </tr>
                            <tr>
                                <td>Jump / Push up / Swim up</td>
                                <td>W</td>
                                <td>Arrow up</td>
                            </tr>
                            <tr>
                                <td>Jump left / Swim up left</td>
                                <td>Q</td>
                                <td>Shift + Arrow left</td>
                            </tr>
                            <tr>
                                <td>Jump right / Swim up right</td>
                                <td>E</td>
                                <td>Shift + Arrow right</td>
                            </tr>
                            <tr>
                                <td>Push down / Swim down</td>
                                <td>S</td>
                                <td>Arrow down</td>
                            </tr>
                            <tr>
                                <td>Swim down left</td>
                                <td>Y</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>Swim down right</td>
                                <td>C</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="textBox">
                        If you see for example a
                        level number 750, it doesn&apos;t mean that there are 750 or even more
                        levels. The number depends also on the series and on the original Bal game.
                        At the moment there are more than 200 levels.
                        When you solve a level, you will get a code that gives you access
                        to the next level whenever you want by pressing the Code button, so
                        it is important to write down the code.
                        Some levels are very difficult. If you can&apos;t solve a certain
                        level, you can press the ? button for a hint (if available) or
                        start with another series.
                    </div>
                    <div className="downloadManual">
                        Download the <a className="link" target="_blank" rel="noopener noreferrer" href="./bal_online_manual.pdf">manual</a> for more information.
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HelpPage;

