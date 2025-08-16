export default {
  name: 'contentBlock',
  title: 'Content Block',
  type: 'object',
  fields: [
    {
      name: 'blockType',
      title: 'Block Type',
      type: 'string',
      options: {
        list: [
          {title: 'Rich Text', value: 'richText'},
          {title: 'Video Embed', value: 'video'},
          {title: 'Code Snippet', value: 'code'},
          {title: 'Quote/Callout', value: 'callout'},
          {title: 'Two Column Layout', value: 'twoColumn'},
          {title: 'Button/CTA', value: 'cta'},
        ],
        layout: 'dropdown'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'richText',
      title: 'Rich Text Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL'
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      hidden: ({parent}) => parent?.blockType !== 'richText'
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video URL',
      hidden: ({parent}) => parent?.blockType !== 'video'
    },
    {
      name: 'videoTitle',
      title: 'Video Title',
      type: 'string',
      hidden: ({parent}) => parent?.blockType !== 'video'
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 10,
      hidden: ({parent}) => parent?.blockType !== 'code'
    },
    {
      name: 'language',
      title: 'Programming Language',
      type: 'string',
      options: {
        list: [
          {title: 'JavaScript', value: 'javascript'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'Python', value: 'python'},
          {title: 'Go', value: 'go'},
          {title: 'Bash', value: 'bash'},
          {title: 'JSON', value: 'json'},
          {title: 'YAML', value: 'yaml'},
          {title: 'SQL', value: 'sql'},
        ]
      },
      hidden: ({parent}) => parent?.blockType !== 'code'
    },
    {
      name: 'calloutText',
      title: 'Callout Text',
      type: 'text',
      rows: 4,
      hidden: ({parent}) => parent?.blockType !== 'callout'
    },
    {
      name: 'calloutType',
      title: 'Callout Type',
      type: 'string',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
          {title: 'Success', value: 'success'},
          {title: 'Error', value: 'error'},
          {title: 'Tip', value: 'tip'},
        ],
        layout: 'radio'
      },
      initialValue: 'info',
      hidden: ({parent}) => parent?.blockType !== 'callout'
    },
    {
      name: 'leftColumn',
      title: 'Left Column',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      hidden: ({parent}) => parent?.blockType !== 'twoColumn'
    },
    {
      name: 'rightColumn',
      title: 'Right Column',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      hidden: ({parent}) => parent?.blockType !== 'twoColumn'
    },
    {
      name: 'ctaText',
      title: 'Button Text',
      type: 'string',
      hidden: ({parent}) => parent?.blockType !== 'cta'
    },
    {
      name: 'ctaUrl',
      title: 'Button URL',
      type: 'url',
      hidden: ({parent}) => parent?.blockType !== 'cta'
    },
    {
      name: 'ctaStyle',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary', value: 'primary'},
          {title: 'Secondary', value: 'secondary'},
          {title: 'Outline', value: 'outline'},
        ],
        layout: 'radio'
      },
      initialValue: 'primary',
      hidden: ({parent}) => parent?.blockType !== 'cta'
    }
  ],
  preview: {
    select: {
      blockType: 'blockType',
      richText: 'richText',
      videoTitle: 'videoTitle',
      calloutText: 'calloutText',
      ctaText: 'ctaText'
    },
    prepare(selection) {
      const {blockType, richText, videoTitle, calloutText, ctaText} = selection
      
      let title = blockType
      let subtitle = ''
      
      switch(blockType) {
        case 'richText':
          subtitle = richText?.[0]?.children?.[0]?.text || 'Rich text content'
          break
        case 'video':
          subtitle = videoTitle || 'Video content'
          break
        case 'callout':
          subtitle = calloutText || 'Callout content'
          break
        case 'cta':
          subtitle = ctaText || 'Button'
          break
        default:
          subtitle = 'Content block'
      }
      
      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
}