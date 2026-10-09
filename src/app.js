function add(a, b) {
  return a + b;
}

if (require.main === module) {
  console.log("Application result:", add(2, 3));
}

module.exports = { add };
