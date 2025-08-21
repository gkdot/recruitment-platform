export function generateArrayOfYears(): number[] {
  var max = new Date().getFullYear();
  var min = max + 4;
  var years = [];

  for (var i = max; i <= min; i++) {
    years.push(i);
  }
  return years;
}
