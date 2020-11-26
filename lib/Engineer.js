const Employee = require("./Employee"); 

class Engineer extends Employee {
    constructor(name, id, email, githubUser){
        super(name, id, email);
        this.github = githubUser
    }

    getRole(){
        return "Engineer"
    }

    getGithub(){
        return this.github
    }
}


module.exports = Engineer;