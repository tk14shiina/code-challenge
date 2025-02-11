/* Implementation 1: Using a loop
1. Time complexity: O(n)
2. Space complexity: O(1)
*/
function sum_to_n_loop(n) {
  if (n >>> 0 !== n) return 0;

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

//////////////////////////////////////////
/* Implementation 2: Using Array methods
1. Time complexity: O(n)
2. Space complexity: O(n)
*/
function sum_to_n_array(n) {
  return n >>> 0 !== n
    ? [...Array(n)].reduce((sum, _, i) => sum + i + 1, 0)
    : 0;
}

function sum_to_n(n) {
  return n >>> 0 !== n ? (n * (n + 1)) >> 1 : 0;
}

//////////////////////////////////////////
/* Implementation 3: Using Formula 
1. Time complexity: O(1)
2. Space complexity: O(1)
*/
