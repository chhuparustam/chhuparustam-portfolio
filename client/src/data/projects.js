/* Project data — single source of truth for the Projects archive
   and project detail pages. Real information only: empty values
   mean "not yet available", never invented metrics, users, scale,
   demos, or credentials. Components render from here; nothing
   project-specific is hardcoded in JSX.
   Excluded on purpose: the profile README repo (chhuparustam)
   and the portfolio repo itself (my_portfolio) — neither is a
   showcase project. */

export const PROJECT_STATUS = {
  COMPLETED: 'Completed',
  IN_DEVELOPMENT: 'In Development',
  ARCHIVED: 'Archived',
};

export const projects = [
  {
    id: 'wasteguardian',
    number: '01',
    code: 'WG-01',
    title: 'WasteGuardian',
    subtitle: 'Smart Waste Management System',
    category: 'Full Stack / Laravel',
    shortDescription:
      'Waste management web application built as a BCA final project.',
    description: '',
    status: PROJECT_STATUS.COMPLETED,
    year: '',
    type: 'BCA Final Project',
    technologies: [
      'PHP',
      'Laravel',
      'JavaScript',
      'Blade',
      'Bootstrap',
      'MySQL',
      'Stripe',
      'Khalti',
      'Chart Analytics',
    ],
    github: 'https://github.com/chhuparustam/WasteGuardian',
    githubLabel: 'GitHub',
    demo: null,
    featured: true,
    accent: 'purple',
    screenshots: [],
    caseStudy: {
      problem:
        'WasteGuardian is a Laravel-based smart waste management web application built as a BCA final project. It organizes waste pickup requests, cleaning-service bookings, complaints, dashboards, and payments into role-based workflows for citizens, administrators, drivers, and workers, with Nepal-focused payment support through Khalti alongside Stripe.',
      approach:
        'Built around role-based workflows: citizens raise pickup requests, book cleaning services, and file complaints; administrators manage users, drivers, workers, requests, and services; drivers and workers handle assigned pickups and tasks. Payments integrate through Stripe and Khalti, and dashboards surface request, booking, and revenue activity.',
      architecture: '',
      features: [
        {
          role: 'User / Citizen',
          items: [
            'Registration and login',
            'Profile',
            'Waste pickup requests',
            'Photo upload',
            'Request editing/deletion while pending',
            'Cleaning service browsing/booking',
            'Booked services',
            'Service cancellation',
            'Complaints',
            'Personal dashboard',
            '7/30-day charts',
            'Email notification after successful payment',
          ],
        },
        {
          role: 'Admin',
          items: [
            'Dashboard',
            'User management',
            'Driver management',
            'Worker management',
            'Request management',
            'Service management',
            'Revenue analytics',
            'Request/user/complaint/booking statistics',
            'Activity log',
          ],
        },
        {
          role: 'Driver',
          items: ['Assigned pickups', 'Pending/completed pickups', 'Dashboard charts'],
        },
        {
          role: 'Worker',
          items: ['Assigned tasks', 'Pending/completed tasks', 'Dashboard charts'],
        },
      ],
      technology: [
        { group: 'Backend', items: ['PHP', 'Laravel'] },
        { group: 'Frontend', items: ['Blade', 'HTML/CSS/JavaScript', 'Bootstrap'] },
        { group: 'Database', items: ['MySQL / MariaDB'] },
        { group: 'Payments', items: ['Stripe', 'Khalti ePayment v2'] },
        { group: 'HTTP', items: ['Guzzle'] },
        { group: 'Testing', items: ['PHPUnit'] },
        { group: 'Build', items: ['Laravel Mix / Webpack'] },
      ],
      challenges: [
        'Hardcoded admin credentials',
        'Hardcoded Khalti key',
        'Missing payment.failed route',
        'Duplicate routes',
        'Absence of role middleware',
        'worker_id reuse concerns',
        'Missing seeders',
        'Limited PHPUnit coverage',
      ],
      screenshots: [],
      outcome:
        'A completed BCA project demonstrating a multi-role smart waste management workflow with Laravel, MySQL, service booking, complaint handling, dashboards and payment integrations.',
    },
  },
  {
    id: 'mausamhub',
    number: '02',
    code: 'MH-02',
    title: 'MausamHub',
    subtitle: 'Real-Time Weather Intelligence Dashboard',
    category: 'Python / Flask / API Integration',
    shortDescription:
      'Python Flask weather dashboard powered by the OpenWeatherMap API — current conditions, forecasts, and interactive charts in a responsive interface.',
    description: '',
    status: '',
    year: '',
    type: 'Flask Web Application',
    technologies: [
      'Python',
      'Flask',
      'OpenWeatherMap API',
      'Requests',
      'JavaScript',
      'Chart.js',
      'HTML',
      'CSS',
    ],
    github: 'https://github.com/chhuparustam/MausamHub',
    githubLabel: 'View Source',
    demo: null,
    featured: false,
    accent: 'python',
    screenshots: [],
    caseStudy: {
      order: ['overview', 'features', 'architecture', 'technology', 'security', 'notes', 'source'],
      stages: {
        overview: { index: '01', kicker: 'Overview', title: 'Live weather, processed server-side.' },
        features: { index: '02', kicker: 'Features', title: 'What the dashboard does.' },
        architecture: { index: '03', kicker: 'Architecture', title: 'Request to render, step by step.' },
        technology: { index: '04', kicker: 'Tech Stack', title: 'Only what the repo uses.' },
        security: { index: '05', kicker: 'Engineering Notes', title: 'Security & engineering notes.' },
        notes: { index: '06', kicker: 'Technical Notes', title: 'Accurate notes, documented.' },
        source: { index: '07', kicker: 'GitHub', title: 'Source repository.' },
      },
      overview:
        'MausamHub is a Python Flask-based weather dashboard that connects with the OpenWeatherMap API to retrieve current conditions and forecast data, process the results server-side, and present them through a responsive interactive interface.',
      features: [
        {
          role: 'Real-Time Weather',
          items: [
            'Current weather for a searched city',
            'Temperature and feels-like temperature',
            'Weather description',
            'Humidity, wind speed, atmospheric pressure',
          ],
        },
        {
          role: 'Forecasting',
          items: [
            'Forecast intervals processed from OpenWeatherMap data',
            'Next 8 forecast intervals displayed',
            '5-day forecast summary',
          ],
        },
        {
          role: 'Visual Analytics',
          items: [
            'Interactive temperature chart',
            'Conditions chart',
            'Chart.js visualizations',
            'Responsive dashboard layout',
          ],
        },
        {
          role: 'City Exploration',
          items: ['Predefined cards for New York', 'Predefined cards for Tokyo', 'Predefined cards for Paris'],
        },
        {
          role: 'Search',
          items: [
            'City search form',
            'Server-side request handling',
            'Error state when weather data cannot be retrieved',
          ],
        },
        {
          role: 'Time & Date',
          items: ['Current time display', 'Current date display', 'Client-side date/time update'],
        },
      ],
      architecture: {
        flows: [
          {
            steps: [
              'User',
              'Flask Application',
              'OpenWeatherMap API',
              'Weather Data Processing',
              'Jinja2 Template Rendering',
              'Interactive JavaScript + Chart.js',
            ],
          },
        ],
        note: 'Server-side processing covers current-weather retrieval, forecast retrieval, hourly forecast processing, and daily/weekly forecast processing.',
      },
      technology: [
        { group: 'Backend', items: ['Python', 'Flask'] },
        { group: 'API', items: ['OpenWeatherMap API'] },
        { group: 'HTTP', items: ['Requests'] },
        { group: 'Environment', items: ['python-dotenv'] },
        { group: 'Frontend', items: ['HTML', 'CSS', 'JavaScript'] },
        { group: 'Visualization', items: ['Chart.js'] },
        { group: 'UI', items: ['Font Awesome', 'Google Fonts / Poppins'] },
      ],
      security: [
        'API key is loaded through environment configuration',
        '.env is ignored from source control',
        'External HTTP calls use a timeout',
        'User-facing error handling exists for failed city/weather lookup',
        'Production deployment notes recommend disabling debug mode and using a proper WSGI server',
      ],
      notes: [
        'Current development code uses Flask debug mode',
        'OpenWeatherMap free-tier precipitation is represented as 0 in the application',
        'Conditions chart currently derives sample variations from current humidity/wind values rather than an actual historical condition series',
        'Production should use environment configuration and a WSGI server',
      ],
      source: {
        label: 'VIEW SOURCE',
        url: 'https://github.com/chhuparustam/MausamHub',
        note: 'Repository source on GitHub. No live demo exists — nothing is faked.',
      },
    },
  },
  {
    id: 'fitnova',
    number: '03',
    code: 'FN-03',
    title: 'FitNova',
    subtitle: 'Gym Management & REST API Platform',
    category: 'Python / Django / REST API',
    shortDescription:
      'Django and DRF backend for gym management — members, trainers, subscriptions, attendance, and Khalti payment flows through a documented REST API.',
    description: '',
    status: '',
    year: '',
    type: 'Django REST API Platform',
    technologies: [
      'Python',
      'Django',
      'Django REST Framework',
      'Simple JWT',
      'Celery',
      'Redis',
      'SQLite',
      'Khalti',
    ],
    github: 'https://github.com/chhuparustam/FitNova',
    githubLabel: 'View Source',
    demo: null,
    featured: false,
    accent: 'python',
    screenshots: [],
    caseStudy: {
      order: ['overview', 'features', 'architecture', 'technology', 'security', 'notes', 'source'],
      stages: {
        overview: { index: '01', kicker: 'Overview', title: 'Backend-first gym management.' },
        features: { index: '02', kicker: 'Features', title: 'Domains and API surface.' },
        architecture: { index: '03', kicker: 'Architecture', title: 'Request, tasks, and auth.' },
        technology: { index: '04', kicker: 'Tech Stack', title: 'Only what the repo uses.' },
        security: { index: '05', kicker: 'Engineering Notes', title: 'Security / backend engineering.' },
        notes: { index: '06', kicker: 'Technical Notes', title: 'Accurate notes, documented.' },
        source: { index: '07', kicker: 'GitHub', title: 'Source repository.' },
      },
      overview:
        'FitNova is a Django and Django REST Framework-based backend platform for managing gym members, trainers, subscriptions, memberships, attendance and payment workflows through a structured REST API. It is primarily a backend/API-oriented project, not a consumer-facing frontend application.',
      features: [
        {
          role: 'Member Management',
          items: [
            'Member records with personal information',
            'Contact details, date of birth, gender',
            'Emergency contact and address',
            'Height/weight, blood group, medical-condition field',
            'Active/inactive status and join date',
          ],
        },
        {
          role: 'Trainer Management',
          items: [
            'Trainer records with email and phone',
            'Experience years and salary',
            'Joining date and active status',
          ],
        },
        {
          role: 'Subscription Management',
          items: ['Subscription plans', 'Number of days', 'Price', 'Active status'],
        },
        {
          role: 'Gym Membership',
          items: [
            'Member-to-subscription relationship',
            'Trainer assignment',
            'Membership duration and calculated price',
            'Membership status',
          ],
        },
        {
          role: 'Attendance',
          items: [
            'Attendance records linked to members',
            'Attendance date, check-in, check-out',
            'Presence state',
          ],
        },
        {
          role: 'Transactions',
          items: [
            'Member-linked transactions',
            'Amount and transaction status',
            'Transaction identifiers and payment references',
            'Timestamps',
          ],
        },
        {
          role: 'REST API Surface',
          items: [
            'Members — list, create, update, delete',
            'Trainers — list, create, update, delete',
            'Subscriptions — list, create, update, delete',
            'Memberships — create and list',
            'Attendance update endpoint',
            'Membership payment initiation flow',
            'JWT token obtain and refresh',
          ],
        },
        {
          role: 'API Documentation',
          items: ['OpenAPI schema generation', 'Swagger UI', 'ReDoc via drf-spectacular'],
        },
      ],
      architecture: {
        flows: [
          {
            label: 'Request flow',
            steps: ['Client', 'REST API', 'Django REST Framework', 'Domain Apps', 'SQLite Database'],
          },
          {
            label: 'Background flow',
            steps: ['Celery', 'Redis', 'Scheduled Tasks', 'Attendance Automation'],
          },
          {
            label: 'Authentication flow',
            steps: ['JWT', 'Protected API Endpoints'],
          },
        ],
        note: 'Domain apps: Member, Trainer, Subscription, Attendance, Transaction. Scheduled tasks cover creating attendance records and marking attendance states.',
      },
      technology: [
        { group: 'Language', items: ['Python'] },
        { group: 'Backend', items: ['Django'] },
        { group: 'API', items: ['Django REST Framework'] },
        { group: 'Auth', items: ['djangorestframework-simplejwt'] },
        { group: 'API Docs', items: ['drf-spectacular'] },
        { group: 'Tasks', items: ['Celery'] },
        { group: 'Scheduler', items: ['django-celery-beat'] },
        { group: 'Task Monitoring', items: ['Flower'] },
        { group: 'Broker / Support', items: ['Redis'] },
        { group: 'Database', items: ['SQLite in current repository configuration'] },
        { group: 'Payment', items: ['Khalti payment initiation flow'] },
      ],
      security: [
        'Built on Django REST Framework with JWT authentication support',
        'DRF authentication configured with Simple JWT',
        'Django security middleware enabled',
        'CSRF middleware enabled',
        'Clickjacking protection middleware enabled',
        'Password validation framework enabled',
        'API schema/documentation support via drf-spectacular',
      ],
      notes: [
        'Current project is configured with SQLite',
        'Current settings use DEBUG=True',
        'ALLOWED_HOSTS is not configured for production',
        'Some APIs use custom validation/status responses',
        'Repository contains development/test payment configuration',
        'Duplicate subscription URL registration exists in the current URL configuration',
        'Database file exists in the repository',
      ],
      source: {
        label: 'VIEW SOURCE',
        url: 'https://github.com/chhuparustam/FitNova',
        note: 'Repository source on GitHub. No live demo exists — nothing is faked.',
      },
    },
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getArchiveProjects() {
  return [...projects].sort((a, b) => a.number.localeCompare(b.number));
}

export function getProjectById(id) {
  return projects.find((project) => project.id === id) ?? null;
}
