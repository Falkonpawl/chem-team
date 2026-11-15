export interface Lesson {
  time: string;
  title: string;
}

export interface DaySchedule {
  day: string;
  shortName: string;
  hasLesson: boolean;
}

export interface ClassSchedule {
  classLevel: string;
  days: DaySchedule[];
  lessons: Lesson[];
}

export const scheduleData: ClassSchedule[] = [
  {
    classLevel: "11 класс",
    days: [
      { day: "Понедельник", shortName: "пн", hasLesson: true },
      { day: "Вторник", shortName: "вт", hasLesson: false },
      { day: "Среда", shortName: "ср", hasLesson: false },
      { day: "Четверг", shortName: "чт", hasLesson: true },
      { day: "Пятница", shortName: "пт", hasLesson: false },
      { day: "Суббота", shortName: "сб", hasLesson: false },
      { day: "Воскресенье", shortName: "вс", hasLesson: false },
    ],
    lessons: [
      { time: "17:00-18:30", title: "Групповые занятия 11 классы. Подготовка к ЦТ и ЦЭ" },
      { time: "20:00-21:30", title: "Групповые занятия 11 классы. Подготовка к ЦТ и ЦЭ" },
    ],
  },
  {
    classLevel: "10 класс",
    days: [
      { day: "Понедельник", shortName: "пн", hasLesson: false },
      { day: "Вторник", shortName: "вт", hasLesson: true },
      { day: "Среда", shortName: "ср", hasLesson: false },
      { day: "Четверг", shortName: "чт", hasLesson: false },
      { day: "Пятница", shortName: "пт", hasLesson: true },
      { day: "Суббота", shortName: "сб", hasLesson: false },
      { day: "Воскресенье", shortName: "вс", hasLesson: false },
    ],
    lessons: [
      { time: "16:00-17:30", title: "Групповые занятия 10 классы. Органическая химия" },
    ],
  },
  {
    classLevel: "9 класс",
    days: [
      { day: "Понедельник", shortName: "пн", hasLesson: false },
      { day: "Вторник", shortName: "вт", hasLesson: false },
      { day: "Среда", shortName: "ср", hasLesson: true },
      { day: "Четверг", shortName: "чт", hasLesson: false },
      { day: "Пятница", shortName: "пт", hasLesson: false },
      { day: "Суббота", shortName: "сб", hasLesson: true },
      { day: "Воскресенье", shortName: "вс", hasLesson: false },
    ],
    lessons: [
      { time: "15:00-16:30", title: "Групповые занятия 9 классы. Неорганическая химия" },
    ],
  },
  {
    classLevel: "8 класс",
    days: [
      { day: "Понедельник", shortName: "пн", hasLesson: true },
      { day: "Вторник", shortName: "вт", hasLesson: false },
      { day: "Среда", shortName: "ср", hasLesson: false },
      { day: "Четверг", shortName: "чт", hasLesson: false },
      { day: "Пятница", shortName: "пт", hasLesson: false },
      { day: "Суббота", shortName: "сб", hasLesson: false },
      { day: "Воскресенье", shortName: "вс", hasLesson: true },
    ],
    lessons: [
      { time: "18:00-19:30", title: "Групповые занятия 8 классы. Основы химии" },
    ],
  },
  {
    classLevel: "7 класс",
    days: [
      { day: "Понедельник", shortName: "пн", hasLesson: false },
      { day: "Вторник", shortName: "вт", hasLesson: false },
      { day: "Среда", shortName: "ср", hasLesson: false },
      { day: "Четверг", shortName: "чт", hasLesson: true },
      { day: "Пятница", shortName: "пт", hasLesson: false },
      { day: "Суббота", shortName: "сб", hasLesson: false },
      { day: "Воскресенье", shortName: "вс", hasLesson: false },
    ],
    lessons: [
      { time: "14:00-15:30", title: "Введение в химию 7 класс" },
    ],
  },
];
