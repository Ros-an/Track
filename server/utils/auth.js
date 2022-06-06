import bcrypt from "bcrypt";

// save hashed password-> when signup, user sends plain text -> hash it -> compare with saved password(already hashed)
// plain password -> from frontend & hashed password -> database

export const hashPassword = (password) => {
    return new Promise((resolve, reject)=> {
        bcrypt.genSalt(12, (err, salt)=> {
            if(err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=> {
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}
// refer to notion blog topic link 👆

export const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}