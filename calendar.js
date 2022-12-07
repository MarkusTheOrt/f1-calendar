"use strict";

const pre = document.getElementById("pre");
const calendar = fetch("calendar.json");

const dcts = (s) => {
  return new Date(s).getTime() / 1000;
};

const lp = (n, l = 2) => {
  let s = "" + Math.floor(n);
  while (s.length < l) {
    s = "0" + s;
  }
  return s;
};
console.log(Math.floor(91447 % 1000));
const rcdtm = (t) => {
  return `${Math.floor(t / (1000 * 60))}:${lp((t % 60000) / 1000)}.${lp(
    t % 1000,
    3
  )}`;
};

const formatCalendar = (e) => {
  let t =
    "**Preliminary :f1_logo: 2023 Calendar**\n\n*Source:* <https://pbs.twimg.com/media/FjYzFILWAAEuRtl.jpg>\n\n";
  for (const weekend of e.events) {
    t += `**${weekend.prefix} ${weekend.name}**\n`;
    let d = new Date(weekend.start).getTime() / 1000;
    //t += `Weekend date: <t:${d}:D> - <t:${d}:R>\n`;
    let s = "";
    for (const session of weekend.sessions) {
      let ts = dcts(session.start);
      s += `> **${session.name}** <t:${ts}:f> \t(<t:${ts}:R>)\n`;
    }
    t += s;
    const record = weekend.racetrack.recordTime;
    if (record !== undefined) {
      t += `> **Track**: **${weekend.racetrack.name}**\n`;
      t += `> \tTrack Record: ${rcdtm(record.time.value)}\n`;
      t += `> \tby  ${record.driver.prefix} ${record.driver.name} (${record.driver.team}) in ${record.year}\n`;
    }
    t += "\n";
  }

  return t;
};

calendar.catch((e) => {
  pre.innerText = `Error retrieving calendar data:\n${e}`;
});

calendar.then(async (e) => {
  pre.innerText = formatCalendar(await e.json());
});
