"use client";

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import Link from "next/link";

function issueParser(data: any[]) {

  let tasks: Task[] = [];

  for (const issue of data) {
    let start = labelParser(issue["labels"]);
    let closed = false;
    if (issue["state"] === "closed") { closed = true };

    if (start != null) {
      const task: Task = {
        name: issue["title"],
        start: start,
        end: new Date(issue["closed_at"]) || dateParser(start, 5),
        id: "Task " + issue["id"],
        type: "task",
        progress: closed ? 100 : 0,
        isDisabled: true,
        styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
      }
      tasks.push(task);
    }
  }

  return tasks;
}

function labelParser(data: any) {
  let names = [];

  for (const label of data as any) {
    if (label["name"].startsWith("week-")) {
      names.push(label["name"].replace(/^\D+/g, ''));
    }
  }

  if (names.length === 0) {
    return null;
  } else {
    let week = names[names.length - 1];
    return weekParser(week);
  }
}

function weekParser(week: number) {
  let year = new Date().getFullYear();

  if (week < 1 || week > 53) {
    throw new RangeError("ISO 8601 weeks are numbered from 1 to 53");
  }

  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dayOfWeek = simple.getDay();
  const isoWeekStart = simple;

  // get the monday past, and add a week if the day was friday, saturday or sunday.
  isoWeekStart.setDate(simple.getDate() - dayOfWeek + 1);
  if (dayOfWeek > 4) {
    isoWeekStart.setDate(isoWeekStart.getDate() + 7);
  }

  // the latest possible iso week starts on december 28 of the current year
  if (isoWeekStart.getFullYear() > year ||
    (isoWeekStart.getFullYear() == year &&
      isoWeekStart.getMonth() == 11 &&
      isoWeekStart.getDate() > 28)) {
    throw new RangeError(`${year} has no ISO week ${week}`);
  }

  return isoWeekStart;
}

function dateParser(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default function Chart({ data }: { data: any }) {
  let array = issueParser(data);
  if (array.length === 0) {
    return (
      <>
        <p>Het lijkt erop dat deze repository niet goed is ingesteld. Bij het instellen van je repository, let op het volgende.</p>
        <li>
          <ul>Zorg dat je repositories gebruikt maakt van <Link href="https://docs.github.com/en/issues">Issues</Link>.</ul>
          <ul>Maak labels aan voor iedere week van het jaar. Gebruik hiervoor het formaat &quot;week-x&quot;, waarbij &quot;x&quot; het weeknummer is.</ul>
          <ul>Als je pas je repository goed hebt ingesteld, kan het nog even duren voordat deze data beschikbaar komt.</ul>
        </li>
        <p>Heb je je repository goed ingesteld, maar krijg je nog steeds deze melding? Probeer het dan later opnieuw.</p>
      </>
    )
  }
  return (
    <>
      <Gantt tasks={issueParser(data)} />
    </>
  )
}