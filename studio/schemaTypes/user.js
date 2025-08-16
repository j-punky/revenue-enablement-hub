export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Content Editor', value: 'editor'},
          {title: 'Content Viewer', value: 'viewer'},
          {title: 'Admin', value: 'admin'},
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      initialValue: 'viewer'
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
          {title: 'Leadership', value: 'leadership'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this user currently active?',
      initialValue: true
    },
    {
      name: 'joinedAt',
      title: 'Joined At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'name',
      email: 'email',
      role: 'role',
      department: 'department',
      media: 'avatar'
    },
    prepare(selection) {
      const {title, email, role, department} = selection
      return {
        title: title,
        subtitle: `${role} • ${department} • ${email}`
      }
    }
  }
}