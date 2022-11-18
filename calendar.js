"use strict";

const pre = document.getElementById("pre");
const calendar = fetch("calendar.json");

const formatCalendar = (e) => {
  let t =
    "**Preliminary :f1_logo: 2023 Calendar**\n\n*Source:* <https://www.formula1.com/en/latest/article.f1-announces-24-race-calendar-for-2023.7oNRaq4kZ2bwTAmL7r6dqg.html>\n\n";
  for (const weekend of e.events) {
    t += `**${weekend.prefix} ${weekend.name}**\n`;
    let d = new Date(weekend.start).getTime() / 1000;
    t += `Weekend starts at: <t:${d}:F> - <t:${d}:R>\n`;
    t += `Session times have not been announced to date.\n\n`;
  }

  return t;
};

calendar.catch((e) => {
  pre.innerText = `Error retrieving calendar data:\n${e}`;
});

calendar.then(async (e) => {
  pre.innerText = formatCalendar(await e.json());
});
