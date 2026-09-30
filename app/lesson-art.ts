// Row-major positions in three matching illustration sheets.
// Art supports the lesson; numbers and policy requirements stay in HTML text.
export const lessonArt = [
  {sheet:'a',tile:0,alt:'A teacher welcomes learners at a rural Texas school.'},
  {sheet:'a',tile:1,alt:'A recognition medal and a separate budget ledger on a desk.'},
  {sheet:'a',tile:2,alt:'An open field guide with tabs and a pencil.'},
  {sheet:'a',tile:3,alt:'A teacher at a classroom board beside student desks.'},
  {sheet:'a',tile:4,alt:'A teacher ID and personnel folder under a magnifying glass.'},
  {sheet:'a',tile:5,alt:'A backpack and suitcase between two school buildings.'},
  {sheet:'a',tile:6,alt:'Gold recognition medallions displayed on navy fabric.'},
  {sheet:'a',tile:7,alt:'A certificate with a blue ribbon beside a professional portfolio.'},
  {sheet:'a',tile:8,alt:'A calendar and magnifying glass for checking current guidance.'},
  {sheet:'b',tile:0,alt:'A campus observer with a clipboard visits a classroom.'},
  {sheet:'b',tile:1,alt:'Plants at different stages beside a measuring stick, a metaphor for growth.'},
  {sheet:'b',tile:2,alt:'An assessment clipboard, ruler, and pencils.'},
  {sheet:'b',tile:3,alt:'Coastal trail markers and a compass provide orientation.'},
  {sheet:'b',tile:4,alt:'An open rubric binder beside a balanced scale.'},
  {sheet:'b',tile:5,alt:'Teachers collaborate around an open book.'},
  {sheet:'b',tile:6,alt:'District staff review folders around a table.'},
  {sheet:'b',tile:7,alt:'A magnifying glass rests over a classroom roster folder.'},
  {sheet:'b',tile:8,alt:'Evidence folders and a magnifying glass on a research desk.'},
  {sheet:'c',tile:0,alt:'A school model, budget ledger, calculator, and banknotes.'},
  {sheet:'c',tile:1,alt:'A pay envelope and compensation folder.'},
  {sheet:'c',tile:2,alt:'Rural and city school models beside a ledger.'},
  {sheet:'c',tile:3,alt:'Speech bubbles, a magnifying glass, and an open book.'},
  {sheet:'c',tile:4,alt:'A tablet, reference binder, and magnifying glass for checking a source.'},
  {sheet:'c',tile:5,alt:'A submission folder beside a miniature rocket.'},
  {sheet:'c',tile:6,alt:'An hourglass beside a folder awaiting review.'},
  {sheet:'c',tile:7,alt:'A trail map, compass, and teacher notebook.'},
  {sheet:'c',tile:8,alt:'An open reflection journal, pencil, and trail lantern.'},
] as const;

// Three reading steps, two checks, and one reflection in every stop.
export const lessonArtByStep = [
  [0,1,2,18,19,26],
  [3,4,5,4,5,16],
  [6,7,8,6,8,2],
  [9,10,11,11,9,10],
  [12,13,14,13,14,2],
  [15,16,17,15,16,26],
  [18,19,20,18,19,26],
  [21,20,22,21,22,26],
  [23,17,24,17,24,16],
  [25,18,22,2,25,26],
] as const;

// Measured cell boundaries preserve full scenes where generated gutters vary.
export const lessonArtGrids = {
 a:{x:[0,418,836,1254],y:[0,418,836,1254]},
 b:{x:[0,422,836,1254],y:[0,418,836,1254]},
 c:{x:[0,417,830,1254],y:[0,400,790,1254]},
} as const;
