# Revenue Enablement Hub

A comprehensive training and resource management platform built with Sanity.io and Next.js, designed specifically for Revenue teams.

## 🚀 Features

### Content Management
- **Rich Content Types**: Support for documents, videos, presentations, templates, guides, and case studies
- **Department Organization**: Content organized by Sales, Partnerships, Sales Ops, Sales Engineering, Customer Success, and Solutions Architecture
- **Learning Modules**: Structured training sequences with lessons, prerequisites, and progress tracking
- **Advanced Search & Filtering**: Find content by department, type, difficulty, and custom tags

### User Experience
- **Clean, Intuitive Interface**: Following Coder's design system principles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Rich Content Blocks**: Support for mixed content (text, videos, code snippets, callouts)
- **Download Functionality**: Easy access to customer-facing materials
- **Progress Tracking**: Monitor learning module completion rates

### Content Types
- **Resources**: Training materials, guides, templates, and documentation
- **Learning Modules**: Structured learning paths with multiple lessons
- **Categories**: Hierarchical content organization
- **Users**: Role-based access (editors vs viewers)

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: Sanity.io integration
- **TypeScript**: Full type safety

### Backend (Sanity.io)
- **CMS**: Sanity Studio for content management
- **Schemas**: Custom content types for resources, modules, users
- **GROQ**: Powerful query language for content fetching
- **Real-time**: Live preview and collaboration

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity.io account

### 1. Clone and Setup

```bash
git clone <repository-url>
cd revenue-hub
```

### 2. Setup Sanity Studio

```bash
cd studio
npm install

# Create a new Sanity project (or use existing)
sanity init

# Update sanity.config.js with your project ID
# Replace 'your-project-id' with your actual project ID
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install

# Copy environment variables
cp .env.local.example .env.local

# Update .env.local with your Sanity project details:
# NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
# NEXT_PUBLIC_SANITY_DATASET=production
```

### 4. Start Development Servers

```bash
# Terminal 1: Start Sanity Studio
cd studio
npm run dev

# Terminal 2: Start Next.js frontend
cd frontend
npm run dev
```

- **Sanity Studio**: http://localhost:3333
- **Frontend**: http://localhost:3000

## 🎯 Getting Started

### 1. Content Setup
1. Access Sanity Studio at http://localhost:3333
2. Create user accounts for your team
3. Set up categories for content organization
4. Add your first resources and learning modules

### 2. User Roles
- **Content Editors**: Can create, edit, and publish content
- **Content Viewers**: Can browse and consume content
- **Admins**: Full access to all features

### 3. Content Organization
- **Departments**: Sales, Partnerships, Sales Ops, Sales Engineering, Customer Success, Solutions Architecture
- **Resource Types**: Documents, Videos, Presentations, Templates, Guides, Case Studies, Training
- **Module Types**: Onboarding, Product Training, Sales Training, Process Training, Certification

## 🔧 Configuration

### Environment Variables

**Frontend (.env.local)**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token # Optional, for authenticated requests
```

**Sanity Studio (sanity.config.js)**
```javascript
export default defineConfig({
  projectId: 'your-project-id',
  dataset: 'production',
  // ... other config
})
```

### Customization

#### Adding New Departments
1. Update `DEPARTMENT_NAMES` in `frontend/src/lib/types.ts`
2. Update department options in Sanity schemas
3. Add department colors in `frontend/src/lib/utils.ts`

#### Adding New Content Types
1. Create new schema in `studio/schemaTypes/`
2. Add to `studio/schemaTypes/index.js`
3. Update TypeScript types in `frontend/src/lib/types.ts`
4. Add GROQ queries in `frontend/src/lib/sanity.ts`

## 🚀 Deployment

### Sanity Studio Deployment

```bash
cd studio
npm run build
npm run deploy
```

Your studio will be available at `https://your-project-id.sanity.studio`

### Frontend Deployment (Vercel)

1. **Connect to Vercel**
   ```bash
   cd frontend
   npx vercel
   ```

2. **Environment Variables**
   Add these in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (if needed)

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Alternative Deployment Options

#### Netlify
```bash
cd frontend
npm run build
# Upload dist folder to Netlify
```

#### Docker
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔐 Security & Access Control

### Sanity Access Control
- Configure user roles in Sanity dashboard
- Set up department-based access if needed
- Use API tokens for secure frontend access

### Content Access Levels
- **Public**: Accessible to all users
- **Internal**: Internal team only
- **Department**: Specific department only

## 📊 Analytics & Monitoring

### Built-in Features
- Learning module completion tracking
- Content usage analytics
- User engagement metrics

### Integration Options
- Google Analytics
- Mixpanel
- Custom analytics via Sanity webhooks

## 🔄 Content Migration

### From Google Drive
1. Export content from Google Drive
2. Use Sanity's import tools
3. Update file references and metadata
4. Set up redirects if needed

### Bulk Import
```javascript
// Example import script
import { client } from './sanity-client'

const importResources = async (resources) => {
  for (const resource of resources) {
    await client.create({
      _type: 'resource',
      title: resource.title,
      department: resource.department,
      // ... other fields
    })
  }
}
```

## 🛠️ Development

### Project Structure
```
revenue-hub/
├── studio/                 # Sanity Studio
│   ├── schemaTypes/       # Content schemas
│   ├── sanity.config.js   # Studio configuration
│   └── package.json
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities and types
│   ├── public/           # Static assets
│   └── package.json
└── README.md
```

### Key Files
- `studio/schemaTypes/`: Content type definitions
- `frontend/src/lib/sanity.ts`: Sanity client and queries
- `frontend/src/lib/types.ts`: TypeScript type definitions
- `frontend/src/components/Navigation.tsx`: Main navigation

### Development Workflow
1. Make schema changes in Sanity Studio
2. Update TypeScript types
3. Add/update GROQ queries
4. Update frontend components
5. Test with sample content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions and support:
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Review [Next.js documentation](https://nextjs.org/docs)
- Create an issue in this repository

---

**Built with ❤️ for Revenue teams everywhere**