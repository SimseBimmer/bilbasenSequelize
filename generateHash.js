import bcrypt from 'bcrypt';

const newPassword = 'Simon1710'; // indsæt det nye passwrd
const saltRounds = 10;

bcrypt.hash(newPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed password:', hash);
  }
});