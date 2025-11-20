// Generate SQL for admin user
// Default password: admin123
const password = process.argv[2] || 'admin123';

console.log('\n=== Admin User Setup ===\n');
console.log('Username: admin');
console.log('Password:', password);
console.log('\nSQL INSERT statement:');
console.log(`INSERT INTO users (username, password) VALUES ('admin', '${password}');`);
console.log('\nOr use this in your schema.sql file:');
console.log(`INSERT INTO users (username, password) VALUES ('admin', '${password}') ON DUPLICATE KEY UPDATE username=username;`);
console.log('\n');

