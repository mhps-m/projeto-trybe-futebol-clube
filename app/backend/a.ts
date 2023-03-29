import * as bcrypt from 'bcryptjs'

const a = bcrypt.hashSync('secret_admin')

console.log(a)