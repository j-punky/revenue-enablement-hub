import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'revenue-enablement-hub',
  title: 'Revenue Enablement Hub',

  projectId: 'yx58szp0', // Updated with actual project ID
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Departments
            S.listItem()
              .title('Departments')
              .child(
                S.list()
                  .title('Departments')
                  .items([
                    S.listItem()
                      .title('Sales')
                      .child(S.documentTypeList('resource').filter('department == "sales"').title('Sales Resources')),
                    S.listItem()
                      .title('Partnerships')
                      .child(S.documentTypeList('resource').filter('department == "partnerships"').title('Partnership Resources')),
                    S.listItem()
                      .title('Sales Operations')
                      .child(S.documentTypeList('resource').filter('department == "sales-ops"').title('Sales Ops Resources')),
                    S.listItem()
                      .title('Sales Engineering')
                      .child(S.documentTypeList('resource').filter('department == "sales-engineering"').title('Sales Engineering Resources')),
                    S.listItem()
                      .title('Customer Success')
                      .child(S.documentTypeList('resource').filter('department == "customer-success"').title('Customer Success Resources')),
                    S.listItem()
                      .title('Solutions Architecture')
                      .child(S.documentTypeList('resource').filter('department == "solutions-architecture"').title('Solutions Architecture Resources')),
                  ])
              ),
            
            // Learning Modules
            S.listItem()
              .title('Learning Modules')
              .child(S.documentTypeList('learningModule').title('Learning Modules')),
            
            // All Resources
            S.listItem()
              .title('All Resources')
              .child(S.documentTypeList('resource').title('All Resources')),
            
            // Categories
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('Categories')),
            
            // Users
            S.listItem()
              .title('Users')
              .child(S.documentTypeList('user').title('Users')),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})