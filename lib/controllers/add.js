const { EOL } = require('os')

const { existsSync, writeFileSync, readFileSync } = require('fs')
const path = require('path')

const { getProfile } = require('../profiles')
const GitIgnore = require('../utils/library');
const logger = require('../logger')

const { GITIGNORE_NOT_FOUND } = require('../messages')

const HEADER = (name) => `# created by gitignorer
# profile used: ${name}` + EOL

module.exports = async (
  name = 'default',
  { force = false , global = false, profile = false, template = false} = {}
) => {

let GITIGNORE_PATH

  if (!global) {
    console.log('fuck')
    GITIGNORE_PATH = path.join(process.cwd(), '.gitignore')
  } else {
    console.log('2fuck')
    GITIGNORE_PATH = path.join(process.cwd(), '.gitignore')
  }

  if (!existsSync(GITIGNORE_PATH)) return logger.error(GITIGNORE_NOT_FOUND)

  if (profile && !template) {
    const files = await getProfile(name)

    // if (files.length == 0) {
    //   logger.error('No profile with that name', EOL)
    //   return;
    // }

    const file_content = HEADER(name) + files.join(EOL)
    const current_file_content = readFileSync(GITIGNORE_PATH)


    writeFileSync(GITIGNORE_PATH, current_file_content+EOL+ file_content + EOL)

    logger.success('> cat .gitignore', EOL, file_content)
  }

  if (!profile && template) {

    GitIgnore.writeFile({
      type: name,
      file: GITIGNORE_PATH,
      append: true
    }, function(err){
      if(err){
        if(err.statusCode){
          console.log("There is no gitignore for " + name);
          console.log("Available project types can be found by running `gitignore -types` or at https://github.com/github/gitignore");
          console.error("Recieved status code "+err.statusCode);
        } else {
          console.error("An unexpected error occurred.");
          console.error(err);
        }
        return;
      }
      logger.success("Created .gitignore file for type "+name+" :)");
    });
  }

  if ((profile && template) || (!profile && !template)) {
    const files = await getProfile(name)

    if (files.length == 0) {
      GitIgnore.writeFile({
        type: name,
        file: GITIGNORE_PATH
      }, function(err){
        if(err){
          if(err.statusCode){
            console.log("There is no gitignore for " + name);
            console.log("Available project types can be found by running `gitignore -types` or at https://github.com/github/gitignore");
            console.error("Recieved status code "+err.statusCode);
          } else {
            console.error("An unexpected error occurred.");
            console.error(err);
          }
          return;
        }
        logger.success("Created .gitignore file for type "+name+" :)");
      });

      return;

    }

    const file_content = HEADER(name) + files.join(EOL)

    writeFileSync(GITIGNORE_PATH, file_content + EOL)

    logger.success('> cat .gitignore', EOL, file_content)
  }

}
