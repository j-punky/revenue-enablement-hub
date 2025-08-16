export default {
  name: 'category',
  title: 'Category',
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
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          {title: 'Blue', value: '#3B82F6'},
          {title: 'Green', value: '#10B981'},
          {title: 'Purple', value: '#8B5CF6'},
          {title: 'Red', value: '#EF4444'},
          {title: 'Orange', value: '#F59E0B'},
          {title: 'Pink', value: '#EC4899'},
          {title: 'Indigo', value: '#6366F1'},
          {title: 'Gray', value: '#6B7280'},
        ],
        layout: 'dropdown'
      },
      initialValue: '#3B82F6'
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name (will be used with an icon library)'
    },
    {
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: {type: 'category'},
      description: 'Optional parent category for hierarchical organization'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this category should appear'
    }
  ],
  preview: {
    select: {
      title: 'title',
      parent: 'parent.title',
      color: 'color'
    },
    prepare(selection) {
      const {title, parent, color} = selection
      return {
        title: title,
        subtitle: parent ? `Under: ${parent}` : 'Top level category',
        media: () => (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: color,
            borderRadius: '4px'
          }} />
        )
      }
    }
  }
}