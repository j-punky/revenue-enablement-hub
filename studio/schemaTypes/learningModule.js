export default {
  name: 'learningModule',
  title: 'Learning Module',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Module Title',
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
      rows: 4
    },
    {
      name: 'moduleType',
      title: 'Module Type',
      type: 'string',
      options: {
        list: [
          {title: 'Onboarding', value: 'onboarding'},
          {title: 'Product Training', value: 'product-training'},
          {title: 'Sales Training', value: 'sales-training'},
          {title: 'Process Training', value: 'process-training'},
          {title: 'Certification', value: 'certification'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'targetDepartments',
      title: 'Target Departments',
      type: 'array',
      of: [{
        type: 'string',
        options: {
          list: [
            {title: 'Sales', value: 'sales'},
            {title: 'Partnerships', value: 'partnerships'},
            {title: 'Sales Operations', value: 'sales-ops'},
            {title: 'Sales Engineering', value: 'sales-engineering'},
            {title: 'Customer Success', value: 'customer-success'},
            {title: 'Solutions Architecture', value: 'solutions-architecture'},
          ]
        }
      }],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
        layout: 'radio'
      },
      initialValue: 'beginner'
    },
    {
      name: 'estimatedDuration',
      title: 'Estimated Duration (minutes)',
      type: 'number',
      description: 'Estimated time to complete this module'
    },
    {
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{type: 'reference', to: {type: 'learningModule'}}],
      description: 'Other modules that should be completed first'
    },
    {
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [{
        type: 'object',
        name: 'lesson',
        title: 'Lesson',
        fields: [
          {
            name: 'title',
            title: 'Lesson Title',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'order',
            title: 'Order',
            type: 'number',
            validation: Rule => Rule.required().min(1)
          },
          {
            name: 'content',
            title: 'Lesson Content',
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
                title: 'Lesson Material'
              }
            ]
          },
          {
            name: 'resources',
            title: 'Related Resources',
            type: 'array',
            of: [{type: 'reference', to: {type: 'resource'}}]
          },
          {
            name: 'estimatedDuration',
            title: 'Estimated Duration (minutes)',
            type: 'number'
          }
        ],
        preview: {
          select: {
            title: 'title',
            order: 'order'
          },
          prepare(selection) {
            const {title, order} = selection
            return {
              title: `${order}. ${title}`
            }
          }
        }
      }]
    },
    {
      name: 'completionCriteria',
      title: 'Completion Criteria',
      type: 'text',
      description: 'What constitutes completion of this module?'
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this module currently available?',
      initialValue: true
    },
    {
      name: 'createdAt',
      title: 'Created At',
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
  orderings: [
    {
      title: 'Created Date, New',
      name: 'createdAtDesc',
      by: [
        {field: 'createdAt', direction: 'desc'}
      ]
    },
    {
      title: 'Module Type',
      name: 'moduleType',
      by: [
        {field: 'moduleType', direction: 'asc'},
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      moduleType: 'moduleType',
      difficulty: 'difficulty',
      duration: 'estimatedDuration'
    },
    prepare(selection) {
      const {title, moduleType, difficulty, duration} = selection
      return {
        title: title,
        subtitle: `${moduleType} • ${difficulty} • ${duration ? duration + ' min' : 'No duration set'}`
      }
    }
  }
}