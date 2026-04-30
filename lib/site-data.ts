export const siteData = {
  gym: {
    name: 'Balance Pilates',
    tagline: 'Reformer & Community Pilates',
    location: 'Denver, CO',
    address: '2540 Welton St, Denver, CO 80205',
    phone: '(720) 555-0147',
    email: 'hello@balancepilates.com',
  },
  stats: [
    { value: '30+', label: 'Reformer Machines' },
    { value: '500+', label: 'Active Members' },
    { value: '15', label: 'Weekly Classes' },
    { value: '2016', label: 'Founded' },
  ],
  classes: [
    {
      name: 'Classic Reformer',
      level: 'All Levels',
      duration: '50 min',
      desc: 'The signature Balance class. Small group (12 max) on the reformer. Foundational exercises with instructor hands-on guidance throughout.',
    },
    {
      name: 'Reformer Flow',
      level: 'Intermediate',
      duration: '55 min',
      desc: 'Fluid, continuous sequences building heat and coordination. Ideal for members who have completed at least 5 Classic classes.',
    },
    {
      name: 'Cardio Reformer',
      level: 'Intermediate–Advanced',
      duration: '45 min',
      desc: 'Jump board, high-rep spring work, and elevated heart rate throughout. Pilates meets HIIT — all on the reformer.',
    },
    {
      name: 'Reformer Stretch',
      level: 'All Levels',
      duration: '45 min',
      desc: 'Slow, restorative reformer work focused on lengthening, mobility, and deep muscle release. Perfect as a standalone or recovery session.',
    },
    {
      name: 'Mat Fundamentals',
      level: 'Beginner',
      duration: '50 min',
      desc: 'Classical Pilates mat work in a supported group environment. Excellent for new clients, post-rehab, or anyone returning after a break.',
    },
    {
      name: 'Private Session',
      level: 'Any Level',
      duration: '55 min',
      desc: '1-on-1 or duet instruction. Fully tailored to your body, goals, and injuries. Any apparatus available.',
    },
  ],
  pillars: [
    { icon: '🤝', name: 'Community First', desc: 'We keep classes small (max 12) so instructors know every member by name and every body by history.' },
    { icon: '📈', name: 'Progressive Method', desc: 'A structured path from Fundamentals to Advanced. We track your progression so you always know what\'s next.' },
    { icon: '🧠', name: 'Mind-Body Connection', desc: 'Every cue connects the breath to the movement. Pilates is as much a mental practice as a physical one.' },
    { icon: '🏥', name: 'Injury-Informed', desc: 'All instructors are trained in common modifications. We work with your physio and your body, not against them.' },
  ],
  pricing: [
    {
      name: 'Intro Month',
      price: '$99',
      period: 'first 30 days',
      features: ['Unlimited group classes', 'Includes Fundamentals', 'New member consultation', 'Access to app & booking', 'Community events'],
      highlight: false,
    },
    {
      name: 'Monthly Membership',
      price: '$179',
      period: 'per month',
      features: ['Unlimited group classes', 'Priority booking (72h early)', '10% off privates & merch', 'Monthly workshops', 'Pause anytime'],
      highlight: true,
    },
    {
      name: 'Class Pack',
      price: '$189',
      period: '10 classes · 4 months',
      features: ['10 classes, any format', '4-month validity', 'Share 1 class / month', 'App booking included', 'Non-expiring credits'],
      highlight: false,
    },
  ],
};
