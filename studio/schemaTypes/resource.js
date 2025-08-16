export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          {title: 'Sales', value: 'sales'},
          {title: 'Partnerships', value: 'partnerships'},
          {title: 'Sales Operations', value: 'sales-ops'},
          {title: 'Sales Engineering', value: 'sales-engineering'},
          {title: 'Customer Success', value: 'customer-success'},
          {title: 'Solutions Architecture', value: 'solutions-architecture'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
    {
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          {title: 'Document', value: 'document'},
          {title: 'Video', value: 'video'},
          {title: 'Presentation', value: 'presentation'},
          {title: 'Template', value: 'template'},
          {title: 'Guide', value: 'guide'},
          {title: 'Case Study', value: 'case-study'},
          {title: 'Training Material', value: 'training'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'contentBlock'},
        {
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          type: 'file',
          title: 'Downloadable File'
        }
      ]
    },
    {
      name: 'downloadableFiles',
      title: 'Downloadable Files',
      type: 'array',
      of: [{
        type: 'file',
        title: 'File'
      }]
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Link to external resource (Google Drive, etc.)'
    },
    {
      name: 'isCustomerFacing',
      title: 'Customer Facing Material',
      type: 'boolean',
      description: 'Check if this material can be shared with customers'
    },
    {
      name: 'accessLevel',
      title: 'Access Level',
      type: 'string',
      options: {
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Internal Only', value: 'internal'},
          {title: 'Department Only', value: 'department'},
        ],
        layout: 'radio'
      },
      initialValue: 'internal'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime'
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'user'}
    }
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      resourceType: 'resourceType',
      media: 'content.0'
    },
    prepare(selection) {
      const {title, department, resourceType} = selection
      return {
        title: title,
        subtitle: `${department} • ${resourceType}`
      }
    }
  }
}