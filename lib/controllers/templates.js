const os = require('os')
const { EOL } = os
const path = require('path')
const { existsSync } = require('fs')

const chalk = require('chalk')

const GitIgnore = require('../utils/library');


const { GITIGNORE_PROFILES_NOT_FOUND } = require('../messages')
const { getProfiles } = require('../profiles')
const logger = require('../logger')

module.exports = async () => {

    console.log("Fetching available types...");
    GitIgnore.getTypes(function(err, types){
      if(err){
        if(err.statusCode){
          console.error("Could not access file from GitHub. Recieved status code "+err.statusCode);
        } else {
          console.error("An unexpected error occurred.");
          console.error(err);
        }
        return;
      }
      console.log(types.join(EOL));
    });

}
