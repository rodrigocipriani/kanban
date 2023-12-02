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
  const sourceFilePath = sourceFile.getFilePath().toString()
  console.log('File: ', sourceFilePath)

  // Get all import declarations in the file
  const imports = sourceFile.getImportDeclarations()

  imports.forEach((importDeclaration) => {
    const sourceFileImports = importDeclaration.getModuleSpecifier().getText()
    // console.log('  Imports: ', sourceFileImports)

    if (sourceFilePath.includes('/src/frontend')) {
      if (sourceFileImports.includes('@/backend')) {
        console.error(
          'ERROR: Importing backend from frontend',
          sourceFileImports
        )
      }
    }

    if (sourceFilePath.includes('/src/backend')) {
      if (sourceFileImports.includes('@/frontend')) {
        console.error(
          'ERROR: Importing backend from frontend',
          sourceFileImports
        )
      }
    }

    if (sourceFilePath.includes('/src/shared')) {
      if (
        sourceFileImports.includes('@/frontend') ||
        sourceFileImports.includes('@/backend')
      ) {
        console.error(
          'ERROR: Importing shared from frontend or backend',
          sourceFileImports
        )
      }
    }
  })
})
