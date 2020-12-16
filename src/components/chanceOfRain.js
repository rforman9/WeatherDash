function ChanceOfRain(pressure, temperature, amount) {
  console.log('pressure=', pressure + '\n', 'temperature=', temperature + '\n', 'amount=', amount + '\n')
  var score = Math.log(amount + 1) * Math.log(pressure - 929) * Math.log(temperature - 9);
  var mean = Math.min(Math.max(score, 0), 100);
  var upper_bound = Math.min(1.5 * mean, 100);
  var lower_bound = Math.max(0.5 * mean, 0);
  console.log('returning', [lower_bound, mean, upper_bound])
  return [lower_bound, mean, upper_bound];
}