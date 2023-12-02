const { Project } = require('ts-morph')

// Initialize a new ts-morph Project
const project = new Project({
  // Specify the tsconfig.json path
  tsConfigFilePath: './tsconfig.json',
})

// Get all source files in the project
const sourceFiles = project.getSourceFiles()

// Iterate over the source files and extract dependencies
sourceFiles.forEach((sourceFile) => {
  console.log('File: ', sourceFile.getFilePath())

  // Get all import declarations in the file
  const imports = sourceFile.getImportDeclarations()

  imports.forEach((importDeclaration) => {
    console.log('  Imports: ', importDeclaration.getModuleSpecifier().getText())
  })
})
